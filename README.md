<h1 dir="rtl"> ترجمه آزاد کتاب  Django for Professionals</h1>

<div dir="rtl">

قبل از شروع فهرست کتاب اگر، اگر مایل به مشارکت هستید، [نحوه مشارکت](https://github.com/mthri/dfp-persian/blob/main/CONTRIBUTING.md) را حتما مطالعه کنید.

شما میتوانید برای کمک کردن و خوشنود کردن و انگیزه دادن به تیم ما، اهدای مالی به خیریه محک داشته باشید.
لینک درگاه خیریه محک در سمت راست صفحه درج شده است. لازم به ذکر است که اگر مبلغی را اهدا کرده اید چون ما بی خبر از آن کار هستیم، یه رسید از آن داخل [گروه تلگرامی ما](https://t.me/dfp_farsi) آپلود کنید.

همچنین میتوانید برای دانلود کتاب (نسخه اصلی) از [این لینک](https://github.com/mthri/dfp-persian/raw/main/book/Django_for_Professionals_Production_websites_with_Python_and_Django.pdf) اقدام کنید.

[خواندن کتاب به صورت آنلاین](https://github.com/mthri/dfp-persian/blob/main/book/Django_for_Professionals_Production_websites_with_Python_and_Django.pdf)
  
<details>
  <summary>مقدمه</summary>
  <br>
    
  - پیشنیاز ها  
  - ساختار کتاب
  - آرایش کتاب
  - ادیتور متن
  - نتیجه گیری
    
</details>
  
  
<details>
  <summary>فصل اول : داکر</summary>
  <br>

  - داکر چیست
  - تفاوت کانتینر ها و Virtual Environments
  - نصب داکر
  - Hello World با داکر
  - Hello World با جنگو
  - اپ pages
  - تصاویر و کانتینر ها و میزبانی داکر
  - گیت
  - جمع بندی

</details>

<details>
  <summary>فصل دوم : PostgreSQL</summary>
  <br>
  
  - شروع به کار
  - داکر 
  - حالت تفکیک شده (Detached Mode)
  - PostgreSQL
  - تنظیمات
  - Psycopg
  - دیتابیس تازه
  - گیت
  - جمع بندی
    
</details>

<details>
  <summary>فصل سوم : پروژه فروشگاه کتاب</summary>
  <br>
    
  - داکر
  - PostgreSQL
  - مدل کاربر شخصی سازی شده (Custom User Model)
  - فرم های کاربر شخصی سازی شده (Custom User Forms)
  - پنل ادمین کاربر شخصی سازی شده (Custom User Admin)
  - سوپریوزر (Superuser)
  - تست ها 
  - یونیت تست ها
  - گیت
  - جمع بندی
    
</details>

<details>
  <summary>فصل چهارم : اپ Pages</summary>
  <br>
    
  - تمپلیت ها
  - ٰViewها و URL ها
  - تست ها
  - تست کردن تمپلیت ها
  - تست کردن HTML
  - متد setUP
  - Resolve
  - گیت
  - جمع بندی
    
</details>
  
<details>
  <summary>فصل پنجم : ثبت نام کاربر (مقدماتی)</summary>
  <br>
    
  - اپ Auth
  - View ها و URL های اپ Auth
  - صفحه اصلی (Homepage)
  - سورس کد جنگو
  - لاگین کاربر
  - ریدارکت ها (Redirects)
  - لاگ اوت کاربر (Log Out)
  - ثبت نام کاربر
  - تست ها
  - setUpTestData()
  - گیت
  - جمع بندی
    
</details>
  
<details>
  <summary>فصل ششم : اشیاء استاتیک (Static Assets)</summary>
  <br>
  
  - اپ staticfiles 
  - STATIC_URL
  - STATICFILES_DIR
  - STATIC_ROOT
  - STATIC_FINDERS
  - پوشه استاتیک (Static directory)
  - تصاویر
  - جاوا اسکریپت
  - collectstatic
  - بوت استرپ (Bootstrap)
  - صفحه درباره ما (About Page)
  - کار باDjango Crispy Forms
  - تست ها 
  - گیت
  - حمع بندی
  
</details>
  
<details>
  <summary>فصل هفتم : ثبت نام کاربر (پیشرقته)</summary>
  <br>
  
  - django-allauth
  - AUTHENTICATION_BACKENDS
  - EMAIL_BACKEND
  - ACCOUNT_LOGOUT_REDIRECT
  - URL ها
  - تمپلیت ها
  -  ورود کاربر (Log in)
  - خروج کاربر (Log Out)
  - ثبت نام کاربر (Sign Up)
  - تنظیمات پنل ادمین
  - ورود کاربر فقط با ایمیل (Email Only Login)
  - تست ها
  - احراز هویت با شبکه های اجتماعی
  - گیت
  - جمع بندی
  
</details>
  
<details>
  <summary>فصل هشتم : متغییر های Environment</summary>
  <br>
  
  - environs[django]
  - SECRET_KEY
  - DEBUG و ALLOWED_HOSTS
  - DATABASES
  - گیت
  - جمع بندی
  
</details>
  
<details>
  <summary>فصل نهم : ایمیل</summary>
  <br>
  
  - تایید ایمیل شخصی سازی شده
  - صفحه تایید ایمیل
  - تغییر و بازنشانی رمز
  - سرویس ایمیل در جنگو
  - گیت
  - جمع بندی
  
</details>
  
<details>
  <summary>فصل دهم : اپ Books</summary>
  <br>
  
  - Model ها 
  - پنل ادمین
  - URL ها
  - View ها
  - تمپلیت ها
  - object_list
  - صفحه جداگانه برای هر کتاب
  - context_object_name
  - get_absolute_url
  - تفاوت Primary Keys با ID ها
  - تفاوت Slug ها با UUID ها
  - نوار پیمایش (Navbar)
  - تست ها
  - گیت
  - جمع بندی
    
</details>
  
<details>
  <summary>فصل یازدهم : اپ Reviews</summary>
  <br>
  
  - Foreign Key ها
  - مدل Review ها
  - تنظیم ادمین پنل
  - تمپلیت ها
  - تست ها
  - گیت
  - جمع بندی
  
</details>
  
<details>
  <summary>فصل دوازدهم : ابلود فایل ها و تصاویر</summary>
  <br>
  
  - فایل های رسانه ای (Media Files)
  - Model ها
  - تنظیم پنل ادمین
  - تمپلیت ها
  - قدم های فراتر
  - گیت
  - جمع بندی
  
</details>

<details>
  <summary>فصل سیزدهم : دسترسی ها (Permissions)</summary>
  <br>
  
  - فقط کاربر های وارد شده مجازند (Logged-In Users Only)
  - دسترسی ها
  - دسترسی های شخصی سازی شده (Custom Permissions)
  - دسترسی های کاربر
  - PermissionRequiredMixin
  - گروه ها و UserPassesTestMixin
  - تست ها
  - گیت
  - جمع بندی
    
</details>
  
<details>
  <summary>فصل چهاردهم : جستوجو</summary>
  <br>
  
  - صفحه نتایج جستوجو
  - فیلتر های مقدماتی (Basic Filtering)
  - اشیاء Q (Q Objects)
  - Form ها
  - Form جستوجو
  - گیت
  - جمع بندی
    
</details>
  
<details>
  <summary>فصل پانزدهم : کارایی</summary>
  <br>
  
  - django-debug-toolbar
  - آنالیز صفحه ها
  - select_related و prefetch_related
  - کشینگ (Caching)
  - ایندکس ها (Indexes)
  - django-extensions
  - فرانت اند و متعلقات آن
  - گیت
  - جمع بندی
    
</details>
  
<details>
  <summary>فصل شانزدهم : امینت</summary>
  <br>
  
  - مهندسی اجتماعی (Social Engineering)
  - آپدیت های جنگو
  - چک لیست های دیپلویمنت (Deployment Checklist)
  - docker-compose-prod.yml
  - DEBUG
  - پیش فرض ها (Defaults)
  - SECRET_KEY
  - امنیت وب
  - تزریق SQL (SQL injection)
  - تزریق اسکریپت از طریق وبگاه (ٓXSS)
  - جعل درخواست میان وبگاهی (CSRF)
  - مقابله با کلیک دزدی (Clickjacking Protection)
  - HTTPS/SSL
  - انتقال اکیدا ایمن HTTP (HSTS)
  - ایمن کردن کوکی ها 
  - ارتقا امنیت ادمین (Admin Hardening)
  - گیت
  - جمع بندی
    
</details>
  
  
<details>
  <summary>فصل هفدهم : دیپلویمنت</summary>
  <br>
  
  -  تفاوت PasS و IasS
  - WhiteNoise
  - فایل های رسانه ای (Media Files)
  - Gunicorn
  - Heroku
  - دیپلویمنت با داکر
  - heroku.yml
  - SECURE_PROXY_SSL_HEADER
  - لاگ های Heroku 
  - افزونه های Heroku
  - جمع بندی
  
</details>
  
<details>
  <summary>جمع بندی نهایی</summary>
  <br>
  
  - منابع یادگیری بیشتر
  - بازخورد ها
  
</details>

</div>
  
<h2 dir="rtl">
مشارکت کنندگان
</h2>

<div dir="rtl">
  
|نام همکار|راه های ارتباطی|نوع مشارکت
|:-:|:-:|:-:|
|امیر مطهری|[گیتهاب](https://github.com/mthri) [لینکدین](https://www.linkedin.com/in/amir-motahari-963689138/) [توییتر](https://twitter.com/a_mthri) [تلگرام](https://t.me/a_motahari)|اداره مخزن - مترجم فصل ۱۶|
|امید شهبازی|[گیتهاب](https://github.com/themaximalist) [لینکدین](https://linkedin.com/in/omid-shahbazi-76635b21b)| اداره مخزن - مترجم مقدمه|
|حدیث سادات موسوی|[گیتهاب](https://github.com/cemusavi) [لینکدین](https://linkedin.com/in/hadis-sadat-mousavi-178108219)|مترجم فصل های ۱و۳|
|خلیل فراشیانی|[گیتهاب](https://github.com/khalil-farashiani) [لینکدین](https://linkedin.com/in/khalil-farashiani-36393b21a)|مترجم فصل های۷ و جمع بندی|
|مائده شهابی|[گیتهاب](https://github.com/mashahabi15)|مترجم فصل ۹|
|سید محمد حسین طباطبایی|[گیتهاب](https://github.com/smhtbtb) [لینکدین](https://linkedin.com/in/mohammad-hosein-tabatabaei)|مترجم فصل ۱۲|
|آرین فوچانی|[گیتهاب](https://github.com/arianghoochani) [لینکدین](https://linkedin.com/in/arian-ghoochani-690980168)|مترجم فصل ۱۳|
|امین مرادی|[گیتهاب](https://github.com/aminmoradim) [توییتر](https://twitter.com/amin_moradim) [تلگرام](https://t.me/amin_moradim)|مترجم فصل ۱۴|
|کسری صادقیان پور|[گیتهاب](https://github.com/Kasra1377) [لینکدین](https://linkedin.com/in/kasra-sadeghian-pour-87a928204)|مترجم فصل ۲|
|علی لویویی|[گیتهاب](https://github.com/aliloloee)|مترجم فصل ۱۰|
|رضا مبارکی|[گیتهاب](https://github.com/MrRezoo) [لینکدین](https://www.linkedin.com/in/mrrezoo/) |مترجم ۱۵|
|مهرداد بیوکان|[گیتهاب](https://github.com/mehrdadbn9) [لینکدین](https://linkedin.com/in/mehrdad-biukian-naeini)|مترجم فصل ۵|
|مهدی شیر خدایی|[گیتهاب](https://github.com/Mimshimzim)|مترجم ۱۷|
|مهدی اسد زاده|[گیتهاب](https://github.com/mahdi-asadzadeh) [تلگرام](https://t.me/mahdi_asadzadeh)|مترجم فصل ۱۱|
|امین ملک محمدی|[گیتهاب](https://github.com/Aminmalek)|مترجم فصل ۴|
|امیرحسین محمدی|[گیتهاب](https://github.com/BlackIQ) [لینکدین](https://linkedin.com/in/amirhosseinmohammadi) [توییتر](https://twitter.com/GNU_Amir)  [تلگرام](https://t.me/BlackIQ)| اداره مخزن|
|محمدرضا ارغشی|[گیتهاب](https://github.com/phpreza)|مترجم فصل ۶| 
  
</div>
