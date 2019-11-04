from django.db import models


class PortfolioItem(models.Model):
    thumbnail_url = models.TextField()
    title = models.TextField()
    date = models.DateField()
    external_link = models.TextField()


class MediaType(models.Model):
    name = models.TextField()  # (youtube, vimeo, external)


class Media(models.Model):
    portfolio_item = models.ForeignKey("PortfolioItem", on_delete=models.CASCADE)
    media_type = models.ForeignKey("MediaType", on_delete=models.CASCADE)
    url = models.URLField()
    object_id = models.TextField()
