from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.forms import DecimalField
from django.db import models
import datetime

# Create your models here.
class Gpsus(models.Model):
	id_gpsus = models.AutoField(primary_key=True)
	id_user = models.IntegerField(null=True, default=0)
	imei = models.CharField(max_length=255, blank=True, null=True)
	cmp_nombre = models.CharField(max_length=255, blank=True, null=True)
	cmp_unidad = models.CharField(max_length=255, blank=True, null=True)
	date_create = models.DateTimeField(auto_now_add=True, blank=True)

	def __str__(self):
		return self.cmp_nombre

class Gpson(models.Model):
	id_gpson = models.AutoField(primary_key = True)
	id_us = models.IntegerField(null=True, default=0)
	imei = models.CharField(max_length=255, blank=True, null=True)
	latit = models.CharField(max_length=255, blank=True, null=True)
	longi = models.CharField(max_length=255, blank=True, null=True)
	status = models.CharField(max_length=255, blank=True, null=True)
	date_create = models.DateTimeField(default=datetime.date.today)

	def __str__(self):
		return self.imei

class Gpsub(models.Model):
	id_gpsub = models.AutoField(primary_key = True)
	imei = models.CharField(max_length=255, blank=True, null=True)
	latit = models.CharField(max_length=255, blank=True, null=True)
	longi = models.CharField(max_length=255, blank=True, null=True)
	combu = models.CharField(max_length=255, blank=True, null=True)
	date_create = models.DateTimeField(default=datetime.date.today)

	def __str__(self):
		return self.imei

class Espregister(models.Model):
	id_esp = models.AutoField(primary_key = True)
	mac = models.CharField(max_length=255, blank=True, null=True)
	cmp_name = models.CharField(max_length=255, blank=True, null=True)
	date_create = models.DateTimeField(default=datetime.date.today)

	def __str__(self):
		return self.mac


