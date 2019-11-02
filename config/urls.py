from django.conf import settings
from django.contrib import admin
from django.http import HttpResponse
from django.urls import include, path

urlpatterns = [
    path("_liveness", lambda: HttpResponse("We gucci.")),
    path("_readiness", include("health_check.urls")),
    path("admin/", admin.site.urls),
    path("", include("api.urls")),
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
