from websocket import WebSocketApp,enableTrace
from jupyter_client.threaded import ThreadedKernelClient,ThreadedZMQSocketChannel
from jupyter_client import  KernelManager, KernelClient
import json
from traitlets import Type, Instance
import ssl

def on_message(ws, message):
    print('message received')
    data=json.loads(message)
    print(data)
    command=data["command"]
    if command=="kernel_request":
	    ws.kernel_client.execute(data["code"])

def on_error(ws, error):
    print(error)

def on_close(ws):
    print("### closed ###")

def on_open(ws):
    print('joining room')
    message={"command":"join","room":"testroom2","kernelName":"python3"}
    ws.send(json.dumps(message))

class TestChannel(ThreadedZMQSocketChannel):

    def call_handlers(self, msg):
        ws=self.ws
        ws.dispatch(msg)


class TestClient(ThreadedKernelClient):
    iopub_channel_class = Type(TestChannel)
    shell_channel_class = Type(TestChannel)
    stdin_channel_class = Type(TestChannel)


class MyWebSocketApp(WebSocketApp):

    def dispatch(self,msg):
        print(msg)
        header=msg["header"]
        content=msg["content"]
        msg_type=header["msg_type"]
        if msg_type=="execute_reply":
            status=content["status"]
            self.send(json.dumps({"command":"infoKernel","message":status}))
        elif msg_type=="display_data":
	        content["output_type"]="display_data"
	        self.send(json.dumps({"command":"resultKernel","result":content}))
        elif msg_type=="status":
	        state=content["execution_state"]
	        self.send(json.dumps({"command":"changeKernelState","state":state}))
        elif msg_type=="stream":
	        content["output_type"]="stream"
	        self.send(json.dumps({"command":"resultKernel","result":content}))
        elif msg_type=="execute_result":
	        content["output_type"]="execute_result"
	        self.send(json.dumps({"command":"resultKernel","result":content}))

if __name__ == "__main__":

    kernel_manager = KernelManager(kernel_name='python3', client_class='__main__.TestClient')
    kernel_manager.start_kernel()
    print('Kernel started')
    kernel_client=kernel_manager.client()
    kernel_client.start_channels(shell=True,iopub=True,stdin=False,hb=False)
    print('Channels started')
    print(kernel_client.channels_running)
    #enableTrace(True)
    ws = MyWebSocketApp("wss://192.168.56.2/ws/chat/testroom2/",
                              on_message = on_message,
                              on_error = on_error,
                              on_close = on_close)  
    ws.kernel_client=kernel_client
    print('websocket opened')
    kernel_client.iopub_channel.ws=ws
    kernel_client.shell_channel.ws=ws
    print(kernel_client.shell_channel.ws)
    print('ws linked to kernel')
    
    ws.on_open = on_open
    ws.run_forever(sslopt={"cert_reqs": ssl.CERT_NONE},ping_timeout=100.0)