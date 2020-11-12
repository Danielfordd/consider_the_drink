from django.db import models
from django.contrib.auth.models import User
from ingredient.models import Ingredient
from cocktail.models import Cocktail


class Bar(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)

    class Meta:
        db_table = "bars"


class FavCocktail(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cocktail = models.ForeignKey(Cocktail, on_delete=models.CASCADE)

    class Meta:
        db_table = "fav_cocktails"
