# Generated by Django 3.0.7 on 2020-12-30 21:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('topics', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='topic',
            name='members',
        ),
    ]
