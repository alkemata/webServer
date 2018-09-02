# chat/consumers.py
from django.conf import settings
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from .exceptions import ClientError
from . import utils

class ChatConsumer(AsyncJsonWebsocketConsumer):
    ##### WebSocket event handlers

    async def connect(self):
        print('receiving connection')
        await self.accept()
        self.rooms = set()


    async def receive_json(self, content):
        """
        Called when we get a text frame. Channels will JSON-decode the payload
        for us and pass it as the first argument.
        """
        # Messages will have a "command" key we can switch on
        command = content.get("command", None)
        print("received message with command :  "+command)
        try:
            if command == "join":
                user=self.scope["user"]
                if user.is_anonymous:
                    print("anonymous user connecting")
                    kernelName=content["kernelName"]
                    registered=await utils.kernelRegistered(kernelName)
                    if registered:
                        await utils.addKernel(content["room"],kernelName)
                        await self.channel_layer.group_add(
            			    kernelName,
            			    self.channel_name,
        				    )
                        owner=await utils.getOwner(kernelName)
                        self.owner=owner
                        await self.channel_layer.group_send(
                            owner,
                            {
                            "type": "chat.message",
                            "command": "ADD_KERNEL",
                            "kernel": kernelName,
                            } )
                        print('Kernel added')
                    else:
                        await self.close()
       	        else:
                    print("user connecting")
                    await self.join_room(content["room"])
            elif command == "leave":
                # Leave the room
                await self.leave_room(content["room"])
            elif command == "sendMessage":
                await self.send_message(content["room"], content["message"])
            elif command== "requestKernel":
                await self.requestKernel(content["room"],content["kernelName"], content["code"])
            elif command== "resultKernel":
                await self.sendResult(self.owner,content["result"])
            elif command== "infoKernel":
                await self.sendInfoUser(self.owner,content["message"])
            elif command== "changeKernelState":
                await self.changeKernelState(self.owner,content["state"])
            elif command== "sendInfoRoom":
                await self.sendInfoRoom(content["room"],content["type"],content["message"])
        except ClientError as e:
            # Catch any errors and send it back
            await self.send_json({"command": "inform","type":"alert","message":e.code})

#========================================

    async def disconnect(self, code):
        """
        Called when the WebSocket closes for any reason.
        """
        # Leave all the rooms we are still in
        for room_id in list(self.rooms):
            try:
                await self.leave_room(room_id)
            except ClientError:
                pass

    async def join_room(self, room_id):
        user=self.scope["user"]
        await utils.addUser(room_id,user)
        room = await utils.get_room_or_error(room_id, self.scope["user"])


        await self.channel_layer.group_send(
                room.group_name,
                {"type": "chat.message",
                  "command": "ADD_USER",
                  "username": self.scope["user"].username,
                }
            )
        # Store that we're in the room
        self.rooms.add(room_id)
        # Add them to the group so they get room messages
        await self.channel_layer.group_add(
            room.group_name,
            self.channel_name,
        )

        await self.channel_layer.group_add(
            self.scope["user"].username,
            self.channel_name,
        )
        # Instruct their client to finish opening the room
        usrslist=list(await utils.getUsers(room_id))
        kernellist=list(await utils.getKernels(room_id,self.scope["user"]))
        await self.send_json({
            "command": "USERS_LIST",
            "userList": usrslist,
        })
        await self.send_json({
            "command": "KERNELS_LIST",
            "kernelList": kernellist,
        })

    async def send_message(self,room_id,message):
        author=self.scope["user"]
        room = await utils.get_room_or_error(room_id, self.scope["user"])
        print("message in : "+message+room_id)
        await self.channel_layer.group_send(
            room.group_name,
            {
                "type": "chat.message",
                "command":"MESSAGE_RECEIVED",
                "message":message,
                "username":author.username,
                "room":room_id
            })
        print("message sent")

    async def requestKernel(self,room_id,kernel,code):
        author=self.scope["user"]
        await self.channel_layer.group_send(
            kernel,
            {
                "type": "chat.message",
                "command":"kernel_request",
                "code":code,
                "username":author.username,
                "room":room_id
            })
        print("Kernel request sent")


    async def sendResult(self,user,result):
        await self.channel_layer.group_send(
            user,
            {
                "type": "chat.message",
                "command":"KERNEL_RESULT",
                "result":result,
            })

    async def changeKernelState(self,user,state):
        await self.channel_layer.group_send(
            user,
            {
                "type": "chat.message",
                "command":"CHANGE_KERNEL_STATE",
                "state":state,
            })

    async def sendInfoUser(self,user,message):
        await self.channel_layer.group_send(
            user,
            {
                "type": "chat.message",
                "command":"INFO",
                "message":message,
            })

    async def leave_room(self, room_id):
        """
        Called by receive_json when someone sent a leave command.
        """
        # The logged-in user is in our scope thanks to the authentication ASGI middleware
        room = await utils.get_room_or_error(room_id, self.scope["user"])
        # Send a leave message if it's turned on
        if settings.NOTIFY_USERS_ON_ENTER_OR_LEAVE_ROOMS:
            await self.channel_layer.group_send(
                room.group_name,
                {
                    "type": "chat.leave",
                    "room_id": room_id,
                    "username": self.scope["user"].username,
                }
            )
        # Remove that we're in the room
        self.rooms.discard(room_id)
        # Remove them from the group so they no longer get room messages
        await self.channel_layer.group_discard(
            room.group_name,
            self.channel_name,
        )
        # Instruct their client to finish closing the room
        await self.send_json({
            "leave": str(room.id),
        })

    async def send_room(self, room_id, typ, message):
        """
        Called by receive_json when someone sends a message to a room.
        """
        # Check they are in this room
        if room_id not in self.rooms:
            raise ClientError("ROOM_ACCESS_DENIED")
        # Get the room and send to the group about it
        room = await utils.get_room_or_error(room_id, self.scope["user"])
        await self.channel_layer.group_send(
            room.group_name,
            {
                "type": typ,
                "room_id": room_id,
                "username": self.scope["user"].username,
                "message": message,
            }
        )

    ##### Handlers for messages sent over the channel layer

    # These helper methods are named by the types we send - so chat.join becomes chat_join
    async def chat_join(self, event):
        """
        Called when someone has joined our chat.
        """
        # Send a message down to the client
        await self.send_json(
            {
                "msg_type": settings.MSG_TYPE_ENTER,
                "room": event["room_id"],
                "username": event["username"],
            },
        )

    async def chat_leave(self, event):
        """
        Called when someone has left our chat.
        """
        # Send a message down to the client
        await self.send_json(
            {
                "msg_type": settings.MSG_TYPE_LEAVE,
                "room": event["room_id"],
                "username": event["username"],
            },
        )

    async def chat_message(self, event):
        """
        Called when someone has messaged our chat.
        """
        # Send a message down to the client
        await self.send_json(event,)
