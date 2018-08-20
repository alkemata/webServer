from jupyter_client import ThreadedKernelClient

kernel_manager = KernelManager(client_class='IPython.kernel.threaded.ThreadedKernelClient')
kernel_manager.start_kernel()
kernel_client = kernel_manager.client()

class TestChannel(ThreadedZMQSocketChannel):
    def call_handlers(self, msg):
        # do something


class TestClient(ThreadedKernelClient):
    iopub_channel_class = Type(TestChannel)
    shell_channel_class = Type(TestChannel)
    stdin_channel_class = Type(TestChannel)

    kernel_manager = KernelManager(kernel_name='python', client_class='__main__.TestClient')