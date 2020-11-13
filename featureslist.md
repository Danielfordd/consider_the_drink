## Features - MVP
- [Features Overview](#Features-Overview)
- [Cocktail Recommender](#Cocktail-Recommender)
- [Cocktail Filtering](#Cocktail-Filtering)
- [User's Favorites](#User's-Favorites)
- [User's Cocktail Notes](#User's-Cocktail-Notes)
- [User Authentication](#User-Authentication)

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
    $ python manage.py loaddata seed/all.json
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
***
Consider the Drink is a website to discover new cocktails and get recommendations based off of the ingredients you have. The features listed below focus on the functionality of the finding and filtering cocktails as well as users interacting with them.

> Current Status: ongoing development

## Cocktail Recommender
***
The recommender receives a list of ingredients input by the user and returns cocktails that can be made now, cocktails that can be made with one additional ingredient, and cocktails that can be made with two additional ingredients.

--gif here--

Upon navigation to "/ingredients/search" an asynchronous fetch call is made to the Django backend to query the Postgres database and receive a full list of ingredient names. The ingredient names received from the fetch call are stored in the ingredients slice of redux state and mapped into a react container.

When a user clicks an ingredient, that ingredient is added to a filter inside of the ingredient slice of state. Every click also makes an asynchronous fetch call, with the filtered ingredient, to the Django backend function cocktail__sort.

The cocktails are looped through and checked to see if they contain ingredients within the filtered ingredient. For every filtered ingredient the cocktail contains a match count is increased. If the cocktail has the same number of match count as ingredients contained it is added to the exact response "res". If it is one less it is added to "rone" and if it is two less it is added to "rtwo".

```bash
    res = []
    rone = []
    rtwo = []
    for ct in cts:
        ingCount = 0
        ingCheck = {}
        for ing in ingTest:
            if ing in ingCheck:
                continue
            else:
                ingCheck[ing] = True
            if ing in cts[ct]:
                ingCount += 1
                if ingCount >= len(cts[ct]):
                    res.append(ct)
                    break
        if ingCount == (len(cts[ct]) - 1) > 0:
            rone.append(ct)
        elif ingCount == (len(cts[ct]) - 2) > 0:
            rtwo.append(ct)
```

The matches are sent back to react and stored in the redux slice of state "cocktail matches". The matches are mapped into a results container on the side.

## Cocktail Filtering
The website's home page is "/cocktails/all/1" which a user can also reach by clicking the logo or "Cocktails" in the navigation bar.

Users are able to filter cocktails alphabetically or by selecting provided tags. The results of the filter are paginated at 16 cocktails per page.

--gif here--

The cocktails that are rendered on the page are returned from an ascynchronous fetch call to the Django API. The cocktail sort function accepts 4 parameters, page number, quantity, sort, and tags passed with the fetch call.

Pagination is acheived through slicing the cocktail query set where start = (multiplying quantity * page -1) and end = (start + quantity). When a user clicks a new page it re-fetches the Django backend.

```bash
Cocktail.objects.all().order_by(sort_by)[start:end]
```

Alphabetical sort is acheived through the "A-Z" and "Z-A" select field. When the select changes it sends a new fetch request to the Django sorting function. If the value is "A-Z" it makes sets the variable sort_by and passes it into .order_by()

```bash
    sort_by = ""
    if "name_asc" == sort:
        sort_by = "cocktail_name"
    else:
        sort_by = "-cocktail_name" #this reverses the order

   #... other code
        cocktails = list(Cocktail.objects
                         .filter(cocktailtagjoin__tag__tag__in=tags)
                         .annotate(num_tags=Count('cocktailtagjoin__tag'))
                         .filter(num_tags=len(tags))
                         .distinct()
                         .order_by(sort_by)[start:end])
```

Tag filtering is acheived through the user selecting tags which triggers a fetch call to the API's sort function, passing in all selected tags. The selected tags are put into a list and every cocktail is filtered by checking if a provided tag is within that cocktail's tag join table. For every tag that is within both, the count is increased with .annotate. After looping through the cocktails only the cocktails with an annotation count equal to the length of the provided tags. Any duplicate entries are removed with .distinct().

--gif--

```bash
cocktails = list(Cocktail.objects
                  .filter(cocktailtagjoin__tag__tag__in=tags)
                  .annotate(num_tags=Count('cocktailtagjoin__tag'))
                  .filter(num_tags=len(tags))
                  .distinct()
                  .order_by(sort_by)[start:end])
```

## User Favorites
A logged in user is able to favorite cocktails on a cocktail's detail page and see that they have favorited the cocktail on any time that cocktail card is displayed.

--gif--

When a user clicks the heart (favorite icon) an api call is sent to the Django backend function change_favorite. First the function checks if there is an entry in the favcocktails database and if there is the it deletes the entry. After deleting it responds "False". If there is no entry it creates an entry and responds "True"

```bash
    exists = FavCocktail.objects.filter(cocktail=cocktailId, user=userId)
    if len(exists) > 0:
        exists.delete()
        return JsonResponse({'favorited': False})
    user = User.objects.get(pk=userId)
    cocktail = Cocktail.objects.get(pk=cocktailId)
    fav = FavCocktail(user=user, cocktail=cocktail)
    fav.save()
    return JsonResponse({'favorited': True})
```

When cocktail cards are rendered they each send an API call to the Django backend function is_favorite that checks if there is an entry in favcocktails.

## User Cocktail Notes
A logged in user is to able to leave notes on cocktails, view them, and delete them. The notes are rendered by an API call to the Django backend function all_notes which returns all notes for that cocktail and user.



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
