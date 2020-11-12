from django.shortcuts import render
from django.http import JsonResponse
from .models import Bar, FavCocktail
from cocktail.models import Cocktail, CocktailNote
from ingredient.models import Ingredient
from django.contrib.auth.models import User
import simplejson as json


def user_bar(request, id):
    bar = Bar.objects.filter(user__id=id).order_by('ingredient__ingredient_name')  # noqa
    userbar = [b.ingredient.ingredient_name for b in bar]
    return JsonResponse({'userbar': userbar})


def user_favorites(request, id):
    favorites = [[cocktail.cocktail.cocktail_name,
                  cocktail.cocktail.cocktail_image] for cocktail in
                 FavCocktail.objects.filter(user__id=id)]
    return JsonResponse({"favorites": favorites})


def is_favorite(request, cocktailId, userId):
    if userId is None or cocktailId is None:
        return JsonResponse({'favorited': False})
    favorited = FavCocktail.objects.filter(cocktail=cocktailId, user=userId)
    fav = len(favorited) > 0
    return JsonResponse({'favorited': fav})


def change_favorite(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    cocktailId = int(body['cocktail'])
    userId = int(body['id'])

    exists = FavCocktail.objects.filter(cocktail=cocktailId, user=userId)
    if len(exists) > 0:
        exists.delete()
        return JsonResponse({'favorited': False})
    user = User.objects.get(pk=userId)
    cocktail = Cocktail.objects.get(pk=cocktailId)
    fav = FavCocktail(user=user, cocktail=cocktail)
    fav.save()
    return JsonResponse({'favorited': True})


def create_note(request):
    body_unicode = request.body.decode('utf-8')

    note = json.loads(body_unicode)['note']
    cocktailId = int(json.loads(body_unicode)['cocktailId'])
    userId = int(json.loads(body_unicode)['userId'])

    cocktail = Cocktail.objects.get(pk=cocktailId)
    user = User.objects.get(pk=userId)

    new_note = CocktailNote(cocktail=cocktail, user=user, note=note)
    new_note.save()

    cocktail_notes = CocktailNote.objects.filter(user__id=userId,
                                                 cocktail__id=cocktailId)
    notes = [(note.note, note.id) for note in cocktail_notes]

    return JsonResponse({'notes': notes})


def all_notes(request, userId, cocktailId):
    cocktail_notes = CocktailNote.objects.filter(user__id=userId,
                                                 cocktail__id=cocktailId)
    notes = [(note.note, note.id) for note in cocktail_notes]

    return JsonResponse({'notes': notes})


def delete_note(request):
    body_unicode = request.body.decode('utf-8')
    noteId = int(json.loads(body_unicode)['noteId'])
    print(noteId)
    note_to_delete = CocktailNote.objects.get(pk=noteId)
    note_to_delete.delete()
    return JsonResponse({'deletedNoteId': noteId})


def delete_ingredient(request):
    body_unicode = request.body.decode('utf-8')
    ingredient = json.loads(body_unicode)['ingredient']

    toDelete = Bar.objects.filter(ingredient__ingredient_name=ingredient)
    toDelete.delete()

    return JsonResponse({'ingredientToRemove': ingredient})


def create_ingredient(request):
    body_unicode = request.body.decode('utf-8')
    ingredient = json.loads(body_unicode)['ingredient']
    userId = int(json.loads(body_unicode)['userId'])

    exists = Bar.objects.filter(ingredient__ingredient_name=ingredient, user__id=userId)
    if len(exists):
            return JsonResponse({'addedIngredient': 'duplicate'})

    user = User.objects.get(pk=userId)
    ingredientMatch = Ingredient.objects.filter(ingredient_name=ingredient)[0]

    new_mybar_ing = Bar(user=user, ingredient=ingredientMatch)
    new_mybar_ing.save()
    print(ingredient)
    return JsonResponse({'addedIngredient': ingredient})
