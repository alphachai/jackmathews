from django.http import HttpResponse
from django.urls import gpath

from jackmathews import views

urlpatterns = [
    path("", lambda request: HttpResponse("home")),
]
