#https://docs.docker.com/compose/django/

#https://dev.to/englishcraig/docker-django-react-building-assets-and-deploying-to-heroku-24jh

# How to containerize this for production: 
#https://medium.com/faun/tech-edition-how-to-dockerize-a-django-web-app-elegantly-924c0b83575d
FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /api
WORKDIR /api
COPY requirements.txt /api
RUN pip3 install -r requirements.txt
COPY . /api
EXPOSE 8001
# The following four commented out parts will need to be run prior to deployment. 
#CMD python3 manage.py makemigrations api_library
#CMD python3 manage.py migrate
#CMD python3 manage.py shell 
#>>>   import database_import.py
CMD python3 manage.py runserver 0.0.0.0:8001

