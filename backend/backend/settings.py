"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 4.2.6.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
import os
from datetime import timedelta
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
MEDIA_ROOT = os.path.join(BASE_DIR, 'file')
MEDIA_URL = '/file/'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# 参考
# https://docs.djangoproject.com/en/5.0/ref/settings/#file-upload-settings
# アップロード中の一時ファイルディレクトリ
FILE_UPLOAD_TEMP_DIR = f'/home/buncho08/MIEPORTAL/backend/temp/' 
# アップロード上限は100MB
FILE_UPLOAD_MAX_MEMORY_SIZE = 104857600

# カスタムユーザーの設定
AUTH_USER_MODEL = 'api.UserTable'
ACCOUNT_AUTHENTICATION_METHOD = 'user_id'
ACCOUNT_USER_MODEL_USERNAME_FIELD = 'user_id'
ACCOUNT_EMAIL_REQUIRED = False
ACCOUNT_USERNAME_REQUIRED = True

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-*(jp_2@@-(klg3ntbyg#g527e2*d@lr70-eyl+jnd1dcrx$nf%'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # 自分のアプリケーション
    'api',
    # サードパーティーライブラリ
    'rest_framework',
    'corsheaders',
    'rest_framework_simplejwt'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # CORS
    "corsheaders.middleware.CorsMiddleware",
]

# 自分で設定するやつ
# DRF

REST_FRAMEWORK = {
    # jwtトークン認証
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'api.authenticate.CustomAuthentication',
        # 'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

SIMPLE_JWT = {
    'AUTH_HEADER_TYPES': ('JWT', ),
    # JWT有効期限
    'ACCESS_TOKEN_LIFETIME': timedelta(seconds=60),
    # idはuser_idなので教えてあげる(これがないとエラー起きる)
    'USER_ID_FIELD': 'user_id',
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    "TOKEN_OBTAIN_SERIALIZER": "api.tokens.CustomTokenObtainPairSerializer",
		# ↑これはserializer作ったら
    "AUTH_COOKIE": "access_token",  # cookie name
    "AUTH_COOKIE_DOMAIN": None,  # specifies domain for which the cookie will be sent
    "AUTH_COOKIE_SECURE": False,  # restricts the transmission of the cookie to only occur over secure (HTTPS) connections. 
    "AUTH_COOKIE_HTTP_ONLY": True,  # prevents client-side js from accessing the cookie
    "AUTH_COOKIE_PATH": "/",  # URL path where cookie will be sent
    "AUTH_COOKIE_SAMESITE": "Lax",  # specifies whether the cookie should be sent in cross site requests
    "AUTH_COOKIE_REFRESH":"refresh_token",
}


# cors
# アクセスを許可したいURL（アクセス元）を追加
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = ['http://localhost:3000']
# csrf対策
CSRF_TRUSTED_ORIGINS = ["http://localhost", "http://127.0.0.1"]


ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / "templates"],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'ja'

TIME_ZONE = 'Asia/Tokyo'

USE_I18N = True

USE_TZ = True


# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
