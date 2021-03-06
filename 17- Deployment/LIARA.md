# سرویس ابری لیارا

در فصل [Deployment](https://github.com/mthri/dfp-persian/tree/main/17-%20Deployment) از تفاوت‌های PaaS با IaaS گفته شد و با برخی ارائه‌دهندگان این سرویس‌ها آشنا شدیم اما بسیاری از توسعه‌دهندگان ایرانی به‌دلیل محدودیت‌های موجود امکان استفاده از این سرویس‌ها را نخواهند داشت، به‌همین دلیل صفحه‌ی جدیدی را برای معرفی و آموزش استقرار برنامه‌های Djagno بر روی [سرویس ابری لیارا](https://liara.ir/) اضافه کردیم.

همچنین لیارا برای علاقه‌مندان به توسعه‌ی برنامه‌های Django یک اعتبار اولیه هدیه ۲۰۰ هزارتومانی درنظر گرفته است که برای دریافت آن می‌توانید از طریق لینک زیر، اقدام به ثبت نام کنید.

<p align="center">
  <a href="https://liara.ir/?userToken=djangobook" target="_blank">liara.ir/djangobook</a>
</p>

#### فهرست عناوین:

- [آماده‌سازی پروژه برای استقرار](#آمادهسازی-پروژه-برای-استقرار)
  - [ویرایش فایل `config/settings.py`](#ویرایش-فایل-configsettingspy)
- [نصب ابزار Liara CLI](#نصب-ابزار-liara-cli)
- [ساخت برنامه](#ساخت-برنامه)
- [راه‌اندازی دیتابیس](#راهاندازی-دیتابیس)
- [اتصال به دیتابیس](#اتصال-به-دیتابیس)
- [استقرار برنامه](#استقرار-پروژه-بر-روی-سرورهای-ابری-لیارا)
- [اتصال به خط فرمان و اجرای Migrationها](#اتصال-به-خط-فرمان-و-اجرای-migrationها)
- [چک‌لیست Production](#چکلیست-production)
  - [دامنه‌ها](#دامنهها)
  - [تنظیم مقدار متغیر محیطی `DEBUG` به `False`](#تنظیم-مقدار-متغیر-محیطی-debug-به-false)
  - [تنظیم اعلان](#تنظیم-اعلان)
  - [فایل‌های پشتیبان](#فایلهای-پشتیبان)
  - [فعال کردن ویژگی‌های کاربردی](#فعال-کردن-ویژگیهای-کاربردی)
### آماده‌سازی پروژه برای استقرار

پس از انجام پیکری‌بندی‌های امنیتی و اتمام آماده‌سازی‌های نهایی پروژه  برای محیط Production در [فصل شانزدهم](https://github.com/mthri/dfp-persian/tree/main/16-%20Security) این کتاب، باید [سورس‌کد نهایی](https://github.com/wsvincent/djangoforprofessionals/tree/master/ch16-security) را برای استقرار پروژه در [پلتفرم Djagno](https://docs.liara.ir/app-deploy/django/getting-started) سرویس ابری لیارا آماده‌سازی کنیم.

#### ویرایش فایل `config/settings.py`

تنظیم مقدار پیش‌فرض برای متغیر `SECRET_KEY` تنها تغییری است که باید در پروژه‌ی خود اعمال کنید بنابراین فایل `config/settings.py` را با ویرایشگر متنی باز کرده و به‌شکل زیر، یک مقدار پیش‌فرض تعیین کنید. برای مثال:


```python
SECRET_KEY = env("DJANGO_SECRET_KEY", default="temporary-secret")
```


### نصب ابزار Liara CLI

نصب ابزار Liara CLI در تمامی سیستم‌عامل‌ها به یک شکل است. شما باید در ابتدا NodeJS را از [وبسایت رسمی](https://nodejs.org/en/) این Runtime دانلود  و نصب کنید. در قدم بعد تنها با اجرای دستور زیر، ابزار Liara CLI بر روی سیستم‌عامل شما نصب خواهد شد:


```bash
npm install -g @liara/cli
```


همچنین شما می‌توانید از دستور فوق برای ارتقا ابزار Liara CLI به نسخه‌ی جدیدتر استفاده کنید.

### ساخت برنامه

برای ساخت یک برنامه جدید می‌توانید وارد پنل کاربری خود شده و در بخش برنامه‌ها با کلیک بر روی دکمه‌ی ایجاد برنامه، یک برنامه با پلتفرم Django ایجاد کنید.

همچنین می‌توانید به‌سادگی با استفاده از ابزار Liara CLI این کار را انجام دهید:


```bash
liara create --platform django
```

### راه‌اندازی دیتابیس

برای راه‌اندازی یک دیتابیس جدید می‌توانید در پنل کاربری خود، وارد بخش دیتابیس‌ها شده و با کلیک بر روی دکمه‌ی راه‌اندازی دیتابیس، یک دیتابیس از نوع PostgreSQL تهیه کنید.

### اتصال به دیتابیس

برای اتصال به دیتابیس PostgreSQL در برنامه‌های Django تنها کافیست اطلاعات اتصال به دیتابیس را در بخش متغیرهای محیطی یا همان ENVs تنظیم کنید:


```plaintext
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/NAME
```


برای کسب اطلاعات بیشتر می‌توانید [مستندات اتصال به دیتابیس در برنامه‌های Django](https://docs.liara.ir/app-deploy/django/dbs) را مطالعه کنید.

### استقرار پروژه بر روی سرورهای ابری لیارا

حال زمان آن رسیده که با اجرای دستور زیر، پروژه‌‌تان را بر روی سرورهای ابری لیارا مستقر کنید:


```bash
liara deloy
```

### اتصال به خط فرمان و اجرای Migrationها

زمانیکه در برنامه‌های Django یک Model جدید را تعریف می‌کنید یا یکی از Modelهای فعلی را تغییر می‌دهید نیاز است تا اصطلاحا Migration ها را اجرا کنید. به‌منظور اجرای Migration ها در ابتدا دستور زیر را در مسیر اصلی پروژه‌ی لوکال خود اجرا کنید:


```bash
python manage.py makemigrations
```


پس از ایجاد موفق فایل‌های Migration و اطمینان از [اتصال به دیتابیس](https://docs.liara.ir/app-deploy/django/dbs)، پروژه‌ی خود را با اجرای دستور زیر در سرویس تهیه شده مستقر کنید:


```bash
liara deloy
```

درنهایت پس از استقرار موفق پروژه در سرویس تهیه شده می‌توانید دستور زیر را در [خط فرمان](https://docs.liara.ir/app-features/console) برنامه اجرا کنید:


```bash
python manage.py migrate
```


### چک‌لیست Production

توجه داشته باشید که رعایت چک‌لیست زیر اختیاری است اما ما برای به حداقل رساندن مشکل‌های نرم‌افزاری و داشتن آپ‌تایم حداکثری، رعایت این موارد را بسیار توصیه می‌کنیم.

#### دامنه‌ها

در قدم اول، [زیردامنه‌ی رایگان liara.run](https://docs.liara.ir/domains/management#liara-subdomain) را از بخش تنظیمات برنامه به‌منظور SEO غیرفعال کنید و همچنین [ساب‌دامنه‌ی www](https://docs.liara.ir/domains/management#add-subdoamin) را علاوه‌بر دامنه‌ی ریشه در بخش دامنه‌ها اضافه کرده و با تنظیم ریدایرکت 301، کاربران را به دامنه‌ی ریشه هدایت کنید.

توجه داشته باشید که در صورت فعال بودن CDN بایستی SSL/TLS خود را از سرویس‌دهنده‌ی CDN فعلی تهیه کرده و گواهی SSL را در سمت لیارا غیر فعال کنید.
#### تنظیم مقدار متغیر محیطی DEBUG به False

توجه داشته باشید که مقدار `DEBUG` در متغیرهای محیطی برنامه‌‌های Django برابر با `false` باشد.


#### تنظیم اعلان

در صفحه‌ی [تنظیم اعلان](https://console.liara.ir/settings/notifications)، مسیرهای اطلاع رسانی مختلف را برای دریافت اعلان‌ها فعال کرده و همچنین مقدار حداقل اعتبار را نسبت به هزینه‌ی سرویس‌های فعلی خود، افزایش دهید.

#### فایل‌های پشتیبان

لیارا به‌منظور جلوگیری از از دست رفتن داده‌های شما به‌صورت روزانه و خودکار از برنامه‌ها و دیتابیس‌های شما، فایل پشتیبان تهیه می‌کند. حال شما می‌توانید فایل‌های پشتیبان را با استفاده از [API لیارا](https://docs.liara.ir/client-api/about) به‌صورت خودکار در فضاهای ذخیره‌سازی ابری دیگری مانند Google Drive ذخیره کنید.


#### فعال کردن ویژگی‌های کاربردی

برای داشتن بالاترین آپتایم، از فعال بودن قابلیت [استقرار بدون اختلال](https://docs.liara.ir/app-features/zero-downtime-deployment) اطمینان حاصل کرده و همچنین قابلیت [بررسی سلامت](https://docs.liara.ir/app-features/health-check) را پیکربندی کنید.

<p align="center">
  <a href="https://liara.ir/?userToken=djangobook" target="_blank">liara.ir/djangobook</a>
</p>
