from django.http import HttpResponse
from django.urls import path

from jackmathews import views

urlpatterns = [
    path(
        r"^$",
        lambda request: HttpResponse("home"),
        name="home",
    ),
]
