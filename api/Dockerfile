#https://docs.docker.com/compose/django/

FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /api
WORKDIR /api
COPY requirements.txt /api
RUN pip3 install -r requirements.txt
COPY . /api
EXPOSE 8001
CMD python3 manage.py runserver 0.0.0.0:8001

