DEBUG = True

ALLOWED_HOSTS = []

"""DATABASES = {
    'default': {
        'ENGINE' : 'django.db.backends.postgresql_psycopg2',
        'NAME' : 'gpsdb',
        'USER': 'gps',
        'PASSWORD': 'gps123456',
        'HOST': '',
        'PORT': '5432'
    }
}"""


STATICFILES_DIRS = [os.path.join(BASE_DIR,"assets")]

STATIC_URL = '/static/'

MEDIA_ROOT = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'static', 'media')

MEDIA_URL = '/media/'

