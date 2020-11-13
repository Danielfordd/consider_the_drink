- Site-wide navigation element
- Signed-out Homepage that includes information about the site,link to signup/login, and container to input ingredients with current ingredients container below and results to right.
- Search feature that lists matching ingredient results dynamically as you type
- Authentication - sign up with username/email/password, login/logout, demo user login. If user tries to navigate to protected portions of site, will be redirected to Signed-out homepage.
- Landing page that user is directed to upon login that gives diplay of their bar, and container to input ingredients with results container to right.
- "Explore All cocktails" page that serves list of all cocktails, with sorting options and pagination.
- Search functionality to view details for particular cocktail.
- Cocktail detail page that contains details of specified Cocktail and market and variations of the cocktail. If signed in also an area that contains user notes and allows the user to edit / create / delete      those notes

## Technologies
- React
- Redux
- Django
- PostgreSQL
- Heroku

## Installation
1. Clone the repository

   ```bash
   $ git clone https://github.com/Danielfordd/consider_the_drink.git
   ```

2. Install python dependencies
   ```bash
   $ pipenv install --dev -r dev-requirements.txt --python=python3 && pipenv install -r requirements.txt
   ```

3. Open psql and create user and database
   - Create user "consider_the_drink" with password "<<super_strong_secret_password>>"
   - Create database ctd_db with owner consider_the_drink

4. In backend/api create a .env and add configuration modeled from .env.example

5. Enter pipenv and cd into /backend
   ```bash
   $ pipenv shell
   $ cd backend/
   ```
6. Run migration
   ```bash
   $ python manage.py migrate
   ```

7. Seed data
   ```bash
    $ python manage.py loaddata seed/users.json
    $ python manage.py loaddata seed/ingredients.json
    $ python manage.py loaddata seed/bar.json
    $ python manage.py loaddata seed/cocktail.json
    $ python manage.py loaddata seed/favcocktails.json
    $ python manage.py loaddata seed/taggedcocktails.json
   ```

8. Run Django server
   ```bash
   $ python manage.py runserver
   ```

9. Install Javascript dependencies
   ```bash
   #in root directory
   $ cd client/
   $ npm install
   ```

10. Run front-end
   ```bash
   #in client/
   $ npm start
   ```

*IMPORTANT!*
If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
You can do this by running:
```bash
$ pipenv lock -r > requirements.txt
```

## Features Overview
-test

## Cocktail Recommender
-test

## Cocktail Filtering
-test

## User Favorites
-test

## User Cocktail Notes
-test

## User Authentication
-test

## User Stories
1. As an unauthorized user, I want to view a home page that provides me with information about the site, and the ability to log in.

2. As an unauthorized user, I want to be able to sign up for the website via a signup form in order to access protected content.

3. As an unauthorized user, I want to be able to login to the website, via a form, in order to access my private bar information.

4. As an authorized user, I want to be able to log out of the application in order to protect my private bar information.

5. As an authorized user, I want a clear and consistent way to navigate across the site.

6. As an authorized user, I want to be able to search for cocktails by name.

7. As an authorized user, I want to be able to navigate to "My Bar" to view select details of all saved ingredients.

8. As an authorized user, I want to be able to browse through cocktails without providing a specific name or specific ingredients.

## Database Schema

https://dbdiagram.io/d/5fa0692f3a78976d7b7a327d

## Wireframe
https://www.canva.com/design/DAEMY04EGyw/bZSbfOcRpF818PYuOI2OIw/view?utm_content=DAEMY04EGyw&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink


## Frontend Routes
- `/` Home/Landing Page with website info, ingredient search container, current ingredients container, and cocktail results
- `/login` Login Page
- `/signup` Signup Page
- `/mybar` Detail page for a signed in user's bar
- `/cocktails` Explore Cocktails Page
- `/cocktails/${id}}` Cocktail Detail Page (directed from search or recommendation)
- `/api/documentation` API documentation page that lists endpoints structure and example queries / example json response
- `/logout` Deletes user's local storage token and redirects to `/`. Not accessable if logged out.

## Backend Routes
- `/api/users/login` Querys the database off email and validates user's email & password. If successful sends a jwt back that is put into localstorage. Redirects to `/`
- `/api/users/signup` Validates user's submitted information. If successful creates a user and sends a jwt back that is put into localstorage. Redirects to `/`
- `/api/cocktails/query` JSON response with filtered cocktail info + cocktail variations
- `/api/cocktails/${id}}` JSON response with cocktail info + cocktail variations
- `/api/ingredients` JSON response with all ingredients and associated ingredient categories
