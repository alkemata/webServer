from django.shortcuts import render,redirect
from .models import Room
from django.db.models import Count 
from .models import Kernel

def chat(request,room_name):
    return render(request, 'chat/chat.html', {"room":room_name})

def chatKernel(request):
	if request.method=="POST":	
		name=request.POST.get("kernel",None)
		checkExist=Kernel.objects.filter(name=name,owner=request.user).exists()
		if checkExist:
			return redirect("/chat/")
		else:
			Kernel.objects.create(name=name,owner=request.user)
			return redirect("/chat/")

def chatIndex(request):
	if request.method=="GET":
		kernels=Kernel.objects.all()
		rooms=Room.objects.all().annotate(connected_count=Count('connected_users'))
		return render(request, 'chat/chatIndex.html', {'rooms': rooms,'kernels':kernels})
	if request.method=="POST":
		title=request.POST.get("roomName",None)
		checkExist=Room.objects.filter(title=title).exists()
		if checkExist:
			return redirect("/chat/")
		else:
			room=Room.objects.create(title=title,creator=request.user)
			return redirect("/chat/"+title)

	