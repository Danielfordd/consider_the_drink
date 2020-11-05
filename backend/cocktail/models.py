from django.db import models
from ingredient.models import Ingredient
from django.contrib.auth.models import User


class Cocktail(models.Model):
    cocktail_name = models.CharField(max_length=255, unique=True)
    cocktail_description = models.TextField()

    class Meta:
        db_table = "cocktails"

    def __str__(self):
        return self.cocktail_name


class ServedName(models.Model):
    served_name = models.CharField(max_length=75, unique=True)

    class Meta:
        db_table = "served_names"

    def __str__(self):
        return self.served_name


class Served(models.Model):
    cocktail = models.ForeignKey(Cocktail, on_delete=models.CASCADE)
    served = models.ForeignKey(ServedName, on_delete=models.CASCADE)

    class Meta:
        db_table = "served"


class GlasswareName(models.Model):
    glass_name = models.CharField(max_length=75, unique=True)

    class meta:
        db_table = "glassware_names"

    def __str__(self):
        return self.glass_name


class Glassware(models.Model):
    glass = models.ForeignKey(GlasswareName, on_delete=models.CASCADE)
    cocktail = models.ForeignKey(Cocktail, on_delete=models.CASCADE)

    class meta:
        db_table = "glasswares"


class Instruction(models.Model):
    cocktail = models.ForeignKey(Cocktail, on_delete=models.CASCADE)
    order = models.IntegerField()
    instruction = models.TextField()

    class meta:
        db_table = "instructions"


class Recipe(models.Model):
    cocktail = models.ForeignKey(Cocktail, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    order = models.IntegerField()
    ingredient_quantity = models.CharField(max_length=50)

    class Meta:
        db_table = "recipes"


class Variation(models.Model):
    cocktail = models.ForeignKey(Cocktail, on_delete=models.CASCADE,
                                 related_name='source_cocktail')
    variation = models.ForeignKey(Cocktail, on_delete=models.CASCADE,
                                  related_name='variation_cocktail')

    class Meta:
        db_table = "variations"


class CocktailNote(models.Model):
    cocktail = models.ForeignKey(Cocktail, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    note = models.TextField()
    date_edited = models.DateTimeField
    date_created = models.DateTimeField

    class Meta:
        db_table = "cocktail_notes"


class CocktailTag(models.Model):
    tag = models.CharField(max_length=50, unique=True)

    class Meta:
        db_table = "cocktail_tags"

    def __str__(self):
        return self.tag


class CocktailTagJoin(models.Model):
    cocktail = models.ForeignKey(Cocktail, on_delete=models.CASCADE)
    tag = models.ForeignKey(CocktailTag, on_delete=models.CASCADE)

    class Meta:
        db_table = "cocktail_tags_join"


class Garnish(models.Model):
    cocktail = models.ForeignKey(Cocktail, on_delete=models.CASCADE)
    garnish = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
