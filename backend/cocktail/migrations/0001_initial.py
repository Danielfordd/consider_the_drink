# Generated by Django 3.1.2 on 2020-11-06 14:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('ingredient', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cocktail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cocktail_name', models.CharField(max_length=255, unique=True)),
                ('cocktail_description', models.TextField()),
            ],
            options={
                'db_table': 'cocktails',
            },
        ),
        migrations.CreateModel(
            name='CocktailTag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag', models.CharField(max_length=50, unique=True)),
            ],
            options={
                'db_table': 'cocktail_tags',
            },
        ),
        migrations.CreateModel(
            name='GlasswareName',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('glass_name', models.CharField(max_length=75, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='ServedName',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('served_name', models.CharField(max_length=75, unique=True)),
            ],
            options={
                'db_table': 'served_names',
            },
        ),
        migrations.CreateModel(
            name='Variation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cocktail', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='source_cocktail', to='cocktail.cocktail')),
                ('variation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='variation_cocktail', to='cocktail.cocktail')),
            ],
            options={
                'db_table': 'variations',
            },
        ),
        migrations.CreateModel(
            name='Served',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cocktail', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cocktail.cocktail')),
                ('served', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cocktail.servedname')),
            ],
            options={
                'db_table': 'served',
            },
        ),
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.IntegerField()),
                ('ingredient_quantity', models.CharField(max_length=50)),
                ('cocktail', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cocktail.cocktail')),
                ('ingredient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ingredient.ingredient')),
            ],
            options={
                'db_table': 'recipes',
            },
        ),
        migrations.CreateModel(
            name='Instruction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.IntegerField()),
                ('instruction', models.TextField()),
                ('cocktail', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cocktail.cocktail')),
            ],
        ),
        migrations.CreateModel(
            name='Glassware',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cocktail', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cocktail.cocktail')),
                ('glass', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cocktail.glasswarename')),
            ],
        ),
        migrations.CreateModel(
            name='Garnish',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cocktail', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cocktail.cocktail')),
                ('garnish', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ingredient.ingredient')),
            ],
        ),
        migrations.CreateModel(
            name='CocktailTagJoin',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cocktail', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cocktail.cocktail')),
                ('tag', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cocktail.cocktailtag')),
            ],
            options={
                'db_table': 'cocktail_tags_join',
            },
        ),
        migrations.CreateModel(
            name='CocktailNote',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('note', models.TextField()),
                ('cocktail', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cocktail.cocktail')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'cocktail_notes',
            },
        ),
    ]
