1. Your file structure should have the Django app as the root with your frontend in its own file. In this project, the frontend is called "client"

Example
```bash
root
    .venv
    maindjangoapp
        __init__.py
        .env
        asgi.py
        settings.py
        urls.py
        wsgi.py
    subdjangoapp
    subdjangoapp
    client #frontend react app
    .gitignore
    manage.py
    Pipfile
    Pipfile.lock
```

2.  Install gunicorn and whitenoise if you do not have them

```bash
pipenv install whitenoise gunicorn dj_database_url
```

3. Add whitenoise to your middlewares in `mainappname`/settings.py. It is important it is near the top under `django.middleware.security.SecurityMiddleware`

```bash
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    ....other middlewares....
]
```

4. At the bottom of `mainappname`/settings.py add the following

```bash
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


REACT_APP_DIR = os.path.join(BASE_DIR, 'client')

STATICFILES_DIRS = [
    os.path.join(REACT_APP_DIR, 'build', 'static'),
]
```

5. Change ALLOWED_HOSTS setting in `mainappname`/settings.py

```bash
# Ideally, this should be the domains that you'll be running the app for
# for the purpose of this readme, set this to catch-all value
ALLOWED_HOSTS = ['*']
```

6. In the root directory create a file called Procfile and add the following content (without the <<>>)

```bash
web: gunicorn <<mainappname>>.wsgi
```

7. In the root folder, create a directory called staticfiles witha .gitkeep inside

```bash
mkdir staticfiles/
touch staticfiles/.gitkeep
git add -f staticfiles/.gitkeep
```

8. Create a views.py in `mainappname` directory and add the following

```bash
import os
import logging
from django.http import HttpResponse
from django.views.generic import View
from django.conf import settings


class FrontendAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    build`).
    """
    index_file_path = os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')

    def get(self, request):
        try:
            with open(self.index_file_path) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead after
                running `yarn start` on the frontend/ directory
                """,
                status=501,
            )
```

9. add the new view to your `mainappname` urls.py file

```bash
from django.contrib import admin
from django.urls import path, include, re_path
from .views import FrontendAppView

urlpatterns = [
    path('admin/', admin.site.urls),
	.... other urlpatterns.....
	# have it as the last urlpattern for BrowserHistory urls to work
    re_path(r'^', FrontendAppView.as_view()),
]
```

10. In your root directory create a package,json file amd add the following

Create file
```bash
touch package.json
```

file contents
```bash
{
    "name": "Aappname",
    "version": "1.0.0",
    "main": "index.js",
    "repository": "",
    "author": "your name",
    "license": "MIT",
    "private": true,
    "scripts": {
      "heroku-prebuild": "NODE_ENV=production cd client/ && yarn install && yarn build && cd .."
    },
    "cacheDirectories": [
      "client/node_modules"
    ]
  }

```

11. Create an empty yarn.lock file

```bash
touch yarn.lock
```

12. Git save all of your changes
```bash
git add .
git commit -m "deploying to heroku"
```

13. On Heroku create an app and add Heroku Posrgres as a resource

14. Set your environment details on heroku as needed by going to heroku/appname/settings/reveal config vars.

15. Depending on how your Django "DATABASES" variable is set in `mainappname`/settings.py you may need to add different settings for development and production, aswell as an additional environment variable.

```bash
import dj_database_url

...other code...

DATABASECONFIG = {
    'development': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'ctd_db',
        'USER': 'consider_the_drink',
        'PASSWORD': os.environ.get('DATABASE_PW'),
        'HOST': '127.0.0.1',
        'PORT': '5432',
    },
    #dj_database_url package formats heroku database url into django format, dont forget to import it at the top of your file
    'production': dj_database_url.config(conn_max_age=600, ssl_require=True)
    #This must be commented out to run locally
}

DATABASES = {
    'default': DATABASECONFIG[os.environ.get('DJANGO_ENV')]
}

#in .env
DJANGO_ENV=development
# do not set a DATABASE_URL in local .env

#on heroku
DJANGO_ENV=production
```

16. Add code `mainappname`/urls.py to serve Favicon

```bash
##other imports
from django.views.generic.base import RedirectView
from django.contrib.staticfiles.storage import staticfiles_storage

urlpatterns = [
    path(
        "favicon.ico",
        RedirectView.as_view(url=staticfiles_storage.url("favicon.ico")),
    ),
    #...other paths
]
```

17. Run heroku login, set heroku as a remote and set buildpacks (change <project_name>)

```bash
heroku login
heroku git:remote -a <project_name>
heroku buildpacks:set heroku/python
heroku buildpacks:add --index 1 heroku/nodejs
heroku config:set NODE_MODULES_CACHE=true

git push heroku main
```

18. Connect to heroku shell and seed database
```bash
heroku run bash

#your seeding code here
```
