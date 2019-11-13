import json
import logging
from django.conf import settings
from django.shortcuts import render
from django.views.generic import TemplateView

logger = logging.getLogger()


class AbstractView(TemplateView):
    def build_context(self, request, context={}):
        base_context = {
            "debug": settings.DEBUG,
            "context": json.dumps(
                {"debug": settings.DEBUG}  # For javascript.
            ),
        }
        base_context.update(context)
        return base_context


class Home(AbstractView):
    template_name = "home.html"

    def get(self, request):
        return render(request, self.template_name, self.build_context(request))
