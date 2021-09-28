<div dir='rtl'>

# فصل ۱۵: کارایی و بهینه سازی

اولویت اول برای هر وبسایتی به درستی اجرا شدن و همچنین دربرداشتن تست های درست و مناسب هست. اما اگر پروژه شما آنقدر خوشانس
باشد که حجم زیادی از ترافیک دریافت کند، به سرعت تمرکز به سرعت به عملکرد و کارایی تغیر پیدا میکند و تا حدامکان کارآمدتر
می‌کند. این یک سرگرمی و تمرین چالش ‌برانگیر برای بسیاری از مهندسین است، اما میتواند یک تله نیز باشد.

یک
[نقل قول معروف](http://www.paulgraham.com/knuth.html)
از دونالد کنوت (دانشمند کامپیوتر) که ارزش خواندن کامل آن را دارد :


> مشکل اصلی برنامه نویسان این است که زمان زیادی را صرف نگرانی درباره کارایی در مکان‌ و زمان‌های اشتباه کرده‌اند. بهینه سازی زودهنگام ریشه تمام کارهای شیطانی :) یا حداقل بیشتر آنها در برنامه نویسی میباشد.


در عین حال که توجه و نظارت برای بهینه کردن پروژه (کدهایتان) در آینده بسیار مهم است. از همان اول تمرکز زیادی روی آن
نگذارید. هیچ راه دقیقی برای شبیه سازی محیط واقعی (پروداکشن) در محیط محلی (environments locally)
وجود ندارد حتی اگر بخوایم تشخیص دهیم ترافیک یک سایت چگونه خواهد بود. اما ممکن است در مراحل اولیه زمان زیادی را صرف پیدا
کردن راهی برای بهینه کردن عملکرد سیستم بجای صحبت با کاربران و بهبود کد های مهم تر کنید.

در این فصل تمرکز اصلی به روی جنبه های مهمتر عملکرد مرتبط با جنگو و همچنین برجسته کردن مناطقی که ارزش بیشتری در مقیاس
بزرگتر دارند میباشد. به طور کلی عملکرد به چهار بخش اصلی تقسیم میشود

- بهینه سازی query های پایگاه داده
- ذخیره سازی (caching)
- فهرست بندی (indexes)
- فشرده سازی فایل های اصلی assets مانند تصاویر کد های JavaScript و CSS

</div>

## django-debug-toolbar

<div dir='rtl'>

قبل از اینکه بتوانیم کوئری های دیتابیس خودمان را بهینه کنیم باید آنها را مشاهده کنیم.
برای این منظور از پکیج پیشفرض Third-party انجمن جنگو django-debug-toolbar میباشد.
این ابزار دارای مجموعه ای از پنل ها برای بررسی چرخه‌ی کامل request/response در هرصفحه ای که طراحی شده میباشد.
طبق معمول میتوانیم آن را در Docker نصب کنیم و container های درحال اجرایمان را متوقف کنیم.

</div>

#### Command line
```shell
$ docker-compose exec web pipenv install django-debug-toolbar==2.2
$ docker-compose down
```

<div dir='rtl'>

سه پیکربندی (configurations) جدا برای تنظیم شدن در فایل تنضیمات وجود دارد config/settings.py :
</div>

1. INSTALLED_APPS 
2. Middleware
3. INTERNAL_IPS

<div dir='rtl'>
ابتدا Debug Toolbar را به پیکربندی INSTALLED_APPS اضافه کنید.
توجه داشته باشید که نام مناسب debug_toolbar است نه django_debug_toolbar ، همانطور که انتظار می رود.
</div>

#### code
```python
# config/settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    
    # Third-party
    'crispy_forms',
    'allauth',
    'allauth.account',
    'debug_toolbar', # new
    
    # Local
    'accounts',
    'pages',
    'books',
]
```

<div dir='rtl'>
قدم دوم ، Debug Toolbar را به Middleware اضافه کنید که در درجه اول اجرا میشود.
</div>

#### code
```python
# config/settings.py
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'debug_toolbar.middleware.DebugToolbarMiddleware', # new
]
```
<div dir='rtl'>

و قدم سوم ، INTERNAL_IPS را نیز تنظیم کنید.
اگر ما در Docker نبودیم ، می توانستیم آن را روی 127.0.0.1 تنظیم کنیم ، 
اما از آنجا که ما سرور وب خود را به روی بستر Docker اجرا می کنیم ، 
یک مرحله اضافی لازم است تا با آدرس دستگاه Docker مطابقت داشته باشد. خطوط زیر را در پایین config/settings.py اضافه کنید.

</div>

#### code
```python
# config/settings.py
...
# django-debug-toolbar
import socket
hostname, _, ips = socket.gethostbyname_ex(socket.gethostname())
INTERNAL_IPS = [ip[:-1] + "1" for ip in ips]
```
<div dir='rtl'> 
این کمی ترسناک به نظر می رسد ، اما اساساً تضمین می کند که INTERNAL_IPS ما با Host  داکر (Docker) ما مطابقت دارد.
حالا از image ها rebuild بگیرید تا شامل پکیج و پیکربندی تنظیمات به روز شود.
</div>

#### Command Line
```shell
$ docker-compose up -d --build
```

<div dir='rtl'> 
آخرین مرحله به روز رسانی URLconf میباشد.
ما فقط می خواهیم Debug Toolbar در صورت DEBUG=True درست ظاهر شود ، بنابراین منطق را در این مورد در پایین فایل config/urls.py اضافه می کنیم تا نمایش داده شود.
</div>

#### code
```python
# config/urls.py
from django.conf import settings
from django.conf.urls.static import static from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Django admin
    path('admin/', admin.site.urls),
    # User management
    path('accounts/', include('allauth.urls')),
# Local apps
    path('', include('pages.urls')),
    path('books/', include('books.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG: # new 
    import debug_toolbar 
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
```

<div dir='rtl'> 
حالا اگر صفحه‌ای را refresh کنید نوار ابزار django-debug-toolbar را در سمت راست مشاهده خواهید کرد.
</div>


![Debug Toolbar](DebugToolbar.jpg)
<center> Debug Toolbar</center>
<br>
<div dir="rtl"> 
اگر به روی لینک Hide در بالای نوار ابزار کلیک کنید، نوار کوچکتر و در سمت راست قرار میگیرد.
</div>

## Analyzing Pages

