from django.db import models
from django.conf import settings
from user.models import User


class Kernel(models.Model):
    name = models.CharField(max_length=255)


class Message(models.Model):
    content = models.TextField()
    type = models.CharField(max_length=20)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)


class Room(models.Model):
    """
    A room for people to chat in.
    """

    # Room title
    title = models.CharField(max_length=255)
    connected_users = models.ManyToManyField(
        User, related_name='connected_users')  #TODO wagtail user instead
    connected_kernels = models.ManyToManyField(
        Kernel, related_name='connected_kernels')
    creator = models.ForeignKey(
        User, related_name='creator', on_delete=models.CASCADE)
    messages = models.ManyToManyField(Message)

    def get_latest_messages(self):
        return self.messages.order_by('-id')[:10]

    def __str__(self):
        return self.title

    @property
    def group_name(self):
        """
        Returns the Channels Group name that sockets should subscribe to to get sent
        messages as they are generated.
        """
        return "room-%s" % self.id