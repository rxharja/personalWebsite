from django.db import models

# Create your models here.


class Article(models.Model):

    title = models.CharField(max_length=120)
    created = models.DateTimeField(auto_now=True)
    description = models.CharField(max_length=250, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    content = models.TextField()

    def __str__(self):
        return self.title

    def image_url(self):
        return self.image.url
