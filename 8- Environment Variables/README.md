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
