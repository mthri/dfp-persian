<div dir='rtl'>
<h1>فصل ۸: متغیر های محیطی(Environment Variables)</h1>
  
[Environment Variables](https://en.wikipedia.org/wiki/Environment_variable) متغیرهایی هستند که می‌توانند در operating environment  یک پروژه, در زمان اجرا برخلاف hard coded داخل  codebase بارگذاری شوند. آنها بخشی جدایی ناپذیر از اصل محبوب [Twelve-Factor App Design](https://12factor.net/) و Django best practice در نظر گرفته می‌شوند زیرا آنها سطح وسیع‌تر امنیت و تنظیمات  local/production ساده‌تر را امکان پذیر می‌کنند.
  
چرا امنیت بیشتر؟ زیرا می‌توانیم اطلاعات محرمانه(اطلاعات پایگاه داده, کلید های API و ...) را جدا از codebase پایه ذخیره کنیم. این ایده‌ی خوبیست چون استفاده از ورژن کنترل(version control system) مانند git, به این معناست که فقط یک commit بد برای افزودن credentials برای همیشه باقی می‌ماند. این بدان معناست که هر کسی به codebase دسترسی داشته باشد کنترل کامل به‌روی پروژه دارد که این بسیار خطرناک است. بهتر است دسترسی افراد به برنامه محدود شود و متغیرهای‌محیطی راهی برای این کار ارائه می‌کنند. 
  
مزیت دوم این است که متغیر‌های محیطی, جابه‌جایی بین محیط های داخلی و عملی کد را آسان‌تر می‌کند. همانطور که خواهیم دید تنظیماتی وجود دارد که جنگو به‌طور پیش‌فرض از آن برای توسعه آسان‌تر استفاده می‌کند. اما زمانی که همان پروژه برای محیط عملی آماده می‌شود باید تغییراتی را  اعمال کرد.
  
**environs[django]**

در پایتون روش های مختلفی برای کار با متغیرهای محیطی وجود دارد اما برای این پروژه از پکیج [environs](https://github.com/sloria/environs) استفاده می‌کنیم که شامل گزینه مخصوص برای جنگو است که پکیج ‌های اضافی را همراه خود نصب می‌کند که در تنظیمات به ما کمک می‌کند. 
  
در خط فرمان `environs[django]` را نصب کنید. توجه کنید که اگر از Zsh به عنوان terminal shell استفاده می‌کنید احتمالا باید از نقل‌قول`''` در اطراف اسم بسته استفاده کنید. پس`pipenv install environs[django]==8.0.0` را اجرا کنید. همچنین نیاز داریم  Docker container را با بسته های جدید بازسازی کنیم.


</div>

**Command Line**

```
$ docker-compose exec web pipenv install 'environs[django]==8.0.0'
$ docker-compose down
$ docker-compose up -d --build

```  
<div dir='rtl'>
  
در فایل `config/settings.py` سه خط imports برای اضافه کردن در بالای فایل در زیر *import path* وجود دارد.  
  
</div>

**Code**
```
# config/settings.py
from pathlib import Path
from environs import Env # new
env = Env() # new
env.read_env() # new
```

<div dir='rtl'>
حالا همه چیز آماده است.
</div>

# SECRET_KEY

<div dir='rtl'>
  
برای اولین environment variable خود [SECRET_KEY](https://docs.djangoproject.com/en/3.1/ref/settings/#std:setting-SECRET_KEY) را تنظیم می‌کنیم, رشته‌ای که به طور تصادفی تولید شده و برای [cryptographic signing](https://docs.djangoproject.com/en/3.1/topics/signing/) شده استفاده می‌شود و هر زمان که دستور `SECRET_KEY` اجرا شود ایجاد می‌شود. بسیار مهم است که SECRET_KEY مخفی نگه داشته شود. در فایل `config/settings.py` من مقدار زیر را دارد: 
  
</div>

**Code**
```
# config/settings.py
SECRET_KEY = ')*_s#exg*#w+#-xt=vu8b010%%a&p@4edwyj0=(nqq90b9a8*n'
```
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
<div dir='rtl'>

توجه کنید اگر `SECRET_KEY` شما دارای علامت دلار `$` باشد باید یک علامت دلار دیگر اضافه کنید `$$`   . در غیر این‌صورت با ارور مواجه می‌شوید!
  اطلاعات بیشتر در: [handles variable substitution](https://docs.docker.com/compose/compose-file/#variable-substitution)
</div>

<div dir='rtl'>
  
قدم دوم آپدیت کردن تنظیمات `SECRET_KEY` در `config/settings.py` است.
  
</div>
