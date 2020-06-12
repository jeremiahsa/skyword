from rest_framework import viewsets
from django.db.models import Count

from . import models
from . import serializers

class BookViewSet(viewsets.ModelViewSet):
    queryset = models.Book.objects.all()
    serializer_class = serializers.BookSerializer

class FilteredBookViewSet(viewsets.ModelViewSet):
    #queryset = models.Book.objects.all()
    serializer_class = serializers.GroupedBookSerializer
    def get_queryset(self):
        '''
        https://www.django-rest-framework.org/api-guide/filtering/
        https://docs.djangoproject.com/en/3.0/topics/db/aggregation/
        To tweak this queryset, we will need to accept "count" as a parameter. 
        Count = index of title, author, recommender.
        would be the equivalent SQL of: 
            SELECT title, author, source, json_agg(recommender) AS recommender, 
                amazon_link, description, book_type, genre, length, publish_year, on_list, review_excerpt
            FROM Book 
            GROUP BY title, author
            HAVING count(title) = {$COUNT}
        '''
        count = self.request.query_params.get('count', None)
        author = self.request.query_params.get('author', None)
        queryset = models.Book.objects.all()
        if count is not None:
            queryset = queryset.filter(count=count).values('title', 'count', 'author', 'source', 'recommender', 'amazon_link', 'description').annotate(recommenders=Count('recommender'))
            return queryset
        else:
            queryset = queryset.filter(author=author).values('title', 'author', 'amazon_link', 'description', 'book_type', 'genre', 'length', 'publish_year', 'on_list', 'review_excerpt').annotate(recommenders=Count('recommender'))
            return queryset