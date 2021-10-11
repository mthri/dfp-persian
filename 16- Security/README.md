<div dir='rtl' align='right'>

### XSS (Cross Site Scripting)

<a href="https://en.wikipedia.org/wiki/Cross-site_scripting">Cross-site scripting (XSS)</a> این یک حمله کلاسیک دیگر است که زمانی اتفاق می افتد که مهاجم (attacker) قادر است تکه های کوچکی از کد را به صفحات مشاهده شده توسط افراد دیگر, تزریق کند. این کد ، معمولاً به زبان جاوا اسکریپت است و در صورت ذخیره در پایگاه داده ، بازیابی شده و برای سایر کاربران نمایش داده می شود .
  
  برای مثال : فرمی که برای نوشتن بررسی (نقد) کتاب استفاده می شود را در نظر بگیرید . چه می شود اگر به جای تایپ کردن , “این کتاب عالی بود”  کاربر یک چیزی را با جاوااسکریپ تایپ کند ؟ برای مثال , ```<script>alert('hello');</script>``` .اگر این اسکریپ در دیتابیس ذخیره میشد صفحه هر کاربری یک `alert` با عنوان `hello` به وجود می آمد . در حالی که این مثال خواص بیشتر آزار دهنده است تا خطرناک , سایتی که در مقابل حمله `XSS` آسیب پذیر است بسیار خطرناک است زیرا هر کاربر مخرب میتواند هر  جاوا اسکرییپتی را در صفحه قرار دهد , از جمله کد جاوااسکریپتی که میتواند اطلاعات کاربران ناشناس رو هم بدزدد . 
  
 برای جلوگیری از حمله `XSS` قالب های جنگو به صورت خودکار <a href="https://docs.djangoproject.com/en/3.1/ref/templates/language/#automatic-html-escaping">automatically escape</a> از کاراکتر های خاصی که به طور بالقوه خطرناک هستند از جمله : براکت ها `(< و >)` , سینگل کوت `(single quotes) ' ` , دابل کوت `(double quotes) " ` و علامت `&` دوری می کند . مواردی وجود دارد که ممکن است بخواهید به صورت خودکار <a href="https://docs.djangoproject.com/en/3.1/ref/templates/builtins/#std:templatetag-autoescape">autoescape off</a>  کنید اما باید با احتیاط زیاد انجام شود .
  
   این <a href="https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.md">OWASP’s XSS Cheat Sheet</a> برای مطالعه بیشتر توصیه می شود .

### Cross-Site Request Forgery (CSRF)
  
این <a href="https://en.wikipedia.org/wiki/Cross-site_request_forgery">Cross-Site Request Forgery (CSRF)</a> سومین نوع عمده حمله است اما عموما نسبت به تزریق sql (SQL Injection) یا حمله XSS کمتر شناخته شده است . این حمله اساسا از اعتماد سایت به مرورگر کاربر استفاده می کند .
  
زمانی که کاربر وارد یک سایت می شود , اجازه دهید آن را یک سایت بانکی برای اهداف تصاویر سازی بنامیم , سرور `session token` را برای آن کاربر ارسال می کند . هدر های  HTTP در آینده شامل همه ی request ها و احراز هویت های کاربر می شود . اما اگر یک بازیگر مخرب (هکر) به نحوی به `session token` دسترسی پیدا کند چه اتفاقی می افتد ؟
  
برای مثال , کاربری را در نظر بگیرید که در یک تب مرورگر به بانک خود وارد می شود . سپس آنها در یک تب دیگر ایمیل شان را باز می کنند و روی یک email link که از طرف یک بازیگر مخرب (هکر) است کلیک می کنند . این لینک قانونی به نظر می رسد ,
اما در واقع به بانک کاربر اشاره می کند که هنوز در آن login است ! بنابرابن به جای ترک کردن کامنت وبلاگ در این سایت جعلی , در پشت صحنه , از اطلاعات کاربری برای انتقال پول از حساب آنها به حساب هکر ها استفاده می شود .
  
در عمل روش های زیادی برای به دست آوردن اعتبار کاربر از طریق حمله CSRF وجود دارد , نه فقط لینک ها,
حتی form های پنهان , برچسب های مخصوص عکس , و حتی request های AJAX .
  
جنگو <a href="https://docs.djangoproject.com/en/3.1/ref/csrf/#how-it-works">CSRF protection</a> با قرار دادن secret key رندوم به عنوان کوکی از طریق <a href="https://docs.djangoproject.com/en/3.1/ref/middleware/#django.middleware.csrf.CsrfViewMiddleware">CSRF
Middleware</a> و در فرم ها از طریق تمپلیت تگ (template tag) <a href="https://docs.djangoproject.com/en/3.1/ref/templates/builtins/#csrf-token">csrf_token</a> محافظت می کند . سایت تیم سوم به کوکی های کاربر دسترسی نخواهد داشت بنابراین هرگونه مغایرت بین دو کلید باعث ارور می شود .
  
جنگو امکان سفارشی سازی را مثل همیشه می دهد : شما میتوانید middleware CSRF رای غیر فعال کنید و از تمپلیت تگ (template tag) <a href="https://docs.djangoproject.com/en/3.1/ref/csrf/#django.views.decorators.csrf.csrf_protect">()csrf_protect</a> در view های خاص استفاده بکنید . با این حال این مرحله را با نهایت احتیاط انجام دهید .
  
این OWASP <a href="https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.md">CSRF Cheat Sheet</a> نگاه جامعی به موضوع ارائه می دهد. تغریبا همه ی سایت های اصلی در مقاطعی از زمان قربانی حملات CSRF شده اند . 
  
یک قانون کلی خوب این است که هر گاه در سایت خود یک فرمی دارید , فکر کنید که آیا به تک csrf_token نیاز دارید . بیشتر مواقع به آن نیاز دارید !


### Clickjacking Protection (مقابله با کلیک دزدی)
<a href="https://en.wikipedia.org/wiki/Clickjacking">Clickjacking</a> حمله دیگری است که در آن یک سایت مخرب کاربر را فریب می دهد تا روی یک frame مخفی شده کلیک کند . یک frame داخلی,که به عنوان `iframe` شناخته می شود , معمولا برای جاسازی یک سایت در داخل یکی دیگر استفاده می شود . برای مثال , اگر میخواهید Google Map یا ویدیوی Yuotube را در سایت خود قرار دهید iframe شامل tag است که آن سایت را در سایت شما قرار می دهد. این بسیار راحت است.
  
اما این یک خطر امنیتی دارد که می تواند یک frame را از دید کاربر مخفی کند . در نظر بگیرید که یک کاربر قبلا به حساب کاربری اش در آمازون login شده است و سپس از یک سایت مخرب بازدید می کند که به نظر می رسید عکس بچه گربه باشد . کاربر برای مشاهده بچه گربه های بیشتر بر روی سایت مخرب گفته شده کلیک می کند , اما در واقع آنها روی یک iframe از محصول آمازون که ناخودآگاه خریداری شده کلیک می کنند . این تنها یک نمونه از clickjacking است .
  
برای جلوگیری از این (حمله) جنگو با یک پیش فرض همراه است <a href="https://docs.djangoproject.com/en/3.1/ref/clickjacking/#clickjacking-prevention">clickjacking middleware</a> که <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options">X-FrameOptions HTTP header</a> را تنظیم می کند , که نشان می دهد که یک منبع مجاز به load یک frame یا iframe است یا خیر. در صورت تمایل می توانید این محافظ را خاموش کنید , یا آن را در سطح نمایش تنظیم کنید . با این حال این کار را با احتیاط و <a href="https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Clickjacking_Defense_Cheat_Sheet.md">research(تحقیق بالا)</a> انجام دهید .
  
 ### HTTPS/SSL
  
  تمام سایت های مدرن باید از <a href="https://en.wikipedia.org/wiki/HTTPS">HTTPS</a> استفاده کنند , که ارتباط رمز گذاری را بین مشتری و سرور فراهم میکند. <a href="https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol">HTTP (Hypertext Transfer Protocol)</a> ستون فقرات وب مدرن است , اما به طور پیش فرض رمزگذاری ندارد

  
  "s" در HTTPS به ماهیت رمزگذاری شده آن ابتدا به دلیل SSL (Secure Sockets Layer) اشاره می کند و این روزها آن جانشین <a href="https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol">TLS (Transport Layer Security)</a> هستند . با فعال بودن HTTPS , که ما خود در فصل دیپلویمنت (deployment) انجام خواهیم داد , بازیگران مخرب نمی توانند ترافیک ورودی و خروجی را برای داده هایی مانند
اعتبار احراز هویت (authentication credentials) یا کلید API  تشخیص دهند (بو بکشند) .
  
  
  یکی از 4 مسائل باقی مانده در چک لیست دیپلویمنت جنگو ما این است که `SECURE_SSL_REDIRECT` در حال حاضر روی False تنظیم شده است . به دلایل امنیتی , خیلی بهتر است که این را مجبور کنیم در حالت پروداکشن (production) True باشد.
بیایید آن را با پیش فرض پیکربندی به True و افزودن مقدار توسعه محلی به فایل docker-compose.yml تغییر دهیم  .
  
<div dir="ltr" align='left'>

```python
# config/settings.py
SECURE_SSL_REDIRECT = env.bool("DJANGO_SECURE_SSL_REDIRECT", default=True)

``` 
  </div>
  
  سپس متغیر محیط را به فایل docker-compose.yml اضافه کنید که در آن False تنظیم شده است .

  
<div dir="ltr" align='left'>
    
```shell
# docker-compose.yml
environment:
  - "DJANGO_SECRET_KEY=)*_s#exg*#w+#-xt=vu8b010%%a&p@4edwyj0=(nqq90b9a8*n"
  - "DJANGO_DEBUG=True"
  - "DJANGO_SECURE_SSL_REDIRECT=False" # new
```
</div>
  
 داکر را مجدد ری استارت کرده و دوباره چک لیست دیپلویمنت را اجرا کنید . 
  
  <div dir="ltr" align='left'>
    
  ```docker
$ docker-compose down
$ docker-compose -f docker-compose-prod.yml up -d --build
$ docker-compose exec web python manage.py check --deploy
  ```  
  </div>
  
  ما به 3 موضوع می پردازیم . 
  
  
### HTTP Strict Transport Security (HSTS)
<a href="https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security">HTTP Strict Transport Security (HSTS)</a> یک سیاست امنیتی است که به سرور ما اجازه می دهد که بر اینکه مروگر ها باید از طریق HTTPS ارتباط داشته باشند با اضافه کردن <a href="https://docs.djangoproject.com/en/3.1/ref/middleware/#http-strict-transport-security">Strict-Transport-Security header</a> , تاکید می کند .
  
سه پیکربندی ضمنی HSTS در فایل settings.py ما وجود دارد که باید برای حالت production به روز شود :
 
  
<div dir="ltr" align='left'>
    
- `SECURE_HSTS_SECONDS = 0`
- `SECURE_HSTS_INCLUDE_SUBDOMAINS = False`
- `SECURE_HSTS_PRELOAD = False`
    
</div>
  
  `SECURE_HSTS_SECONDS` در setting به طور پیش فرض روی 0 تنظیم شده است اما هرچه بیشتر بهتر برای اهداف امنیتی . ما آن را برای یک ماه , 2,592,000 ثانیه , در پروژه مان تنظیم می کنیم .
  
`SECURE_HSTS_INCLUDE_SUBDOMAINS` زیر دامنه هارا مجبور می کند تا به طور انحصاری از SSL استفاده کنند , بنابراین ما آن را در production روی True تنظیم می کنیم .
  
`SECURE_HSTS_PRELOAD` فقط زمانی تاثیر می گذارد که یک مقدار غیر 0 برای `SECURE_HSTS_
SECONDS` وجود داشته باشد , اما از آنجا که ما فقط یکی را تنظیم کرده ایم ، باید این را روی True تنظیم کنیم.
  
در اینجا باید ببینید که تنظیمات به روز شده چگونه باید باشد .

  
<div dir="ltr" align='left'>
  
  ```python
# config/settings.py
SECURE_HSTS_SECONDS = env.int("DJANGO_SECURE_HSTS_SECONDS", default=2592000)
SECURE_HSTS_INCLUDE_SUBDOMAINS = env.bool("DJANGO_SECURE_HSTS_INCLUDE_SUBDOMAINS",
default=True)
SECURE_HSTS_PRELOAD = env.bool("DJANGO_SECURE_HSTS_PRELOAD", default=True)

  ```
  
</div>
  
  سپس فایل docker-compose.yml با مقادیر توسعه محلی به روز کنید . 
  
<div dir="ltr" align='left'>
  
```shell
# docker-compose.yml
environment:
  - "DJANGO_SECRET_KEY=)*_s#exg*#w+#-xt=vu8b010%%a&p@4edwyj0=(nqq90b9a8*n"
  - "DJANGO_DEBUG=True"
  - "DJANGO_SECURE_SSL_REDIRECT=False"
  - "DJANGO_SECURE_HSTS_SECONDS=0" # new
  - "DJANGO_SECURE_HSTS_INCLUDE_SUBDOMAINS=False" # new
  - "DJANGO_SECURE_HSTS_PRELOAD=False" # new
```
  
</div>
  
   داکر را ری استارت کرده و دوباره چک لیست دیپلویمنت را اجرا کنید . 
  
<div dir="ltr" align='left'>
  
```shell 
$ docker-compose down
$ docker-compose -f docker-compose-prod.yml up -d --build
$ docker-compose exec web python manage.py check --deploy
```
  
</div>
  
  فقط 2 شماره باقی مانده است !
  
  
  
### Secure Cookies (ایمن کردن کوکی ها)
  
 <a href="https://en.wikipedia.org/wiki/HTTP_cookie">HTTP Cookie</a> برای ذخیره اطلاعات در کامپیوتر مشتری استفاده می شود مانند احراز هویت
اعتبارنامه (authentication credentials). این امر ضروری است زیرا پروتکل HTTP از نظر طراحی بدون حالت است : راهی وجود ندارد برای اینکه آیا کاربر به غیر از شناسه در HTTP Header احراز هویت شده است یا نه!
  
جنگو نیز مانند اکثر وب سایت ها از `sessions` و `cookies` برای این کار استفاده می کند . اما cookies (کوکی ها) می توانند و باید باشند از طریق کانفیگ کردن  <a href="https://docs.djangoproject.com/en/3.1/ref/settings/#std:setting-SESSION_COOKIE_SECURE">SESSION_COOKIE_SECURE</a> به HTTPS وادار می شوند . تنطیمات جنگو به طور پیش فرض False است بنابراین باید آن را در production به True تغیر دهیم.
  
دومین مسئله <a href="https://docs.djangoproject.com/en/3.1/ref/settings/#csrf-cookie-secure">CSRF_COOKIE_SECURE</a> است , که به طور پیش فرض روی False است اما در حالت production باید True باشد تا فقط کوکی هایی که با عنوان "secure"(امن) مشخص شده اند با اتصال HTTPS ارسال شوند .
  
  
<div dir="ltr" align='left'>
  
```python
# config/settings.py
SESSION_COOKIE_SECURE = env.bool("DJANGO_SESSION_COOKIE_SECURE", default=True)
CSRF_COOKIE_SECURE = env.bool("DJANGO_CSRF_COOKIE_SECURE", default=True)
```
  
</div>
  
  سپس فایل docker-compose.yml  را آپدیت کنید .
  
  
<div dir="ltr" align='left'>
  
```shell
# docker-compose.yml
environment:
  - "DJANGO_SECRET_KEY=)*_s#exg*#w+#-xt=vu8b010%%a&p@4edwyj0=(nqq90b9a8*n"
  - "DJANGO_DEBUG=True"
  - "DJANGO_SECURE_SSL_REDIRECT=False"
  - "DJANGO_SECURE_HSTS_SECONDS=0"
  - "DJANGO_SECURE_HSTS_INCLUDE_SUBDOMAINS=False"
  - "DJANGO_SECURE_HSTS_PRELOAD=False"
  - "DJANGO_SESSION_COOKIE_SECURE=False" # new
  - "DJANGO_CSRF_COOKIE_SECURE=False" # new
```
  
</div>
  
  داکر را ری استارت کرده و دوباره چک لیست دیپلویمنت را اجرا کنید
  
<div dir="ltr" align='left'>
    
```shell
$ docker-compose down
$ docker-compose -f docker-compose-prod.yml up -d --build
$ docker-compose exec web python manage.py check --deploy
System check identified no issues (0 silenced).
```

</div>  
  
  دیگر مسئله ای وجود ندارد .هووو !

    
  ### Admin Hardening (ارتقا امنیت ادمین)

  تا اینجا ممکن است به نظر برسد که توصیه عمومی امنیت این است که به پیش فرض های جنگو تکیه کنید , از `HTTPS` استفاده کنید , به فرم ها تک `csrf_token` را اضافه کنید ,
  و یک ساختار permissions تنظیم کنید . همگی صحیح است . یک قدم دیگر که جنگو از طرف ما قبول نمی کند ارتقا امنیت ادمین جنگو است .
  
  در نظر بگیرید که هر سایت جنگو admin را به طور پیش فرض به آدرس `admin/` تنظیم می کند . هر هکری که تلاش می کند به پنل ادمین 
  جنگو دسترسی یابد ابتدا به آن (`admin/`) شک می کند . بنابراین , یک قدم آسان این است که به سادگی URL (آدرس) admin را به معنای واقعی کلمه تغیر دهید ! 
  باز کنید (ادیتور) را و مسیر URL را تغیر دهید . در این مثال چنین است : `anything-but-admin/` .
  
   
  <div dir="ltr" align='left'>
  
  ```python
  # config/urls.py
  from django.conf import settings
  from django.conf.urls.static import static
  from django.contrib import admin
  from django.urls import path, include
    
  urlpatterns = [
      # Django admin
      path('anything-but-admin/', admin.site.urls), # new
    
      # User management
      path('accounts/', include('allauth.urls')),
    
      # Local apps
      path('', include('pages.urls')),
      path('books/', include('books.urls')),
  ]
    
  if settings.DEBUG:
      import debug_toolbar
      urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
      ] + urlpatterns
  ```
  
  </div>
  
  
  یک پکیج ثالث سرگرم کننده <a href="https://github.com/dmpayton/django-admin-honeypot">django-admin-honeypot</a> است که یک صفحه ورود admin جعلی در صفحه ایجاد می کند و 
  IP هر کسی را که تلاش می کند به سایت شما در این آدرس (`admin/`) حمله کند به <a href="https://docs.djangoproject.com/en/3.1/ref/settings/#admins">ادمین سایت</a> ایمیل می  زند . 
  این آدرس های IP سپس می تواند به لیست آدرس مسدود شده سایت اضافه شود.
  
  همچنین از طریق <a href="https://github.com/Bouke/django-two-factor-auth">django-two-factor-auth</a> می توانید احراز هویت دوگانه را برای admin خود 
  برای یک لایه محافظتی بیشتر اضافه کنید .

  ### گیت
  
  این فصل به ویژه در مورد تغییرات کد بسیار سنگین بوده است ، بنابراین مطمئن شوید که تمام به روزرسانی ها با گیت را انجام می دهید .
  
<div dir="ltr" align='left'>
  
```git  
$ git status
$ git add .
$ git commit -m 'ch16'
```
  
</div>
  
  
  در صورت وجود هر گونه خطا , لاگ های خود را با لاگ های `docker-compose` بررسی کنید و کد خود را با کد منبع رسمی گیت هاب مقایسه کنید  .
  <a href="https://github.com/wsvincent/djangoforprofessionals/tree/master/ch16-security">official source code on Github</a>
  
### نتیجه
  
  نگرانی اصلی هر سایت امنیت است . با استفاده از یک `docker-compose-prod.yml` فایل میتوانیم قبل از دیپلوی مستقیم سایت , در داکر تنظیمات production ما را به
  طور دقیق آزمایش کنید  . و با استفاده از مقادیر پیش فرض هم می توانیم متغیرهای محیط را در فایل ساده کرده
  و هم اطمینان حاصل کنیم
 که اگر در مورد متغیرهای محیط چیزی خراب شود ، مقادیر production را پیش فرض می کنیم
  ، نه مقادیر محلی ناامن! جنگو دارای بسیاری از ویژگی های امنیتی داخلی است و با افزودن چک لیست دیپلویمنت , اکنون ما می توانیم سایت خود را که اطمینان داریم 
  دارای امنیت بالایی است دیپلوی کنیم .

  در نهایت ، امنیت یک نبرد دائمی است و در حالی که مراحل این فصل بیشتر مناطق را پوشش می دهد
نگرانی ، به روز نگه داشتن وب سایت خود با آخرین نسخه جنگو برای ادامه ایمنی بسیار مهم است .
  
    
</div>
  
=======
</div>
