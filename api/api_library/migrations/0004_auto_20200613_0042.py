# Generated by Django 2.2.13 on 2020-06-13 00:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_library', '0003_reviewer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='title',
            field=models.CharField(max_length=128),
        ),
    ]