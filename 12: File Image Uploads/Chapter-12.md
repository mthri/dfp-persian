<h1 dir="rtl">
فصل 12
</h1>

<h2 dir="rtl">
آپلود تصویر و فایل
</h2>

<p dir="rtl">
ما قبلتر در فصل 6 منابع static را، مانند عکس پیکربندی کردیم؛ اما فایلهای بارگذاری شده توسط کاربر، همچون جلد کتاب، کمی متفاوت است. برای شروع، جنگو به قالب static اشاره میکند، در حالی که هر چیزی که توسط user آپلود میشود، چه فایل و چه عکس، media نامیده میشود.
</p>
<p dir="rtl">
روند افزودن این ویژگیها برای فایلها یا تصاویر مشابه هست؛ اما، برای تصاویر، باید کتابخانه پردازش تصویر پایتون به نام Pillow را نصب کرد که شامل ویژگیهای اضافه مانند اعتبارسنجی اولیه است.
</p>
<p dir="rtl">
بیایید Pillow را با استفاده از روش آشنای خود در Docker نصب کنیم، container هایمان را متوقف کنیم، و ساخت image جدیدی را force کنیم.
</p>
<h4 dir="rtl">
خط فرمان (Command line)
</h4>

```
$ docker-compose exec web pipenv install pillow==7.2.0
$ docker-compose down
$ docker-compose up -d --build
```

<h3 dir="rtl">
فایلهای Media
</h3>
<p dir="rtl">
اساسا تفاوت بین فایلهای static و media در این است که ما میتوانیم به فایلهای اولیه اعتماد کنیم، اما بدون شک به طور پیش فرض نمیتوانیم به فایلهای ثانویه اعتماد کنیم. همیشه نگرانی های امنیتی زمان مواجهه با محتوای بارگذاری شده توسط user وجود دارد. قابل ذکر است که اعتبارسنجی همه‌ی فایلهای آپلود شده برای اطمینان حاصل کردن از اینکه آنها همان چیزی هستند که میگویند، مهم است. چندین روش نامطبوع وجود دارد که یک فرد مخرب میتواند به وبسایتی که کورکورانه آپلودهای کاربران را میپذیرد ،حمله کند.
</p>
<p dir="rtl">
برای شروع بیایید دو کانفیگ جدید به فایل config/settings.py اضافه کنیم. به طور پیش فرض MEDIA_URL و MEDIA_ROOT هر دو خالی هستند و چیزی برای نمایش وجود ندارد، پس ما نیاز به کانفیگ کردن آنها داریم.
</p>
<p dir="rtl">
MEDIA_ROOT مسیرمطلق سیستم به پوشه های فایلهای بارگذاری شده توسط کاربر است.
</p>
<p dir="rtl">
MEDIA_URL  نشانی اینترنتی (url) است که میتوانیم در templat های خود برای فایلهایمان استفاده کنیم.
</p>
<p dir="rtl">
ما میتوانیم هر دوی این تنظیمات را بعد از STATICFILES_FINDERS در نزدیکی انتهای فایل config/settings.py اضافه کنیم. ما از قرارداد مشترک فراخوانی، برای هر دو رسانه استفاده خواهیم کرد. فراموش نکنید اسلش (/) را برای MEDIA_URL قرار دهید.
</p>
<h4 dir="rtl">
کد
</h4>

```python
# config/settings.py
MEDIA_URL = '/media/' # new
MEDIA_ROOT = str(BASE_DIR.joinpath('media')) # new
```

<p dir="rtl">
سپس یک پوشه جدید به نام media و یک پوشه دیگر به نام covers در داخل آن اضافه میکنیم.
</p>
<h4 dir="rtl">
خط فرمان (Command line)
</h4>

```
$ mkdir media
$ mkdir media/covers
```

<p dir="rtl">
و سرانجام، از آنجایی که فرض بر این است که محتوای بارگذاری شده توسط کاربر در یک production context وجود دارد، برای مشاهده آیتم های local، نیاز داریم تا فایل config/urls.py هم به روزرسانی کنیم تا فایلها به صورت local نمایش داده شوند. این مرحله شامل import کردن settings و static در بالا و اضافه کردن یک خط کد در پایین فایل میشود.
</p>
<h4 dir="rtl">
کد
</h4>

```python
# config/urls.py
from django.conf import settings # new
from django.conf.urls.static import static # new
from django.contrib import admin
from django.urls import path, include
urlpatterns = [
  # Django admin
  path('admin/', admin.site.urls),

  # User management
  path('accounts/', include('allauth.urls')),

  # Local apps
  path('', include('pages.urls')),
  path('books/', include('books.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) # new
```

