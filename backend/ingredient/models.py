from django.db import models


# Create your models here.
class IngredientCategory(models.Model):
    category_name = models.CharField(max_length=100, unique=True)

    class Meta:
        db_table = "ingredient_category"

    def __str__(self):
        return self.category_name


class Ingredient(models.Model):
    ingredient_name = models.CharField(max_length=100, unique=True)
    category = models.ForeignKey(IngredientCategory, on_delete=models.CASCADE)

    def __str__(self):
        return self.ingredient_name

    class Meta:
        db_table = "ingredients"
