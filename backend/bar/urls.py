from django.urls import path
from .views import user_bar, user_favorites

urlpatterns = [
    path("userbar/<int:id>", user_bar),
    path("favorites/<int:id>", user_favorites)
]
