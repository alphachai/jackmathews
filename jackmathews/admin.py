from django.contrib import admin
from django.contrib.contenttypes.admin import GenericTabularInline

from jackmathews.models import PortfolioItem, Service


# class PortfolioItemInline(GenericTabularInline):
#     model = PortfolioItem
#
#
# class PortfolioItemAdmin(admin.ModelAdmin):
#     inlines = [
#         PortfolioItemInline,
#     ]


admin.site.register(PortfolioItem)  # , PortfolioItemAdmin)
admin.site.register(Service)
