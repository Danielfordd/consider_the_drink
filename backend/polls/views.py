from django.shortcuts import render, HttpResponse
from django.http import JsonResponse


def test(request):
    return JsonResponse({'test': "test"})


def index(request):
    return HttpResponse("Hello world, You're at the polls index.")
