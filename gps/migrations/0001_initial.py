# Generated by Django 2.0.1 on 2018-01-28 23:10

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Gpson',
            fields=[
                ('id_gpson', models.AutoField(primary_key=True, serialize=False)),
                ('imei', models.CharField(blank=True, max_length=255, null=True)),
                ('latit', models.CharField(blank=True, max_length=255, null=True)),
                ('longi', models.CharField(blank=True, max_length=255, null=True)),
                ('status', models.CharField(blank=True, max_length=255, null=True)),
                ('date_create', models.DateTimeField(default=datetime.date.today)),
            ],
        ),
        migrations.CreateModel(
            name='Gpsub',
            fields=[
                ('id_gpsub', models.AutoField(primary_key=True, serialize=False)),
                ('imei', models.CharField(blank=True, max_length=255, null=True)),
                ('latit', models.CharField(blank=True, max_length=255, null=True)),
                ('longi', models.CharField(blank=True, max_length=255, null=True)),
                ('combu', models.CharField(blank=True, max_length=255, null=True)),
                ('date_create', models.DateTimeField(default=datetime.date.today)),
            ],
        ),
        migrations.CreateModel(
            name='Gpsus',
            fields=[
                ('id_gpsus', models.AutoField(primary_key=True, serialize=False)),
                ('id_user', models.IntegerField(default=0, null=True)),
                ('imei', models.CharField(blank=True, max_length=255, null=True)),
                ('cmp_nombre', models.CharField(blank=True, max_length=255, null=True)),
                ('cmp_unidad', models.CharField(blank=True, max_length=255, null=True)),
                ('date_create', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AddField(
            model_name='gpson',
            name='id_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gps.Gpsus'),
        ),
    ]
