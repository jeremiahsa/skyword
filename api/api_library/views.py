from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import CreateUserSerializer, LoginUserSerializer, UserSerializer
from django.db.models import Count, Max

from . import models
from . import serializers

class ReviewersViewSet(viewsets.ModelViewSet):
    queryset = models.Reviewer.objects.all()
    serializer_class=serializers.ReviewerSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = models.Book.objects.all() \
        .values('title', 'author', 'description', 'book_type', 'genre', 'length', 'publish_year') \
        .annotate(book_id=Max('id'), recommenders=Count('recommender'))
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
            #queryset = queryset.annotate(recommenders=Count('recommender')).values('title', 'author', 'source', 'recommenders', 'amazon_link', 'description').filter(recommenders==recommenders).distinct()
            queryset = queryset \
                .values('author', 'title', 'description', 'book_type', 'genre', 'length', 'publish_year',) \
                .annotate(book_id=Max('id'), count_reviewers=Count('reviewers'), recommenders=Count('recommender')) \
                .filter(recommenders=count)
            #queryset = queryset.annotate(recommenders=count_status)
            return queryset
        else:
            #queryset = queryset.filter(author=author).values('title', 'author', 'amazon_link', 'description', 'book_type', 'genre', 'length', 'publish_year', 'on_list', 'review_excerpt').annotate(recommenders=Count('recommender'))
            queryset = queryset \
                .values('title', 'author', 'description', 'book_type', 'genre', 'length', 'publish_year', 'review_excerpt') \
                .annotate(book_id=Max('id'), count_reviewers=Count('reviewers'), recommenders=Count('recommender')) \
                .filter(author=author)
            return queryset





######################
# Authentication Views
#######################

class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })