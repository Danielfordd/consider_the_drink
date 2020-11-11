from django.urls import path
from .views import (all_notes, user_bar, user_favorites, change_favorite,
                    is_favorite, create_note, delete_note, delete_ingredient,
                    create_ingredient)

urlpatterns = [
    path("notes/create", create_note),
    path("notes/delete", delete_note),
    path("notes/all/<int:userId>/<int:cocktailId>", all_notes),
    path("userbar/ingredients/create", create_ingredient),
    path("userbar/ingredients/delete", delete_ingredient),
    path("userbar/<int:id>", user_bar),
    path("fav/<int:cocktailId>/<int:userId>", is_favorite),
    path("favorite/change", change_favorite),
    path("favorites/<int:id>", user_favorites)
]
