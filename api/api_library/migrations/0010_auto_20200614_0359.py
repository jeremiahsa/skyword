# Generated by Django 2.2.13 on 2020-06-14 03:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api_library', '0009_remove_reviewer_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reviewer',
            name='user',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='books', to=settings.AUTH_USER_MODEL),
        ),
    ]
