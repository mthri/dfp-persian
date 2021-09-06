<h1 dir="rtl"> ترجمه آزاد کتاب  Django for Professionals</h1>

<div dir="rtl">

قبل از شروع فهرست کتاب اگر، اگر مایل به مشارکت هستید، [نحوه مشارکت](https://github.com/mthri/dfp-persian/blob/main/CONTRIBUTING.md) را حتما مطالعه کنید.
  
**[مقدمه](https://github.com/mthri/dfp-persian/tree/main/0-%20Introduction)**

- پیشنیاز ها  
- ساختار کتاب
- آرایش کتاب
- ادیتور متن
- نتیجه گیری

<br>

**فصل اول : داکر**

- داکر چیست
- تفاوت کانتینر ها و Virtual Environments
- نصب داکر
- Hello World با داکر
- Hello World با جنگو
- اپ pages
- تصاویر و کانتینر ها و میزبانی داکر
- گیت
- جمع بندی

  <br>

**فصل دوم : PostgreSQL**

  - شروغ به کار
  - داکر 
  - حالت تفکیک شده (Detached Mode)
  - PostgreSQL
  - تنظیمات
  - Psycopg
  - دیتابیس تازه
  - git
  - جمع بندی

  <br>
  
**فصل سوم : پروژه فروشگاه کتاب**
  
  - داکر
  - PostgreSQL
  - مدل کاربر شخصی سازی شده (Custom User Model)
  - فرم های کاربر شخصی سازی شده (Custom User Forms)
  - پنل ادمین کاربر شخصی سازی شده (Custom User Admin)
  - سوپریوزر (Superuser)
  - تست ها 
  - یونیت تست ها
  - Git
  - جمع بندی

  <br>
  
**فصل چهارم : اپ Pages**

  - تمپلیت ها
  - ٰViewها و URL ها
  - تست ها
  - تست کردن تمپلیت ها
  - تست کردن HTML
  - متد setUP
  - Resolve
  - Git
  - جمع بندی

  <br>
  
**فصل پنجم : ثبت نام کاربر (مقدماتی)**

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
  - Git
  - جمع بندی

  <br>
  
**فصل ششم : اشیاء استاتیک (Static Assets)** 

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
  - Git
  - جمع بندی

  <br>
  
**فصل هفتم : ثبت نام کاربر (پیشرقته)**

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
  - Git
  - جمع بندی

  <br>
  
**فصل هشتم : متغییر های Environment**
 
  - environs[django]
  - SECRET_KEY
  - DEBUG و ALLOWED_HOSTS
  - DATABASES
  - Git
  - جمع بندی
 
  <br>
  
**فصل نهم : ایمیل**
  
  - تایید ایمیل شخصی سازی شده
  - صفحه تایید ایمیل
  - تغییر و بازنشانی رمز
  - سرویس ایمیل در جنگو
  - Git
  - جمع بندی

  <br>
  
**فصل دهم : اپ Books** 
  
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
  - Git
  - جمع بندی

  <br>
  
**فصل یازدهم : اپ Reviews**
  
  - Foreign Key ها
  - مدل Review ها
  - تنظیم ادمین پنل
  - تمپلیت ها
  - تست ها
  - Git
  - جمع بندی
  
  <br>
  
**فصل دوازدهم : ابلود فایل ها و تصاویر**
  
  - فایل های رسانه ای (Media Files)
  - Model ها
  - تنظیم پنل ادمین
  - تمپلیت ها
  - قدم های فراتر
  - Git
  - جمع بندی

  <br>
  
**فصل سیزدهم : دسترسی ها (Permissions)**
  
  - فقط کاربر های وارد شده مجازند (Logged-In Users Only)
  - دسترسی ها
  - دسترسی های شخصی سازی شده (Custom Permissions)
  - دسترسی های کاربر
  - PermissionRequiredMixin
  - گروه ها و UserPassesTestMixin
  - تست ها
  - Git
  - جمع بندی

  <br>
  
**فصل چهاردهم : جستوجو**
  
  - صفحه نتایج جستوجو
  - فیلتر های مقدماتی (Basic Filtering)
  - اشیاء Q (Q Objects)
  - Form ها
  - Form جستوجو
  - Git
  - جمع بندی
 
  <br>
  
**فصل پانزدهم : کارایی**
  
  - django-debug-toolbar
  - آنالیز صفحه ها
  - select_related و prefetch_related
  - کشینگ (Caching)
  - ایندکس ها (Indexes)
  - django-extensions
  - فرانت اند و متعلقات آن
  - Git
  - جمع بندی
  
  <br>
  
**فصل شانزدهم : امینت**
   
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
  - Git
  - جمع بندی

  <br>
  
 **فصل هفدهم : دیپلویمنت**
  
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
  
  <br>
  
**جمع بندی نهایی**
  
  - منابع یادگیری بیشتر
  - بازخورد ها

</div>
  
<h2 dir="rtl">
مشارکت کنندگان
</h2>

<ul dir="rtl">
    <li>امیر مطهری | <a href="https://github.com/mthri">گیت‌هاب</a> | <a href="https://twitter.com/a_mthri">توییتر</a></li>
    <li>امید شهبازی | <a href="https://github.com/themaximalist">گیت‌هاب</a> | <a href="https://www.linkedin.com/in/omid-shahbazi-76635b21b/">لینکدین</a></li>
    <li>حدیث سادات موسوی | <a href="https://github.com/cemusavi">گیت‌هاب</a> | <a href="https://www.linkedin.com/in/hadis-sadat-mousavi-178108219">لینکدین</a></li>
    <li>خلیل فراشیانی | <a href="https://github.com/khalil-farashiani">گیت‌هاب</a> | <a href="https://www.linkedin.com/in/khalil-farashiani-36393b21a">لینکدین</a></li>
    <li>مائده شهابی | <a href="https://github.com/mashahabi15">گیت‌هاب</a></li>
    <li>سید محمد حسین طباطبایی | <a href="https://github.com/smhtbtb">گیت‌هاب</a> | <a href="https://www.linkedin.com/in/mohammad-hosein-tabatabaei">لینکدین</a></li>
    <li>آرین قوچانی | <a href="https://github.com/arianghoochani">گیت‌هاب</a> | <a href="https://www.linkedin.com/in/arian-ghoochani-690980168">لینکدین</a></li>
    <li>امین مرادی | <a href="https://github.com/aminmoradim">گیت‌هاب</a>| <a href="https://twitter.com/amin_moradim">توییتر</a> | <a href="https://t.me/amin_moradim">تلگرام</a></li>
    <li>کسری صادقیان پور | <a href="https://github.com/Kasra1377">گیت‌هاب</a> | <a href="https://www.linkedin.com/in/kasra-sadeghian-pour-87a928204/">لینکدین</a></li>
    <li>علی لؤلؤیی | <a href="https://github.com/aliloloee">گیت‌هاب</a></li>
    <li>رضا مبارکی | <a href="https://github.com/MrRezoo" >گیت‌هاب</a></li>
    <li>مهرداد بیوکیان | <a href="https://github.com/mehrdadbn9">گیت‌هاب</a> | <a href="https://www.linkedin.com/in/mehrdad-biukian-naeini">لینکدین</a></li>
    <li>محمد شیرخدایی | <a href="https://github.com/Mimshimzim">گیت‌هاب</a></li>
    <li>مهدی اسد زاده | <a href="https://github.com/mahdi-asadzadeh">گیت‌هاب</a> | <a href="https://t.me/mahdi_asadzadeh">تلگرام</a></li>
    <li>امین ملک محمدی | <a href="https://github.com/Aminmalek">گیت‌هاب</a></li>
 
</ul>
