from django.db import models
from django.contrib.auth.models import User
from ingredient.models import Ingredient


class Bar(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)

    class Meta:
        db_table = "bars"

    def __str__(self):
        return self.user, self.ingredient
