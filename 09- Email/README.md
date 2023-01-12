<div dir='rtl'>

# فصل ۹: ایمیل

در این فصل ما به طور کامل ایمیل را پیکربندی می‌کنیم و تغییر رمز عبور و بازنشانی رمز عبور را اضافه می‌کنیم.
در حال حاضر ایمیل‌ها به طور واقعی به کاربران ارسال نمی‌شوند. آن‌ها به سادگی در کنسول خط فرمان در خروجی نشان داده می‌شوند.    ما آن را با ثبت نام برای یک سرویس ایمیل ثالث، گرفتن یک API Key و به روزرسانی settings.py تغییر خواهیم داد.
جنگو به بقیه‌اش نظارت می‌کند.
<br>
تا کنون تمام کارهای ما - مدل کاربر سفارشی، اپ pages، فایل‌های استاتیک، احراز هویت با allauth و متغیرهای محیطی-
می‌توانستند در هر پروژه جدیدی اعمال شوند.
بعد از این فصل ما ساخت خود سایت Bookstore را بر خلاف مراحل بنیادین آغاز خواهیم کرد.

## پیکربندی سفارشی ایمیل ها
بیایید برای یک اکانت کاربری جدید ثبت نام کنیم تا جریان کنونی ثبت نام کاربر را مرور کنیم.
سپس ما آن را سفارشی می کنیم. اطمینان حاصل کنید که خارج شده اید و دوباره به صفحه ثبت نام بروید. من انتخاب کرده ام که از testuser3@email.com[به عنوان نام کاربری] و testpass123 به عنوان پسورد استفاده کنم.

![testuser3 Sign Up](./images/testuser%203%20Sign%20Up.png)

پس از ارائه‌ی این فصل، ما به صفحه خانه هدایت می‌شویم که یک عبارت خوش‌آمدگویی سفارشی نشان می‌دهد و یک ایمیل از طریق کنسول خط فرمان به ما ارسال می‌شود. شما می‌توانید این را با بررسی لاگ‌های docker-compose logs ببینید.
برای سفارشی سازی این ایمیل ما ابتدا نیاز داریم که قالب‌های موجود را پیدا کنیم.
 به
  [سورس کد django-allauth در گیت‌هاب](https://github.com/pennersr/django-allauth)
   بروید و ...
   در نتیجه می‌بینیم که از دو فایل استفاده شده است: یک فایل برای موضوع ایمیل، email_confirmation_subject.txt، و یک فایل برای بدنه‌ی ایمیل به نام email_confirmation_-
message.txt.
برای به‌روزرسانی هر دو فایل، ما ابتدا همان ساختار django-allauth را دوباره‌سازی می‌کنیم که به معنای ساخت یک فولدر email داخل templates/account است و سپس آن دو فایل را override می‌کنیم.

<div dir='ltr'>
Command Line

```shell
$ mkdir templates/account/email
$ touch templates/account/email/email_confirmation_subject.txt
$ touch templates/account/email/email_confirmation_message.txt
```
</div>

 با به‌روزرسانی فایل موضوع ایمیل شروع می‌کنیم زیرا بین این دو کوتاه‌تر است. محتویات این فایل به طور پیش فرض در django-allauth به این شکل است:

<div dir='ltr'>
email_confirmation_subject.txt

```python
{% load i18n %}
{% autoescape off %}
{% blocktrans %}Please Confirm Your E-mail Address{% endblocktrans %}
{% endautoescape %}
```
</div>
اولین  خط، {% load i18n %}، برای پشتیبانی از

  [عملکرد بین‌المللی‌ کردن](https://docs.djangoproject.com/en/3.1/topics/i18n/) جنگو است، قابلیت پشتیبانی از چندین زبان.

  سپس تگ قالب جنگو
  [autoscape](https://docs.djangoproject.com/en/3.1/ref/templates/builtins/#autoescape) را می‌بینید.
   به طور پیش‌فرض autoscape روشن است، و در برابر مشکلات امنیتی مانند تزریق اسکریپت از طریق وبگاه محافظت می‌کند. اما به این دلیل که ما اینجا به محتوای متن اطمینان داریم autoscape را خاموش می‌کنیم.
   در نهایت، به خود متن می‌رسیم که داخل تگ قالب
   [blocktrans](https://docs.djangoproject.com/en/3.1/topics/i18n/translation/#std:templatetag-blocktrans) قرار داده شده است تا از ترجمه پشتیبانی کند. حال بیایید متن را تغییر دهیم

<div dir='ltr'>
email_confirmation_subject.txt

```python
{% load i18n %}
{% autoescape off %}
{% blocktrans %}Confirm Your Sign Up{% endblocktrans %}
{% endautoescape %}
```
</div>

حال به سراغ خود پیام ایمیل تاییدیه می‌رویم.
این
[پیام پیش‌فرض فعلی](https://github.com/pennersr/django-allauth/blob/41f84f5530b75431cfd4cf2b89cd805ced009e7d/allauth/templates/account/email/email_confirmation_message.txt) است:

<div dir='ltr'>
email_confirmation_subject.txt

```python
{% load account %}{% user_display user as user_display %}{% load i18n %}\
{% autoescape off %}{% blocktrans with site_name=current_site.name\
site_domain=current_site.domain %}\
Hello from {{ site_name }}!
You're receiving this e-mail because user {{ user_display }} has given\
yours as an e-mail address to connect their account.
To confirm this is correct, go to {{ activate_url }}
{% endblocktrans %}{% endautoescape %}
{% blocktrans with site_name=current_site.name\
site_domain=current_site.domain %}
Thank you from {{ site_name }}!
{{ site_domain }}{% endblocktrans %}
```
</div>

توجه داشته باشید که بک‌اسلش‌ها \ برای قالب‌بندی اضافه شده‌اند و داخل کد خام ضروری نیستند. به عبارت دیگر، شما می‌توانید بر حسب نیاز آن‌ها را از این کد -و هر مثال کد دیگری- حذف کنید.

شما احتمالا متوجه شده‌اید که ایمیل پیش‌فرضی که ارسال شد به سایت ما با آدرس example.com ارجاع داده است که اینجا با {{ site_name }} نشان داده شده است. این از کجا می‌آید؟ پاسخ در قسمت sites پنل ادمین جنگو است، که توسط django-allauth استفاده می‌شود. پس به پنل ادمین با آدرس http://127.0.0.1:8000/admin/ بروید و در صفحه‌ی خانه روی لینک Sites کلیک کنید.

![Admin Sites](./images/Admin%20Sites.png)
در این قسمت «نام دامنه» و «نام نمایشی» را می‌بینیم. در قسمت «نام دامنه» روی example.com کلیک کنید تا آن را ویرایش کنیم.
[نام دامنه](https://docs.djangoproject.com/en/3.1/ref/contrib/sites/#django.contrib.sites.models.Site.domain) نام دامنه‌ی کامل برای یک سایت است، به طور مثال djangobookstore.com، در حالیکه
[نام نمایشی](https://docs.djangoproject.com/en/3.1/ref/contrib/sites/#django.contrib.sites.models.Site.name) یک نام قابل خواندن برای انسان برای سایت است، مانند Django Bookstore.
این به‌روزرسانی‌ها را انجام دهید و وقتی انجام شد روی دکمه «ذخیره» در گوشه‌ی پایین راست صفحه کلیک کنید.

 ![Admin Sites - DjangoBookstore.com](./images/Admin%20Sites%20-%20DjangoBookstore.com.png)

بسیار خوب، به ایمیلمان برمی‌گردیم. بیایید آن را با تغییر کوچکی در پیام خوش‌آمدگویی از "Hello" به "Hi" تغییر دهیم.

<div dir='ltr'>
email_confirmation_subject.txt

```python
{% load account %}{% user_display user as user_display %}{% load i18n %}\
{% autoescape off %}{% blocktrans with site_name=current_site.name
\site_domain=current_site.domain %}
Hi from {{ site_name }}!
You're receiving this e-mail because user {{ user_display }} has given\
yours as an e-mail address to connect their account.
To confirm this is correct, go to {{ activate_url }}
{% endblocktrans %}{% endautoescape %}
{% blocktrans with site_name=current_site.name\
site_domain=current_site.domain %}
Thank you from {{ site_name }}!
{{ site_domain }}{% endblocktrans %}
```
</div>

آخرین مورد برای تغییر دادن. آیا متوجه شدید که ایمیل از آدرس webmaster@localhost ارسال شد؟ این تنظیمات پیش‌فرض است که ما می‌توانیم آن را از طریق
[DEFAULT_FROM_EMAIL](https://docs.djangoproject.com/en/3.1/ref/settings/#default-from-email) به روز‌رسانی کنیم.
این کار را با اضافه کردن خط پایین به آخر فایل config/settings.py انجام می‌دهیم:

<div dir='ltr'>
Code

```python
# config/settings.py
DEFAULT_FROM_EMAIL = 'admin@djangobookstore.com'
```
</div>

مطمئن شوید که از سایت خارج شده اید و دوباره به صفحه ثبت‌نام بروید و یک کاربر جدید بسازید. من برای راحتی از testuser4@email.com استفاده کرده‌ام.

![Sign Up testuser4](./images/Sign%20Up%20testuser4.png)

لاگین کنید و بعد از هدایت شدن به صفحه خانه، خط فرمان را بررسی کنید تا پیام ایمیل را با تایپ کردن docker-compose logs ببینید.


<div dir='ltr'>
Command Line

```shell
...
web_1 | Content-Transfer-Encoding: 7bit
web_1 | Subject: [Django Bookstore] Confirm Your Sign Up
web_1 | From: admin@djangobookstore.com
web_1 | To: testuser4@email.com
web_1 | Date: Mon, 03 Aug 2020 18:34:50 -0000
web_1 | Message-ID: <156312929025.27.2332096239397833769@87d045aff8f7>
web_1 |
web_1 | Hi from Django Bookstore!
web_1 |
web_1 | You're receiving this e-mail because user testuser4 has given yours\
as an e-mail address to connect their account.
web_1 |
web_1 | To confirm this is correct, go to http://127.0.0.1:8000/accounts/\
confirm-email/NA:1hmjKk:6MiDB5XoLW3HAhePuZ5WucR0Fiw/
web_1 |
web_1 | Thank you from Django Bookstore!
web_1 | djangobookstore.com
```
</div>

و حال ایمیل ما با تنظیمات جدید From، دامنه‌ی جدید djangobookstore.com، و پیام جدید داخل ایمیل ایجاد شده است.

## صفحه تایید ایمیل
روی لینک یکتای داخل ایمیل که به صفحه‌ی تایید ایمیل هدایت می‌کند کلیک کنید.

![Email Confirm Page](./images/Confirm%20Email%20Page.png)

خیلی جذاب نیست. بیایید آن را به‌روزرسانی کنیم تا با ظاهر بقیه‌ی سایت ما هماهنگ باشد. جست‌وجوی دوباره در
  [سورس کد django-allauth در گیت‌هاب](https://github.com/pennersr/django-allauth)
مشخص می‌کند که نام و موقعیت این فایل templates/account/email_confirm.html است.
پس بیایید قالب خودمان را ایجاد کنیم.

<div dir='ltr'>
Command Line

```shell
$ touch templates/account/email_confirm.html
```
</div>

و سپس آن را به‌روزرسانی می‌کنیم تا فایل _base.html را توسعه دهد و برای دکمه از Bootstrap استفاده می‌کنیم.


<div dir='ltr'>

```Code
<!-- templates/account/email_confirm.html -->
{% extends '_base.html' %}
{% load i18n %}
{% load account %}
{% block head_title %}{% trans "Confirm E-mail Address" %}{% endblock %}
{% block content %}
<h1>{% trans "Confirm E-mail Address" %}</h1>
{% if confirmation %}
{% user_display confirmation.email_address.user as user_display %}
<p>{% blocktrans with confirmation.email_address.email as email %}Please confirm
that <a href="mailto:{{ email }}">{{ email }}</a> is an e-mail address for user
{{ user_display }}.{% endblocktrans %}</p>
<form method="post" action="{% url 'account_confirm_email' confirmation.key %}">
{% csrf_token %}
<button class="btn btn-primary" type="submit">{% trans 'Confirm' %}</button>
</form>139
Chapter 9: Email
{% else %}
{% url 'account_email' as email_url %}
<p>{% blocktrans %}This e-mail confirmation link expired or is invalid. Please
<a href="{{ email_url }}">issue a new e-mail confirmation request</a>.\
{% endblocktrans %}</p>
{% endif %}
{% endblock %}
```
</div>

صفحه‌ را رفرش کنید تا به‌روز‌رسانی را ببینید.

![Confirm Email Page Updated](./images/Confirm%20Email%20Page%20Updated.png)

## بازنشانی رمز عبور و تغییر رمز عبور

جنگو و django-allauth ویژگی‌های بیشتر برای اکانت کاربر را همراه خود دارند، مانند توانایی بازنشانی رمز عبور و تغییر رمز عبور اگر از قبل وارد شده‌اید.
 صفحات پیش‌فرض بازنشانی رمز عبور و تغییر رمز عبور اینجا قرار دارند:

- http://127.0.0.1:8000/accounts/password/reset/
- http://127.0.0.1:8000/accounts/password/change/

اگر داخل هرکدام از این دو مسیر بروید می‌توانید قالب‌های متناظر و پیام‌های ایمیل را در سورس کد django-allauth پیدا کنید.

## سرویس ایمیل
ایمیل‌هایی که تاکنون پیکربندی کرده‌ایم به طور کلی تحت نام «ایمیل‌های تراکنشی» ارجاع داده می‌شوند، زیرا آن‌ها بر اساس یک نوع فعالیت کاربر اتفاق می‌افتند.
این در مقابل «ایمیل‌های بازاریابی» است که به طور مثال، همچون یک خبرنامه‌ی ماهانه‌اند.
تعداد بسیار زیادی ارائه‌دهنده ایمیل‌های تراکنشی وجود دارد، مثل SendGrid, MailGun, Amazon’s
Simple Email Service.
برای جنگو تفاوتی نمی‌کند که از کدام ارائه‌دهنده استفاده شود، مراحل انجام کار برای همه‌ی آن‌ها مشابه است و بسیاری از آن‌ها امکان عضویت رایگان دارند.
پس از اینکه در سرویس ایمیلی که انتخاب کردید ثبت‌نام انجام دادید، اغلب بین استفاده از
  [SMTP](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol)
  یا یک Web API می‌توانید انتخاب کنید. پیکربندی SMTP آسان‌تر است،
 اما web API قابلیت‌های پیکربندی بیشتری دارد و قدرتمندتر است. با SMTP شروع کنید و کار خودتان را از آن‌جا پیش ببرید: پیکربندی‌های ایمیل می‌توانند به خودی خود کاملا پیچیده باشند.
پس از دریافت نام کاربری و رمز عبور از یک ارائه‌دهنده ایمیل، یکسری تنظیمات دقیق به جنگو اجازه می‌دهد تا برای ارسال ایمیل از آن‌ها استفاده کند.
اولین قدم به‌روزرسانی تنظیمات EMAIL_BACKEND است، که در انتهای فایل config/settings.py قرار دارد چون ما قبلا آن‌را آپدیت کرده‌ایم.

<div dir='ltr'>

```Code
# config/settings.py
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend' # new
```

</div>
و سپس برای پیکربندی EMAIL_HOST، EMAIL_HOST_USER، EMAIL_HOST_PASSWORD، EMAIL_PORT و EMAIL_USE_TLS به عنوان متغیرهای محلی بر اساس دستورالعمل‌های ارائه‌دهنده سرویس ایمیل شما.
در سورس کد رسمی، EMAIL_BACKEND همان console باقی خواهد ماند، اما مراحل قبلی چگونگی اضافه کردن یک سرویس ایمیل بودند. اگر هنگام پیکربندی مناسب ایمیل ناامید شدید، شما تنها نیستید! حداقل جنگو این کار را برای ما بسیار بسیار آسان‌تر کرده است.

## گیت
برای کامیت کردن تغییرات کد این فصل، حتما وضعیت تغییرات را چک کرده، همه‌ی آن‌ها را اضافه کنید و سپس یک پیام کامیت بنویسید.

<div dir='ltr'>

```Command Line
$ git status
$ git add .
$ git commit -m 'ch9'
```

</div>

اگر هر مشکلی داشتید، کد خود را با
  [سورس کد رسمی در گیت‌هاب](https://github.com/wsvincent/djangoforprofessionals/tree/master/ch9-email)
مقایسه کنید.

## نتیجه گیری
پیکربندی صحیح ایمیل تا حد زیادی یک درد یکباره است. ولی این یک قسمت ضروری از وبسایت هر محصولی می‌باشد. [پیکربندی ایمیل] به فصل‌های اساسی پروژه کتاب‌فروشی ما ختم می‌شود. در فصل بعدی ما بالاخره ساخت خود سایت کتاب‌فروشی را آغاز خواهیم کرد.


</div>
