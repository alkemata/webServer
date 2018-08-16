from django.views import View
from django.shortcuts import render

class Chat(View):
    return render(request, 'chat/index.html', {})