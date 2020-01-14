from django.db import models
from django.conf import settings


class PortfolioItem(models.Model):
    title = models.TextField(blank=False)
    date = models.DateField(blank=False)
    url = models.TextField(blank=False)
    thumbnail = models.ImageField(upload_to=f"{settings.AWS_STORAGE_BUCKET_NAME}_{settings.STAGE}", blank=False)
    service = models.ForeignKey("Service", on_delete=models.CASCADE, blank=False)

    def __str__(self):
        return f"{self.title} - {self.service.name} - {self.date}"


class Service(models.Model):
    name = models.TextField()  # (youtube, vimeo, instagram, external)

    def __str__(self):
        return f"{self.name}"
