from django.conf import settings
from django.db import connection

settings.configure(
    DATABASES={
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'music.db', 
            'USER': 'postgres',   
            'PASSWORD': '1', 
            'HOST': 'localhost',
            'PORT': '5432',
        }
    }
)

import django
django.setup()

connection.ensure_connection()
print("подключение установлено")
print(connection.connection)

