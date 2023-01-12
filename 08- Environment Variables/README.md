<div dir='rtl'>
<h1>فصل ۸: متغیر های محیطی(Environment Variables)</h1>

[Environment Variables](https://en.wikipedia.org/wiki/Environment_variable) متغیرهایی هستند که می‌توانند در operating environment  یک پروژه, در زمان اجرا برخلاف هارد کدینگ داخل  کدبیس بارگذاری شوند. آنها بخشی جدایی ناپذیر از اصل محبوب [Twelve-Factor App Design](https://12factor.net/) و Django best practice در نظر گرفته می‌شوند زیرا آنها سطح وسیع‌تر امنیت و تنظیمات  local/production ساده‌تر را امکان پذیر می‌کنند.

چرا امنیت بیشتر؟ زیرا می‌توانیم اطلاعات محرمانه(اطلاعات پایگاه داده, کلید های API و ...) را جدا از کدبیس پایه ذخیره کنیم. این ایده‌ی خوبیست چون استفاده از ورژن کنترل(version control system) مانند git, به این معناست که فقط یک commit بد برای افزودن credentials برای همیشه باقی می‌ماند. این بدان معناست که هر کسی به کدبیس دسترسی داشته باشد کنترل کامل به‌روی پروژه دارد که این بسیار خطرناک است. بهتر است دسترسی افراد به برنامه محدود شود و متغیرهای‌محیطی راهی برای این کار ارائه می‌کنند.

مزیت دوم این است که متغیر‌های محیطی, جابه‌جایی بین محیط های داخلی و عملی کد را آسان‌تر می‌کند. همانطور که خواهیم دید تنظیماتی وجود دارد که جنگو به‌طور پیش‌فرض از آن برای توسعه آسان‌تر استفاده می‌کند. اما زمانی که همان پروژه برای محیط عملی آماده می‌شود باید تغییراتی را  اعمال کرد.

<h1 dir='rtl'>environs[django]</h1>

در پایتون روش های مختلفی برای کار با متغیرهای محیطی وجود دارد اما برای این پروژه از پکیج [environs](https://github.com/sloria/environs) استفاده می‌کنیم که شامل گزینه مخصوص برای جنگو است که پکیج ‌های اضافی را همراه خود نصب می‌کند که در تنظیمات به ما کمک می‌کند.

در خط فرمان `environs[django]` را نصب کنید. توجه کنید که اگر از Zsh به عنوان terminal shell استفاده می‌کنید احتمالا باید از نقل‌قول`''` در اطراف اسم بسته استفاده کنید. پس`pipenv install environs[django]==8.0.0` را اجرا کنید. همچنین نیاز داریم  Docker container را با بسته های جدید بازسازی کنیم.


</div>

<br>

**Command Line**

```
$ docker-compose exec web pipenv install 'environs[django]==8.0.0'
$ docker-compose down
$ docker-compose up -d --build

```
<br>

<div dir='rtl'>

در فایل `config/settings.py` سه خط imports برای اضافه کردن در بالای فایل در زیر *import path* وجود دارد.

</div>

<br>

**Code**
```python
# config/settings.py
from pathlib import Path
from environs import Env # new
env = Env() # new
env.read_env() # new
```

<br>

<div dir='rtl'>
حالا همه چیز آماده است.
</div>

<br>

<h1 dir='rtl'>SECRET_KEY</h1>

<div dir='rtl'>

برای اولین environment variable خود [SECRET_KEY](https://docs.djangoproject.com/en/3.1/ref/settings/#std:setting-SECRET_KEY) را تنظیم می‌کنیم, رشته‌ای که به طور تصادفی تولید شده و برای [cryptographic signing](https://docs.djangoproject.com/en/3.1/topics/signing/)  استفاده می‌شود و هر زمان که دستور `SECRET_KEY` اجرا شود ایجاد می‌شود. بسیار مهم است که SECRET_KEY مخفی نگه داشته شود. در فایل `config/settings.py` من مقدار زیر را دارد:

</div>

<br>

**Code**
```python
# config/settings.py
SECRET_KEY = ')*_s#exg*#w+#-xt=vu8b010%%a&p@4edwyj0=(nqq90b9a8*n'
```

<br>

<div dir='rtl'>

توجه داشته باشید که نقل قول های اطراف SECRET_KEY باعث می‌شود که تبدیل به رشته پایتونی شود. در واقع آنها بخشی از  SECRET_KEY نیستند که به آسانی اشتباه گرفته می‌شوند.

</div>

<div dir='rtl'>

دو گام برای جابه‌جایی environment variables وجود دارد:

</div>
 ‎
<div dir='rtl'>

- Environment Variable را به فایل `docker-compose.yml` اضافه کنید.
- `config/settings.py` را برای اشاره به متغیر بروز کنید.

</div>

<div dir='rtl'>

در فایل ` docker-compose.yml` بخشی را با نام `environment` در زیر `web service` اضافه کنید. این متغیری خواهد بود که آن را ` DJANGO_SECRET_KEY` با مقدار `SECRET_KEY` موجود خود می‌نامیم. فایل آپدیت شده به این شکل است:

</div>

<br>

**docker-compose.yml**
```
# config/settings.py
version: '3.8'

services:
  web:
    build: .
    command: python /code/manage.py runserver 0.0.0.0:8000
    volumes:
      - .:/code
    ports:
      - 8000:8000
    depends_on:
      - db
    environment:
      - "DJANGO_SECRET_KEY=)*_s#exg*#w+#-xt=vu8b010%%a&p@4edwyj0=(nqq90b9a8*n"
  db:
    image: postgres:11
    volumes:
      - postgres_data:/var/lib/postgresql/data/
    environment:
      - "POSTGRES_HOST_AUTH_METHOD=trust"

volumes:
  postgres_data:
```

<br>

<div dir='rtl'>

توجه کنید اگر `SECRET_KEY` شما دارای علامت دلار `$` باشد باید یک علامت دلار دیگر اضافه کنید `$$`   . در غیر این‌صورت با ارور مواجه می‌شوید!
  اطلاعات بیشتر در: [handles variable substitution](https://docs.docker.com/compose/compose-file/#variable-substitution)

</div>

<div dir='rtl'>

قدم دوم آپدیت کردن تنظیمات `SECRET_KEY` در `config/settings.py` است.

</div>

<br>

**Code**
```python
# config/settings.py
SECRET_KEY = env("DJANGO_SECRET_KEY")
```
<br>

<div dir='rtl'>

اگر وبسایت را رفرش کنید, خواهید دید همه چیز مانند قبل کار می‌کنند که همان چیزیست که می‌خواهیم. اگر به دلایلی `SECRET_KEY` به درستی اجرا نشده بود, اروری خواهیم دید با عنوان, جنگو برای کار کردن به آن نیاز دارد.

</div>

<div dir='rtl'>

خوانندگان ریزبین ممکن است متوجه شوند, با اینکه از environment variable استفاده می‌کنیم, مقدار `SECRET_KEY` در سورس‌کد هنوز قابل مشاهده است. همانطور که صرفا به ` docker-compose.yml` منتقل شد. درست است! با این حال, وقتی وبسایت خود برای فاز نهایی آماده می‌کنیم فایل جداگانه‌ای را برای اهداف عملی ایجاد خواهیم کرد(`docker-compose-production.yml`)و از طریق فایل `.env` آن را در محیط عملی بارگذاری خواهیم کرد که توسط گیت ردیابی نمی‌شود.

</div>

<div dir='rtl'>

هر چند, در حال‌حاضر هدف این فصل استفاده از environment variables به صورت لوکال و برای مقادیری است که باید به طور حتم مخفی باشند و یا در محیط عملی تغییر کنند.

</div>

<br>

<h1 dir='rtl'>DEBUG و ALLOWED_HOSTS</h1>

<div dir='rtl'>

همانطور که چک‌لیست [دیپلوی جنگو](https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/) اشاره می‌کند, تنظیماتی وجود دارد که باید قبل از دیپلوی امن سایت آپدیت شوند. اصلی ترین بخش‌ها [DEBUG](https://docs.djangoproject.com/en/3.1/ref/settings/#std:setting-DEBUG) و [ALLOWED_HOSTS](https://docs.djangoproject.com/en/3.1/ref/settings/#allowed-hosts) هستند.

</div>

<div dir='rtl'>

وقتی `DEBUG` روی `True` تنظیم شده باشد, جنگو پیامی طولانی و با جزییات از باگ را در مواقع وقوع یک ارور نشان می‌دهد. برای مثال از صفحه‌ای که وجود ندارد دیدن کنید, مانند `/debug`.

</div>

<br>

![20211001_124223](https://user-images.githubusercontent.com/59054740/135596687-ec44ce94-53fc-44eb-be46-8002205250cc.png)

<br>

<div dir='rtl'>

این برای اهداف ما به عنوان توسعه‌دهنده عالی است, اما همچنین یک نقشه راه برای یک هکر در محیط عملی است. وقتی `DEBUG` روی `False` تنظیم باشد, لازم است `ALLOWED_HOSTS` را تغییر دهید که هاست و دامنه‌های خاصی را که می‌توانند به وبسایت دسترسی پیدا کنند را کنترل می‌کند. دو پورت محلی (`localhost` و `127.0.0.1`) و همچنین `.herokuapp.com` را اضافه خواهیم کرد که توسط Heroku برای وبسایت ما استفاده می‌شود.

</div>

<div dir='rtl'>

فایل `config/settings.py` را با دو خط جدید آپدیت می‌کنیم:

</div>

<br>

**Code**
```python
# config/settings.py
DEBUG = False # new
ALLOWED_HOSTS = ['.herokuapp.com', 'localhost', '127.0.0.1'] # new
```

<br>

<div dir='rtl'>

بعد صفحه وب را رفرش کنید.

</div>

<br>

<div dir='rtl'>

![20211001_124252](https://user-images.githubusercontent.com/59054740/135596004-dbc322a6-578f-4ca7-9295-62b82d9ac3e9.png)

</div>

<br>

<div dir='rtl'>

این همان رفتاری است که از سایت می‌خواهیم: بدون اطلاعات, فقط یک پیام عمومی. زمانی که وبسایت را دیپلوی می‌کنیم, از راهی بخصوص برای جا‌به‌جایی بین تنظیمات استفاده می‌کنیم, اما حال `DEBUG` را به متیر محیطی `DJANGO_DEBUG` تغییر دهید.

</div>

<br>

**Code**
```python
# config/settings.py
DEBUG = env.bool("DJANGO_DEBUG")
```

<br>

<div dir='rtl'>

سپس بروزرسانی `docker-compose.yml` را انجام دهید تا `DJANGO_DEBUG` روی `True` تنظیم شود.

</div>

<br>

**docker-compose.yml**
```
version: '3.8'

services:
  web:
    build: .
    command: python /code/manage.py runserver 0.0.0.0:8000
    volumes:
      - .:/code
    ports:
      - 8000:8000
    depends_on:
      - db
    environment:
      - "DJANGO_SECRET_KEY=)*_s#exg*#w+#-xt=vu8b010%%a&p@4edwyj0=(nqq90b9a8*n"
      - "DJANGO_DEBUG=True"
  db:
    image: postgres:11
    volumes:
      - postgres_data:/var/lib/postgresql/data/
    environment:
      - "POSTGRES_HOST_AUTH_METHOD=trust"

volumes:
  postgres_data:
```

<br>

<div dir='rtl'>

پس از تغییرات وبسایت را رفرش کنید و مانند قبل کار خواهد کرد.

</div>

<br>

<h1 dir='rtl'>دیتابیس‌ها</h1>

<div dir='rtl'>

وقتی قبل‌تر `True` را نصب کردیم,  Django “goodies” شامل پکیج [ djdatabase-url](https://github.com/jacobian/dj-database-url) بود که تمام پیکربندی‌های مورد نیاز دیتابیس را شامل می‌شود, SQLite یا PostgreSQL. این بعدا در محیط عملی مفید خواهد بود.

</div>

<div dir='rtl'>

حال می‌توانیم آن را با یک مقدار پیش‌فرض به‌صورت لوکال از PostgreSQL استفاده کنیم. پیکربندی `DATABASES` موجود را با موارد زیر آپدیت کنید:

</div>

<br>

**Code**
```python
# config/settings.py
DATABASES = {
    "default": env.dj_db_url("DATABASE_URL",
    default="postgres://postgres@db/postgres")
}
```

<br>

<div dir='rtl'>

هنگام دیپلوی, متغیر محیطی `DATABASE_URL` توسط Heroku ایجاد می‌شود.

</div>

<div dir='rtl'>

وبسایت را رفرش کنید تا از کارکرد درست همه‌چیز اطمینان حاصل کنید.

</div>

<br>

<h1 dir='rtl'>گیت</h1>

<div dir='rtl'>

تغییرات مهمی را در این فصل اعمال کردیم مطمئن شوید کدها را به وسیله‌ی گیت کامیت کنید.

</div>

<br>

**Command Line**
```
$ git status
$ git add .
$ git commit -m 'ch8'
```

<br>

<div dir='rtl'>

در صورت بروز هرگونه مشکل کدهای خود را با کدهای سورس‌کد رسمی در [گیتهاب](https://github.com/wsvincent/djangoforprofessionals/tree/master/ch8-environment-variables) مقایسه کنید.

</div>

<br>

<h1 dir='rtl'>نتیجه‌گیری</h1>

<div dir='rtl'>

افزودن متغیرهای محیطی یک مرحله ضروری برای هر پروژه حرفه‌ای جنگو است. با توجه به کاری که بعدا در این کتاب می‌کنیم جا‌به‌جای بین محیط عملی و محیطی, به این شکل, بی ارزش خواد شد.
در فصل بعد تنظیمات ایمیل هارا پیکربندی کرده و قابلیت بازنشانی رمز عبور را اضافه خواهیم کرد.

</div>
