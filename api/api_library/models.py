from django.db import models

class Book(models.Model):
    title=models.CharField(max_length=30)
    author=models.CharField(max_length=100)
    recommender=models.CharField(max_length=100)
    source=models.TextField()
    amazon_link=models.TextField()
    description=models.TextField()
    book_type=models.TextField()
    genre=models.TextField()
    length=models.IntegerField()
    publish_year=models.IntegerField()
    on_list=models.TextField()
    review_excerpt=models.TextField()