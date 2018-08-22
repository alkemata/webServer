from channels.db import database_sync_to_async

from .exceptions import ClientError
from .models import Room,Kernel


# This decorator turns this function from a synchronous function into an async one
# we can call from our async consumers, that handles Django DBs correctly.
# For more, see http://channels.readthedocs.io/en/latest/topics/databases.html
@database_sync_to_async
def get_room_or_error(room_id, user):
    """
    Tries to fetch a room for the user, checking permissions along the way.
    """
    # Check if the user is logged in
    if not user.is_authenticated:
        raise ClientError("USER_HAS_TO_LOGIN")
    # Find the room they requested (by ID)
    try:
        room = Room.objects.get(title=room_id)
        return room
    except Room.DoesNotExist:
        raise ClientError("ROOM_INVALID")


@database_sync_to_async
def addUser(room_id,user):
    room=Room.objects.get(title=room_id)
    if not(room.connected_users.filter(pk=user.pk).exists()):
	    room.connected_users.add(user)

@database_sync_to_async
def kernelRegistered(kernelName):
	return Kernel.objects.filter(name=kernelName).exists()

@database_sync_to_async
def addKernel(room_id,kernelName):
	Room.objects.get(title=room_id).connected_users.add(Kernel.objects.get(name=kernelName))

@database_sync_to_async
def getUsers(room_id):
    results=Room.objects.get(title=room_id).connected_users.all().values_list('username', flat=True) 
    return results