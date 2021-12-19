

<div dir="rtl">

# پروژه کتاب فروشی

وقتشه که پروژه اصلی کتاب رو شروع کنیم، یک کتاب فروشی آنلاین. در این فصل یه پروژه جدید شروع میکنیم، برمیگردیم به داکر، یه مدل سفارشی میسازیم و اولین آزمایشات خود را پیاده میکنیم.

شروع کنیم با ساخت یک پروژه جنگو جدید با `Pipenv` و بعد کار با داکر.
به نظر میرسه هنوز توی پوشه `postgresql` باشید از فصل قبل، پس داخل کامند لاین دستور `/.. cd` را وارد کنید تا وارد پوشه دلخواه `code` شوید. (فرض میکنیم که از مک استفاده میکنید). یه پوشه به اسم `book` میسازیم و داخل آن جنگو را نصب میکنیم. همچنین از `PostgreSQL` هم استفاده میکنیم. پس میتونیم `psycopg2` هم نصب کنیم. این فقط تنها کار پس از ساخت ما هست که در اینده پکیج های خود را روی خود داکر نصب میکنیم. در آخر از `pipend shell` استفاده کنید تا وارد محیط مجازی جدید شوید.

<div dir="ltr">

```shell
$ cd ...
$ mkdir book && cd book
$ pipenv install django~=3.1.0 psycopg2-binary==2.8.5
$ pipenv shell
```

</div>

اسم اولین پروژه رو `config` میزاریم. این قسمت یادتون نره، `.` اگر در آخر دستور باشد، جنگو پوشه ای را درست میکند که به آن نیاز نداریم. بعد از دستور`runserver` استفاده کنید تا پروژه لوکال جنگو را اجرا کنیم و از از صحت این که همه چیز درست کار میکند اطمینان حاصل کنید.

<div dir="ltr">

```shell
(books) $ django-admin startproject config .
(books) $ python manage.py runserver
```

</div>

داخل مرورگر خود وارد `http://127.0.0.1:8000` شوید و باید صفحه خوش آمد گویی جنگو را مشاهده کنید.

در محیط کامند لاین ممکن است اخطار هایی مثل " 18 unapplied migration(s) " را مشاهده کنید. برای الان اونا رو نادیده میگیریم. وقتش رسیده به داکر و `PostgreSQL` برگردیم.

### داکر

حال میتوانیم پروژه خود را به داکر منتقل کنیم.
در ادامه سرور محلی را با دستور `control + c` متوقف کنید و از محیط مجازی پروژه خارج شوید.
  
<div dir="ltr">
   
```shell
(books) $ exit
$
```

</div>
  
`Dockerfile` مثل قبل که توضیح دادیم میباشد.
  
<div dir="ltr">
   
```docker
# Pull base image
FROM python:3.8
# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
# Set work directory
WORKDIR /code
# Install dependencies
COPY Pipfile Pipfile.lock /code/
RUN pip install pipenv && pipenv install --system
# Copy project
COPY . /code/
```
</div>
 
  پیمانه های داکر، ذاتا موقتی هستند. یعنی تا زمانی وجود دارند که اجرا شده باشند و تمامی داده هایی که در خود جا داده اند با توقف پیمانه پاک میشوند.
  برای داده های مانا (داده هایی که میخواهیم دائمی باشند.)  در اینجا از `volume` استفاده میکنیم.
  
  دانستینم که در وب سرویس های آنلاین یک مخزن داریم که پروژه محلی ما را به پیمانه های در حال اجرا پیوند میدهد و بالعکس.
اما برای دیتابیس  `PostgreSQL` یک مخزن اختصاصی نداریم که داده هایمان را در آن دسته بندی کنیم. بنابراین با توقف پیمانه هر اطلاعاتی که در آن است از دست میرود. راه حل اضافه کردن یک `volume` برای دیتابیس میباشد. ما اینکار را در سرویس دیتابیس با مشخص کردن یک محل و هر `volume` که خارج از پیمانه قرار دارد انجام میدهیم.
  
  این توضیحات احتمالا کمی گیج کننده باشد و نیاز به توضیح بیشتری دارد که خارج از اهداف متمرکز این کتاب نیست.
فقط در همین حد بدانید که پیمانه های داکر داده های مانا را ذخیره نمیکنند، بنابراین هر چیزی مثل سورس کد و اطلاعات پایگاه داده ای که میخواهیم ماندگار باشد، بایستی یک `volume` اختصاصی داشته باشد در غیر این صورت هر زمان که پیمانه متوقف شود از دست میرود.
  
   در صورت تمایل میتوانید برای توضیحات فنی بیشتر [داکیومنت داکر درباره volume ها](https://docs.docker.com/storage/volumes/) و نحوه عملکرد آنها را مطالعه کنید.
  
  در هر صورت، این کد بروز شده ی برای docker-compose.yml هست که اکنون از
مخزن(volume) پایگاه داده هم پشتیبانی میکند.
  
<div dir="ltr">

```docker
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
  db:
    image: postgres:11
    volumes:
      - postgres_data:/var/lib/postgresql/data/
    environment:
      - "POSTGRES_HOST_AUTH_METHOD=trust"

volumes:
  postgres_data:
```
</div>
  
  ميتوانيم `image` را بسازیم و پیمانه هارا با یک دستور اجرا کنیم.
  
<div dir="ltr">
    Command Line
   
```shell
 $ docker-compose up -d --build
```
</div>
  
  اگر به خطایی مثل `Bindfor 0.0.0.0:8000 faild: port is already allocated` مواجه شدین بخاطر این است که پیمانه های داکر را که در  بخش دوم استفاده کردیم به طور کامل متوقف نکرده اید. دستور `docker-compose down` را در پوشه ای که احتمالا `postgresql` است و قبلا اجرا کرده اید امتحان کنید.
اگر این روش مجدد با خطا مواجه شد، میتوانید از اپ دسکتاپ داکر خارج شوید و دوباره برنامه را باز کنید.
  
 در مرورگر اکنون به آدرس http://127.0.0.1:8000/ رفته و صفحه را رفرش کنید. بایستی محتوای صفحه لود شده welcome page جنگو باشد، با این تفاوت که اکنون از داخل داکر اجرا میشود.
  

### PostgreSQL

 اگرچه از قبل `psycopg` را نصب کردیم و `PostgreSQl` در فایل `docker-compose.yml` موجود است، اما بایستی پروژه جنگو را طوری تنظیم کنیم که بجا دیتابیس پیش فرض `SQLite` به `PostgreSQL` واقع در داکر تغییر پیدا کند.
  
  طبق کد زیر را که مثل بخش قبلی کتاب است عمل کنید.

<div dir='ltr'>
  
```python
# config/settings.py
DATABASES = {
  'default': {
    'ENGINE': 'django.db.backends.postgresql',
    'NAME': 'postgres',
    'USER': 'postgres',
    'PASSWORD': 'postgres',
    'HOST': 'db',
    'PORT': 5432
  }
}  
```
</div>
  
مرورگر را برای صفحه اصلی رفرش کنید تا همه چیز به درستی کار کند.
  
### مدل یوزر سفارشی  

حال زمان آن است یک یوزر سفارشی که [داکیومنت رسمی جنگو بسیار بر آن تاکید دارد](https://docs.djangoproject.com/en/3.1/topics/auth/customizing/#using-a-custom-user-model-when-starting-a-project) ایجاد کنیم. چرا؟  چون شما احتیاج دارید بعضی از مواقع در یوزر پیش فرض پروژه خود تغییراتی بوجود بیاورید [باصطلاح آنرا سفارشی کنید]. 
اگر در اولین دستور migrate که اجرا کردید، یوزر سفارشی را نساخته اید و استارت نزدید باید بگویم سخت در اشتباهید ((: چون که `user` رابطه تنگاتنگی با سایر بخش های پروژه ی 
 جنگو دارد. سفارشی کردن یوزر در میانه مسیر پروژه چالش برانگیز است. (بهتر است در ابتدای استارت پروژه یوزر را سفارشی کنید.)
  
  
یک مسئله گیج کننده برای اکثر مردم این است که مدل یوزر سفارشی فقط در جنگو ۱.۵ اضافه شده است. تا قبل از آن روش پیشنهادی برای سفارشی کردن این بود که یک فیلد یک به یک [(OneToOneField)](https://docs.djangoproject.com/en/3.1/ref/models/fields/#django.db.models.OneToOneField) برای یوزر ایجاد میکردند که به آن اغلب مدل پروفایل میگفتند. 
معمولا این ساختار در پروژه های قدیمی قابل مشاهده است ولی امروزه استفاده از یوزر سفارشی یک روش فراگیرتر است.
  هر چند برای یوزر سفارشی هم مانند سایر موارد در  جنگو روش های پیاده سازی مختلفی وجود دارد: یا میتوان از [AbstractUser](https://docs.djangoproject.com/en/3.1/topics/auth/customizing/#django.contrib.auth.models.AbstractUser) که تمامی فیلد های مربوط به یوزر پیش فرض و سطح دسترسی ها را دارد استفاده کرد یا اینکه از [AbstractBaseUser](https://docs.djangoproject.com/en/3.1/topics/auth/customizing/#django.contrib.auth.models.AbstractBaseUser) که شامل موارد دقیق تر 
 و انعطاف پذیر تر است استفاده کنیم، اما بایستی بیشتر روی آن کار کنیم.(خلاصه اینکه دستمون برای تغییر دادن بازه)
ما در این کتاب `AbstractUser` را مبنا قرار میدهیم زیرا در صورت نیاز `AbstarctBaseUser` بعدا میتواند اضافه شود.
  
  
برای اضافه کردن یوزر سفارشی به پروژه خود چهار مرحله پیش رو داریم:
  
  - ساخت مدل `CustomUser`
  - بروز رسانی `config/setting.py`
  - سفارشی کردن `UserCreationForm` و `UserChangeForm`
  - اضافه کرد یوزر سفارشی ساخته شده به `admin.py`
  

ولین قدم ساخت مدل `CustomUser` در اپ مربوط به خودش میباشد. اسم این اپ را `accounts` میگذاریم. ساخت اپ را میتوان بصورت محلی در shell محیط مجازی انجام داد، به این صورت که به `pipenv shell` رفته و سپس دستور `python manage.py startapp accounts` را اجرا میکنیم. با این حال، برای ثبات کار ما اکثر دستورات خود را در داکر اجرا میکنیم.

<div dir='ltr'>

```shell
$ docker-compose exec web python manage.py startapp accounts
```
</div>
  
مدل جدیدی باسم `CustomUser` که از `AbstractUser` ارث بری میکند بسازید.
در واقع این به این معناست که ما در حال ایجاد یک نسخه [از Abstarct User] هستیم که مدل `CustomUser` تمام قابلیت های `AbstractUser` را ارث برده اما در صورت نیاز میتوانیم عملکرد های جدید را اضافه و یا نادیده بگیریم.
فعلا تغییری در مدل اعمال نمیکنیم بنابراین دستور pass را مینویسیم که جانشین کد های پیش رو در مدل میباشد.( مینویسیم تا فعلا ازمون خطا نگیره تا وقتی که خواستیم چیزی اضافه کنیم.)
  
<div dir='ltr'>

```python
# accounts/models.py
  
from django.contrib.auth.models import AbstractUser
from django.db import models
  
  
class CustomUser(AbstractUser):
  pass
```

</div>
  
حال به setting.py رفته و قسمت `INSTALLED_APPS` را با اضافه کردن اپ `accounts` بروزرسانی میکنیم.
همچنین تنظیمات `AUTH_USER_MODEL` را به انتهای فایل اضافه میکنیم تا اینکه در پروژه بجای استفاده از یوزر پیش فرض جنگو از یوزر سفارشی ما استفاده شود.
  
<div dir='ltr'>

```python
# config/settings.py
INSTALLED_APPS = [
  'django.contrib.admin',
  'django.contrib.auth',
  'django.contrib.contenttypes',
  'django.contrib.sessions',
  'django.contrib.messages',
  'django.contrib.staticfiles',
       
  # Local
       
   'accounts', # new
]
...
AUTH_USER_MODEL = 'accounts.CustomUser' # new
```

</div>
  
حال وقت ساختن فایل های `migration` برای تغییرات اخیر در متن پروژه است. میتوان اسم اپ `accounts` را در دستور `migration` بصورت دلخواه نوشت برای اینکه بگوییم این تغییرات 
مربوط به اپ نام برده شده است.
  
<div dir='ltr'>

```shell
$ docker-compose exec web python manage.py makemigrations accounts
Migrations for 'accounts':
  accounts/migrations/0001_initial.py
  - Create model CustomUser

```
  
</div>
  
سپس دستور `migrate` را برای مشخص کردن دیتابیس پروژه برای اولین بار ایجاد اجرا کنید.
  
<div dir='ltr'>

```shell
$ docker-compose exec web python manage.py migrate
```

</div>
  
### فرم سفارشی یوزر
یک یوزرمدل میتواند توسط ادمین جنگو ساخته و ویرایش شود. بنابراین نیاز است در فرم های پیش فرض به جای اشاره به `User` از `CustomUser` استفاده شود.

در ابتدا فایل `accounts/forms.py` با دستور زیر ساخته میشود.

<div dir="ltr">

`$ touch accounts/forms.py` 

</div>

در ویرایشگر خود قطعه کدهای زیر را برای استفاده از `CustomUser` وارد کنید.

<div dir="ltr">

```
# accounts/forms.py
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
class CustomUserCreationForm(UserCreationForm):
	class Meta:
		model = get_user_model()
		fields = ('email', 'username',)
class CustomUserChangeForm(UserChangeForm):
	class Meta:
		model = get_user_model()
		fields = ('email', 'username',)
```

</div>

در خط اول، مدل `CustomUser` را از طریق `get_user_model` ایمپورت میکنیم که در اصل  به پیکربندی `AUTH_USER_MODEL` ما در `settings.py` نگاه می‌کند.

استفاده از کتابخانه ها به صورت بالا به جای ایمپورت کردن و استفاده مستقیم از `CostumUser` ممکن است پیچیده تر به نظر برسد. دلیل استفاده از این ایده این است که به جای رفرنس دادن چندباره در سرتاسر پروژه به مدل سفارشی یوزر فقط یک رفرنس مرجع داشته باشیم.

در مرحله بعد، [UserCreationForm](https://docs.djangoproject.com/en/3.1/topics/auth/default/#django.contrib.auth.forms.UserCreationForm) و [UserChangeForm](https://docs.djangoproject.com/en/3.1/topics/auth/default/#django.contrib.auth.forms.UserChangeForm) را وارد می کنیم که هر دو گسترش خواهند یافت. 

سپس دو فرم جدید به نام های `CustomUserCreationForm` و `CustomUserChangeForm`  میسازیم. این 2 فرم گسترش یافته فرم پایه یوزری که در بالا ایمپورت  شد هستند و ما به طور خاص مدل یوزر سفارشی خاص خود را در آن ها جایگزین کرده و دو فیلد ایمیل و یوزرنیم را در آن ها نمایش میدهیم.فیلد پسوورد به صورت پیشفرض موجود است بنابراین نیاز به تعریف دوباره آن در این قسمت نیست.


### سرپرست کاربر سفارشی

در نهایت باید اطلاعات فایل `accounts/admin.py` را آپدیت کنیم.
این فایل محلی برای دستکاری داده های کاربری است و همانطور که می دانید ارتباط تنگاتنگی میان کاربر سیستم و ادمین وجود دارد.

ما `UserAdmin` موجود را به `CustomUserAdmin` گسترش می‌دهیم و به جنگو می‌گوییم که از فرم‌های جدید و مدل کاربر سفارشی استفاده کند و در نهایت یک لیست از ایمیل و نام کاربری یوزرها برای ما برگرداند.
در صورت تمایل، می‌توانیم فیلدهای [کاربری](https://docs.djangoproject.com/en/3.1/ref/contrib/auth/) موجود بیشتری مانند is_staff را به list_display اضافه کنیم.

<div dir="ltr">

```
# accounts/admin.py
from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm

CustomUser = get_user_model()

class CustomUserAdmin(UserAdmin):
	add_form = CustomUserCreationForm
	form = CustomUserChangeForm
	model = CustomUser
	list_display = ['email', 'username',]
	
admin.site.register(CustomUser, CustomUserAdmin)
```

</div>

گذاشتن . قبل از تابع ورودی باعث اضافه شدن مقدار بیشتری کد ورودی شده ولی از دردسرهای آتی جلوگیری می کند.


### ابر کاربر

یک راه خوب برای تأیید اینکه مدل کاربر سفارشی ما به درستی راه اندازی و اجرا می شود، ایجاد یک ابرکاربر است که از طریق آن بتوانیم به داشبورد ادمین دسترسی داشته باشیم.

با دستور زیر به طرز مخفی به `CustomUserCreationForm` دسترسی خواهیم داشت.

<div dir="ltr">

`$ docker-compose exec web python manage.py createsuperuser`

</div>

من در این پروژه از `wsv` به عنوان نام کاربری، از `will@learndjango.com` به عنوان ایمیل  و از `testpass123` به عنوان پسوورد استفاده کرده ام. شما میتوانید از مقادیر دلخواه برای ساخت ابرکاربر استفاده کنید.

حال با رجوع به آدرس `http://127.0.0.1:8000/admin` و تایید اطلاعات میتوانید به داشبورد ادمین وارد شوید.
در این قسمت شما باید نام ابرکاربر را در سمت راست بالای صفحه  مشاهده کنید.

	
![image](https://user-images.githubusercontent.com/52083195/139411409-013b28bf-9e91-4d1c-83ff-9dfe8660fbf9.png)


همچنین با رفتن به زبانه کاربران میتوانید ایمیل و شناسه ابرکاربر خود را مشاهده کنید.

	
![image](https://user-images.githubusercontent.com/52083195/139411382-fc0a35d6-76a1-4e7a-97b1-7368998218ad.png)


### تست

حال پس از اضافه شدن توابع جدید به پروژه موقع تست آن است. چه شما یک برنامه نویس انفرادی باشید و چه عضو یک تیم باشید، تست پروژه در هر حالتی یکی از قسمت های مهم پروژه است. در این باره جیکوب، بنیانگزار جنگو میگوید: " کد بدون تست، در هنگام طراحی شکسته است". به این معنی که این دو بدون هم بی معنا هستند.

دو نوع اصلی تست وجود دارد:

 - تست واحد که ساده، سریع و به صورت اختصاصی برای تست عملکرد یک قسمت از کد است
 - تست های یکپارچه که حجیم، با سرعت کم و برای تست کلی برنامه یا یکسری از عملکردهای خاص مانند پرداخت و ... است.

شما باید در هنگام نوشتن تست تعداد زیادی تست واحد و تعداد محدودی تست یکپارچه داشته باشید.

زبان برنامه نویسی پایتون شامل کتابخانه های زیادی برای [تست واحد](https://docs.python.org/3/library/unittest.html) است، همچنین جنگو نیز کتابخانه های زیادی برای [تست اتوماتیک](https://docs.djangoproject.com/en/3.1/topics/testing/) برنامه در اختیار شما قرار می دهد. بر این اساس بهانه ای برای ننوشتن تست های فراوان برای یک برنامه وجود ندارد و همانطور که گفته شد این تست ها در زمان شما برای دیباگ کردن برنامه صرفه جویی میکنند.

توجه داشته باشید که لازم نیست برای همه چیز در یک برنامه تست نوشته شود. برای مثال، برای همه توابع پیس ساخته جنگو در کد مرجع تست واحد وجود دارد و شما نیاز به دوباره نویسی تست ها ندارید. مثلا وقتی از مدل `User` استفاده میکنید نیاز به نوشتن تست نیست، ولی اگر به جای آن از مدل `CostumUser` استفاده کنید باید برای آن تست بنویسید.


### تست های واحد
برای نوشتن [تست واحد](https://docs.djangoproject.com/en/3.1/topics/testing/tools/#django.test.TestCase) در جنگو از اکستنشنی به نام [TestCase](https://docs.python.org/3/library/unittest.html#unittest.TestCase) استفاده میکنیم. در حال حاضر در اپلیکیشن ما فایلی به نام `test.py` وجود دارد که به صورت خودکار هنگام ایجاد برنامه با دستور `startapp` ساخته شد؛ این فایل در حال حاضر یک فایل خالی است و ما شروع به تغییر دادن آن میکنیم.

در این قسمت نام هر متد باید با test شروع شود تا بتواند به عنوان یک تست واحد در جنگو اجرا شود. این روش نام گذاری همچنین کمک میکند که شناسایی تست ها ساده تر باشد زیرا در جنگو حدود صدها و شاید هزاران متد وجود داشته باشد!

<div dir="ltr">

```
# accounts/tests.py
from django.contrib.auth import get_user_model
from django.test import TestCase
class CustomUserTests(TestCase):
	def test_create_user(self):
		User = get_user_model()
		user = User.objects.create_user(
			username='will',
			email='will@email.com',
			password='testpass123'
		)
		self.assertEqual(user.username, 'will')
		self.assertEqual(user.email, 'will@email.com')
		self.assertTrue(user.is_active)
		self.assertFalse(user.is_staff)
		self.assertFalse(user.is_superuser)
	def test_create_superuser(self):
		User = get_user_model()
		admin_user = User.objects.create_superuser(
			username='superadmin',
			email='superadmin@email.com',
			password='testpass123'
		)
		self.assertEqual(admin_user.username, 'superadmin')
		self.assertEqual(admin_user.email, 'superadmin@email.com')
		self.assertTrue(admin_user.is_active)
		self.assertTrue(admin_user.is_staff)
		self.assertTrue(admin_user.is_superuser)
```

</div>

در ابتدا هر دو کتابخانه `get_user_model` و `TestCase` را قبل از ایجاد کلاس `CustomUserTests` فراخوتنی میکنیم. در این کلاس دو تابع تست مختلف خواهیم داشت. `test_create_user` برای تایید کاربر جدید است، که در این تابع در ابتدا ما یک شی از مدل کاربر میسازیم و سپس با استفاده از متد `create_user` کاربری با دسترسی های مورد نیاز تعریف میکنیم.

برای تابع `test_create_superuser` نیز روند بالا را با یک تفاوت جزئی تکرار میکنیم. در اینجا برای ساخت کاربر از تابع [create_superuser](https://docs.djangoproject.com/en/3.1/ref/contrib/auth/#django.contrib.auth.models.UserManager.create_superuser) به جای تابع [create_user](https://docs.djangoproject.com/en/3.1/ref/contrib/auth/#django.contrib.auth.models.UserManager.create_user)  استفاده میشود. تفاوت این دو کاربر در این است که در ابرکاربر هر دو متغیر `is_staff` و `is_superuser` مقدار True میگیرند.

برای ران کردن تست ها با داکر میتوان از دستور `docker-compose exec` استفاده کرد. یا به طور سنتی میتوانیم فایل تست خود را با دستور `python manage.py test` اجرا کنیم.


<div dir="ltr">

```

Command Line
$ docker-compose exec web python manage.py test
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
..
---------------------------------------------------------------------
Ran 2 tests in 0.268s
OK
Destroying test database for alias 'default'...

```

</div>

زمانی که همه تست ها موفقیت آمیز باشند میتوانیم از این مرحله گذر کنیم.


### گیت

در این فصل کار های زیادی انجام دادیم که خوب است آنها ها را با ساخت یک مخزن گیت ثبت کنیم که شامل اضافه کردن تغییرات و ثبت آنها میباشد.

<div dir="ltr">

```shell
$ git init
$ git status
$ git add -A
$ git commit -m "ch3"
```

</div>

حالا با [پروژه اصلی این فصل داخل گیتهاب](https://github.com/wsvincent/djangoforprofessionals/tree/master/ch3-books) پروژه خود را مقایسه کنید.

### نتیجه گیری

پروژه کتاب فروشی ما هم اکنون با داکر و `PostgreSQL` در حال اجراست و یک مدل کاربر سفارشی راه اندازی کردیم. پروژه بعدی یک `pages` اپ خواهد بود برای صفحات استاتیک ما.

</div>
