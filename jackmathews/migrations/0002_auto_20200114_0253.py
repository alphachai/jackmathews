# Generated by Django 3.0.2 on 2020-01-14 02:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jackmathews', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='portfolioitem',
            old_name='image',
            new_name='thumbnail',
        ),
    ]