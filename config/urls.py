from django.conf import settings
from django.contrib import admin
from django.contrib.staticfiles.templatetags.staticfiles import static
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import include, path, re_path

urlpatterns = [
    path("_alive", lambda request: HttpResponse("I'm alive."), name="alive"),
    path("_health", include("health_check.urls"), name="health"),
    path("_ready", lambda request: HttpResponse("I'm ready."), name="ready"),
    path("admin/", admin.site.urls),
    re_path(r"^accounts/", include("allauth.urls")),
    path(r"^favicon.ico", lambda x: HttpResponseRedirect(static("static/img/favicon.ico"))),
    path(
        r"^robots.txt",
        lambda x: HttpResponse("User-Agent: *\nDisallow:", content_type="text/plain"),
        name="robots_file",
    ),  # noqa: E501
    path("", include("jackmathews.urls")),
]

if settings.DEBUG:
    # Add view for Django settings
    from config import debug

    urlpatterns += [path(r"_debug_info/", debug.splode)]

    # Add views to debug error templates
    import django.views.defaults

    urlpatterns += [
        path(r"_debug_404/", django.views.defaults.page_not_found),
        path(r"_debug_500/", django.views.defaults.server_error),
        path(r"_debug_400/", django.views.defaults.bad_request),
        path(r"_debug_403/", django.views.defaults.permission_denied),
    ]

    # Add static files URL
    import django.contrib.staticfiles.urls

    urlpatterns += django.contrib.staticfiles.urls.urlpatterns
