from django_filters import rest_framework as filters
import django_filters
from core.models import Movie, Person, Job, Genre, MoviePerson
from django.db import models


class IContainsFilter:
    filter_overrides = {
        models.CharField: {
            "filter_class": django_filters.CharFilter,
            "extra": lambda f: {"lookup_expr": "icontains"},
        },
        models.TextField: {
            "filter_class": django_filters.CharFilter,
            "extra": lambda f: {"lookup_expr": "icontains"},
        },
    }


class MovieFilter(filters.FilterSet):

    class Meta(IContainsFilter):
        model = Movie
        fields = ["title", "release_year", "story", "id"]


class PersonFilter(filters.FilterSet):

    class Meta(IContainsFilter):
        model = Person
        fields = ["name", "id"]


class MoviePersonFilter(filters.FilterSet):

    class Meta(IContainsFilter):
        model = MoviePerson
        fields = ["id", "person__id", "person__name", "movie__id", "movie__title", "job__name", "job__id",]


class JobFilter(filters.FilterSet):

    class Meta(IContainsFilter):
        model = Job
        fields = ["name", "id"]


class GenreFilter(filters.FilterSet):

    class Meta(IContainsFilter):
        model = Genre
        fields = ["name", "id"]
