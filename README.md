This should be able to install by git cloning the repository. 

Open in VSCode with the Docker extension and you should be able to right click the "docker-compose.yml" and "Compose Up" whereupon it will download the essential dependencies. 

The api/Dockerfile includes the other instructions needed to start the project. I did these manually by launching the CLI for the api, then typing these commands:
`python3 manage.py makemigrations api_library`
`python3 manage.py migrate`
`python3 manage.py shell`
Then within the python shell, import the initial database text file and the script will run. 
`import database_import.py`
The only thing that's left is to enable the /admin/ interface for interacting with Django
`python3 manage.py createsuperuser`

The application can be accessed via the browser locally at: http://localhost:3000/

I ran out of time to be able to deploy to production.
