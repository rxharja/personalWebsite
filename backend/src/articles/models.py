from django.db import models

# Create your models here.


class Article(models.Model):

    title = models.CharField(max_length=120)
    description = models.CharField(max_length=250)
    image = models.ImageField()
    content = models.TextField()

    def __str__(self):
        return self.title

    def image_url(self):
        return self.image.url
