from django.shortcuts import render
from django.http import JsonResponse
from .models import Ingredient, IngredientCategoryList, IngredientCategory


# Create your views here.
def all_ingredients(request):
    """
    Queryes the database for all ingredients and returns them in a json
    formatted array under the key "ingredients"
    """
    ingredientsQuery = Ingredient.objects.all()
    ingredients = [ing.ingredient_name for ing in ingredientsQuery]
    return JsonResponse({'ingredients': ingredients})
