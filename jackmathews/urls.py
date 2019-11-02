from django.http import HttpResponse
from django.urls import path

from jackmathews import views

urlpatterns = [
    path("/", lambda request: HttpResponse("home")),
]
