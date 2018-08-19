from django.shortcuts import render,redirect
from .models import Room
from django.db.models import Count 

def chat(request,room_name):
    return render(request, 'chat/chat.html', {"user":request.user.username,"room":room_name})


def chatIndex(request):
	if request.method=="GET":
		rooms=Room.objects.all().annotate(connected_count=Count('connected_users'))
		return render(request, 'chat/chatIndex.html', {'rooms': rooms})
	if request.method=="POST":
		title=request.POST.get("roomName",None)
		checkExist=Room.objects.filter(title=title).exists()
		if checkExist:
			return redirect("/chat/")
		else:
			room=Room.objects.create(title=title,creator=request.user)
			return redirect("/chat/"+title)

	