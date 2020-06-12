from .models import Book
from rest_framework import serializers

class BookSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Book
        fields = ["title", "author", "recommender", "source", "amazon_link", "description", "book_type"]
