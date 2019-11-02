from django.http import HttpResponse
from django.urls import path, re_path

from jackmathews import views

urlpatterns = [re_path(r"^$", lambda request: HttpResponse("home"), name="home")]
