## Major Features
- [Features Overview](#Features-Overview)
- [Cocktail Recommender](#Cocktail-Recommender)
- [Cocktail Filtering](#Cocktail-Filtering)
- [User's Favorites](#User's-Favorites)
- [User's Cocktail Notes](#User's-Cocktail-Notes)
- [User Authentication](#User-Authentication)
- [Future Features](#Future-features)

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

> Current Status: Ongoing Development

## Cocktail Recommender
***
The recommender receives a list of ingredients input by the user and returns cocktails that can be made now, cocktails that can be made with one additional ingredient, and cocktails that can be made with two additional ingredients.

--gif here--

Upon navigation to "/ingredients/search" an asynchronous fetch call is made to the Django API to query the Postgres database and receive a full list of ingredient names. The ingredient names received from the fetch call are stored in the ingredients slice of redux state and mapped into a react container.

When a user clicks an ingredient, that ingredient is added to a filter inside of the ingredient slice of state. Every click also makes an asynchronous fetch call, with the filtered ingredient, to the Django API function cocktail__sort.

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
***
The website's home page is "/cocktails/all/1" which a user can also reach by clicking the logo or "Cocktails" in the navigation bar.

Users are able to filter cocktails alphabetically or by selecting provided tags. The results of the filter are paginated at 16 cocktails per page.

--gif here--

The cocktails that are rendered on the page are returned from an ascynchronous fetch call to the Django API. The cocktail sort function accepts 4 parameters, page number, quantity, sort, and tags passed with the fetch call.

Pagination is acheived through slicing the cocktail query set where start = (multiplying quantity * page -1) and end = (start + quantity). When a user clicks a new page it re-fetches the Django API.

```bash
Cocktail.objects.all().order_by(sort_by)[start:end]
```

Alphabetical sort is acheived through the "A-Z" and "Z-A" select field. When the select changes it sends a new fetch request to the Django API sorting function. If the value is "A-Z" it makes sets the variable sort_by and passes it into .order_by()

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
***
A logged in user is able to favorite cocktails on a cocktail's detail page and see that they have favorited the cocktail on any time that cocktail card is displayed.

--gif--

When a user clicks the heart (favorite icon) an api call is sent to the Django API function change_favorite. First the function checks if there is an entry in the favcocktails database and if there is the it deletes the entry. After deleting it responds "False". If there is no entry it creates an entry and responds "True"

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

When cocktail cards are rendered they each send a fetch call to the Django API function is_favorite that checks if there is an entry in favcocktails.

## User Cocktail Notes
***
A logged in user is to able to leave notes on cocktails, view them, and delete them. The notes are rendered by a fetch call to the Django API function all_notes which returns all notes for that cocktail and user.

Notes are written in the bottom textarea field, which keeps track of the typed value in a react useState hook. When the user submits the textarea field a fetch call is made to the Django API which creates a new note entry. The new note is sent back as a JSON response and put into the redux slice of state "Cocktail/current/notes". This slice of state is mapped over and displayed on the screen.

--gif--


## User Authentication
***
A user is able to view cocktails and receive recommendations based off of ingredients without logging in. In order to save bar ingredients, favorite cocktails, and write notes for cocktails.

A user without an account can sign up by navigating to "/signup". The information in the signup form is kept track of through react useState hooks and on submit sends a fetch call with the information to the Django API. The API passes the form data into a serializer that validates the data and creates a JSON web token. The user is then created and saved into the database and a JSON response is sent back with the token.

```bash
class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
```

On the frontend, the token from the response is set into local storage. The token is then decoded and the user id, user name and email is set into the redux slice of state "authentication".

```bash
    if (response.ok) {
      const user = await response.json();
      localStorage.setItem('token', user.token);
      const payload = user.token.split(".")[1];
      const decodedPayload = atob(payload);
      const payloadObj = JSON.parse(decodedPayload);
      dispatch(setUser(payloadObj));
    }
```
The default state of the authentication slice of state is loaded by checking for the JSON web token in local storage and if it exists loading it.

```bash
function loadUser() {
  const authToken = localStorage.getItem("token");

  if (authToken) {
    try {
      const payload = authToken.split(".")[1];
      const decodedPayload = atob(payload);
      const payloadObj = JSON.parse(decodedPayload);

      return payloadObj
    } catch (e) {
      localStorage.removeItem("token")
    }
  }
  return {user_id: false, username: "", exp: false, email: "" };
}
```

To login, the user submits their information to the Django API which checks if a matching user exists in the database, if it does it sends a JSON web token back. The token is then decoded and the user id, user name and email is set into the redux slice of state "authentication".

When a user clicks "Logout" it deletes the Json web token and sends an empty user object to the redux slice of state "authentication".

```bash
export const logout = () => async dispatch => {
  localStorage.removeItem('token');
  dispatch(removeUser());
}
```

## Future Features
***
## Social
Allow users to find other users and see their cocktail notes

## External API Access
Allow outside users to access the backend for cocktail information. On the website documentation will be provided that includes sample queries and the output from the given query.


## Known Bugs
***

- Design is not fully responsive is displays poorly on small screens.
