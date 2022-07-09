# فصل  چهارم : Pages App

بیاید یک صفحه ی اصلی برای پروژه ی جدید ایجاد کنیم.  برای الان این صفحه یک صفحه ی استاتیک خواهد بود به این معنی که با پایگاه داده به هیچ عنوان در ارتباط نیست. بعدا این صفحه یک صفحه ی دینامیک خواهد شد که کتاب های فروشی را نمایش خواهد داد. 



استفاده از چندین صفحه ی استاتیک امری رایج  است ، مثل صفحه ی درباره ی ما، پس بیاید صفحات اختصاصی مربوط به هر کدام را ایجاد کنیم .

در خط فرمان از دستور startapp استفاده کنید تا یک app جدید به نام pages ایجاد کنیم.

#####                                                                                                                                                                                                                                                                                                                    Command Line                                                                                             

```tex
$ docker-compose exec web python manage.py startapp pages 
```

بعد این app جدید را باید در فایل settings.py در قسمت INSTALLED_APPS اضافه کنید. همچنین در قسمت TEMPLATES در همین فایل، قسمت DIRS را به روز رسانی کنید. 



#####                                                                                                                                                                                                                                                                                                                                                          Code    

------

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
    'accounts',
    'pages', # new
    
]
TEMPLATES = [
    {
       ...
       'DIRS': [str(BASE_DIR.joinpath('templates'))], # new
       ...
    }    
]
```

------

توجه کنید که به روز رسانی تنظیمات مربوط به DIRS به این معنی است که ، Django از این به بعد این پوشه را هم دنبال خواهد کرد و همچنین برای پیدا کردن templates در هر app نیز خواهد گشت.

------

## Templates

حالا باید پوشه ی templates را ایجاد کنیم و دو فایل   base.html_ و home.html  را در ان قرار دهیم. اولین فایل ما که فایل base.html _ می باشد ، فایلی است که بقیه فایل های html از ان اطلاعات را به ارث می برند و فایل home.html صفحه ی اصلی سایت ما خواهد بود.



##### Command Line

------

```tex
$ mkdir templates
$ touch templates/_base.html
$ touch templates/home.html
```

------

چرا ما فایل base.html_ را با علامت _ نمایش دادیم به جای اینکه base.html نام گذاری کنیم؟  این یک امر انتخابیه ، بیشتر برنامه نویس ها برای نام گذاری فایل هایی که به اصطلاح فایل مادر هستند و قرار نیست اطلاعات ان ها نمایش داده شوند از این شیوه استفاده می کنند.

------

در فایل base، ما کد های پایه ای را قرار دادیم و tag block را برای عنوان و محتوا در نظر گرفته ایم.  block  tag ها به عنوان یک option به تگ ها اضافه می شوند که از دوباره نویسی جلوگیری می کنند. به عنوان مثال، تگی که از block استفاده می کند، محتوای ان خیلی راحت تر به روز رسانی می شود.



چرا ما از اسم content برای محتوای اصلی پروژه ی خود استفاده میکنیم؟ این اسم، هر اسمی می تواند باشد مثل main یا هر اسم مرتبط دیگری، اما استفاده از نام content در دنیای django رایج تر می باشد. آیا می توان از نام دیگه ای استفاده کرد؟ قطعا بله. آیا استفاده از نام content رایج تر می باشد؟ بله.



##### code

------

```html
<!-- templates/_base.html -->
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>{% block title %}Bookstore{% endblock title %}</title>
</head>
<body>
<div class="container">
{% block content %}
{% endblock content %}
</div>
</body>
</html>
```

------

برای الان در صفحه ی اصلی، خیلی ساده کلمه ی "Homepage" را می بینیم. 



##### code

------

```django
<!-- templates/home.html -->
{% extends '_base.html' %}
{% block title %}Home{% endblock title %}
{% block content %}
<h1>Homepage</h1>
{% endblock content %}

```

------

## URLs and Views



هر صفحه ی وب در پروژه های django  نیاز به دو فایل urls.py و views.py را دارند. برای مقدماتی مهم نمی باشد که به چه ترتیبی عمل بشود، در اینجا ما نیاز به 3 فایل یا گاهی اوقات به 4 فایل، ( models.py برای پایگاه داده) داریم. به طور کلی من ترجیح می دهم که با urls شروع کنم و روی این فایل کار کنم، اما هیچ وقت یه راه مستقیم برای کار روی این فایل ها و ارتباط دهی به ان ها وجود ندارد.

بیاید با فایل urls.py شروع کنیم برای آدرس دهی مناسب به صفحات سایتمان در app pages. زمانیکه ما در پروژه ای بر روی صفحه ی اصلی کار میکنیم ، نیاز نیست که هیچ چیزی را به url نسبت بدهیم و ان را در یک ' ' قرار می دهیم. ما همچنین در خط دوم include را وارد کرده ایم. 



##### Code

------



```python
# config/urls.py
from django.contrib import admin
from django.urls import path, include # new
urlpatterns = [
path('admin/', admin.site.urls),
path('', include('pages.urls')), # new
]

```



------

بعد از این باید فایل urls.py را در app pages ایجاد کنیم . 

##### Command Line

------



```tex
$ touch pages/urls.py

```



------

این فایل HomePageView را وارد خواهد کرد و آدرس را داخل یک رشته ی خالی' ' تنظیم می کند. توجه داشته باشید که پیشنهاد می شود ان را به این فرم وارد کنید:  'home' . 



##### Code

------



```python
# pages/urls.py
from django.urls import path
from .views import HomePageView
urlpatterns = [
path('', HomePageView.as_view(), name='home'),
]
```



------

در آخر به فایل views.py احتیاج داریم. ما می توانیم خیلی راحت با استفاده از تابع درون ساز [TemplateView](https://docs.djangoproject.com/en/3.1/ref/class-based-views/base/#django.views.generic.base.TemplateView)، فقط با مشخص کردن template_name  مشخص، که در اینجا home.html می باشد اطلاعات را در صفحه ی اصلی نمایش دهیم. 

##### Code

------



```python
# pages/views.py
from django.views.generic import TemplateView
class HomePageView(TemplateView):
template_name = 'home.html'
```

------

ما تقریبا تمام مراحل  را انجام دادیم . اگر شما به صفحه ی اصلی  رجوع کنید به خطا بر خواهید خورد . اما چرا این اتفاق افتاد؟ زمانیکه شمابا یک خطا مواجه می شوید  باید در خط فرمان با استفاده از دستور logs ، آن را بررسی کنید. 

پس دستور docker-compose logs را تایپ کنید که با این عبارت مواجه می شوید :   no module named pages.urls .   اتفاقی  که افتاده این است که : django به طور اتوماتیک، نمی تواند فایل settings.py را به روز رسانی کند. برای اینکه فایل settings.py به روزرسانی شود باید از دستور زیر استفاده کرد. 



##### Command Line

------

```tex
$ dcker-compose down
$ docker-compose up -d
```



------

صفحه را به روزرسانی کنید مشکل حل خواهد شد.



![](C:\Users\Amirhossein\Dropbox\My PC (DESKTOP-3EMHR35)\Desktop\1.png)

# Tests

الان زمانه تست است. برای صفحه ی اصلی ما می توانیم از [SimpleTestCase](https://docs.djangoproject.com/en/3.1/topics/testing/tools/#simpletestcase) خود Django استفاده کنیم که یک حالت خاص از Testcase می باشد که طراحی شده است برای تست مواردی که با پایگاه داده در ارتباط نمی باشند. 

تست ها در ابتدا غافلگیر کننده هستند اما به سرعت خسته کننده می شوند . شما از ساختار ها و تکنیک های مشابه بارها و بارها استفاده خواهید کرد. در editor خود قسمت pages/tests.py  را به روز رسانی کنید. ما ابتدا با تست template شروع می کنیم.

------



```python
# pages/tests.py
from django.test import SimpleTestCase
from django.urls import reverse

class HomepageTests(SimpleTestCase):
	def test_homepage_status_code(self):
		response = self.client.get('/')
		self.assertEqual(response.status_code, 200)
	def test_homepage_url_name(self):
		response = self.client.get(reverse('home'))
		self.assertEqual(response.status_code, 200)
```

------

در بالا ما ابتدا SimpleTestCase و همچنین [reverse](https://docs.djangoproject.com/en/3.1/ref/urlresolvers/#reverse)  را  که برای تست URLs ها استفاده می شود، وارد کرده ایم. بعد از آن یک کلاس به نام HomepageTests ایجاد کردیم که از simpleTestCase انشعاب گرفته  و همچنین در داخل آن متد هایی برای هرتست نوشته شده است.

توجه کنید که ما در ابتدای هر آرگومان، self را وارد کرده ایم. که یک [python convention](https://docs.python.org/3/tutorial/classes.html#random-remarks) می باشد.

بهترین روش این است که نام های تست های خود را به نحوی انتخاب کنید که توصیف کننده ی درستی از تست های شما باشد اما توجه کنید که هر متد باید شروع به تست شود فقط با خود تست django.

دو تست موجود در اینجا هردو وضعیت کد HTTP برای صفحه ی اصلی را که باید برابر 200 باشد (صفحه موجود است) را چک می کنند. این دو متد چیزی در رابطه با محتوای صفحه به ما نخواهند گفت. برای test_homepageview_status_code ما یک متغیر به نام response را ایجاد کردیم که به صفحه ی اصلی (/) دسترسی دارد و با استفاده از [assertEqual](https://docs.python.org/3/library/unittest.html#unittest.TestCase.assertEqual) پایتون وضعیت کد را با 200 مقایسه کرده ایم.

الگوریتم مشابهی را برای test_homepage_url_name استفاده می کنیم با این تفاوت که از reverse برای صدا زدن صفحه ی اصلی یا همان home استفاده می کنیم. . توجه داشته باشید که روشی که از reverse استفاده می کنیم بهترین روش می باشد. حتی اگر بعدا نام صفحه ی اصلی را تغییر بدهیم دوباره می توانیم به صفحه ی اصلی با نام جدید دسترسی داشته باشیم.

برای اجرای تست ها در خط فرمان کد زیر را وارد کنید .

##### Command Line

------

```tex
$ docker-compose exec web python manage.py test
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
..
----------------------------------------------------------------------
Ran 4 tests in 0.277s
OK
Destroying test database for alias 'default'...

```

------

چرا پیغام 4 تست اجرا شد نمایش داده شد در حالی که ما 2 تست ایجاد کردیم؟ به خاطر اینکه ما کل تست های موجود در پروژه را با این دستور تست کرده ایم و در فصل قبل تحت فایل users/tests.py ما دو تست را برای custom user model ایجاد کرده بودیم. اگر شما می خواهید تست های موجود در app pages را فقط تست کنید باید اسم pages  را در آخر دستور docker-compose exec web python manage.py test pages اضافه کنید.



# Testing Templates

تاکنون ما وجود صفحه ی اصلی را تست کرده ایم، اما باید تست کنیم که صفحه ی اصلی از قالب درستی استفاده می کند. SimpleTestCase از روشی به نام [assertTemplatedUsed](https://docs.djangoproject.com/en/3.1/topics/testing/tools/#django.test.SimpleTestCase.assertTemplateUsed) استفاده میکند فقط برای همین منظور. پس بیاید از این روش استفاده کنیم.

##### 

Code

------

```python
# pages/tests.py
from django.test import SimpleTestCase
from django.urls import reverse

class HomepageTests(SimpleTestCase):
	def test_homepage_status_code(self):
	    response = self.client.get('/')
		  self.assertEqual(response.status_code, 200)
    
  def test_homepage_url_name(self):
      response = self.client.get(reverse('home'))
      self.assertEqual(response.status_code, 200)
    
  def test_homepage_template(self): # new
	    response = self.client.get('/')
	    self.assertTemplateUsed(response, 'home.html')
```

------

ما دوباره متغیر response را ایجاد کردیم و همین طور وجود قالب home.html را که استفاده کرده ایم چک کردیم. تست را دوباره اجرا کنید.



##### Command Line

------

```tex
$ docker-compose exec web python manage.py test pages
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
...
----------------------------------------------------------------------
Ran 3 tests in 0.023s
OK
Destroying test database for alias 'default'...

```

------

توجه  کردید که این بار خط فرمان پیغام متفاوتی را نشان می دهد؟ ما اسم pages را به انتهای کد اضافه کردیم پس فقط تست های موجود در همین App اجرا خواهند شد . در پروژه های کوچک تر مشکلی نیست که کل تست ها را اجرا کنید اما در پروژه های بزرگ تر، بهتر است که هر تست را در همان App تست کنید. این باعث سریع تر شدن کار خواهد شد.

# Testing HTML

برای این قسمت بیاید تست کنیم که صفحه ی اصلی از HTML درستی استفاده می کند و همچنین تست کنیم که محتویات HTML نادرست در صفحه ی اصلی وجود نداشته باشد. خوب  است که همیشه تست هایی که انتظار داریم قبول بشوند و ان هایی که قرار است رد بشوند را با هم تست کنیم.

Code

------

```python
# pages/tests.py
from django.test import SimpleTestCase
from django.urls import reverse, resolve
from .views import HomePageView

class HomepageTests(SimpleTestCase):
    def test_homepage_status_code(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        
    def test_homepage_url_name(self):
        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)
        
    def test_homepage_template(self):
        response = self.client.get('/')
        self.assertTemplateUsed(response, 'home.html')
        
    def test_homepage_contains_correct_html(self): # new
        response = self.client.get('/')
        self.assertContains(response, 'Homepage')
        
    def test_homepage_does_not_contain_incorrect_html(self): 			# new
					response = self.client.get('/')
        self.assertNotContains(
        response, 'Hi there! I should not be on the page.')
```

------

تست را دوباره اجرا کنید.

##### Command Line

------

```tex
$ docker-compose exec web python manage.py test
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
.....
----------------------------------------------------------------------
Ran 7 tests in 0.279s
OK
Destroying test database for alias 'default'...

```

------

# setUp Method



توجه کرده اید که در قسمت تست ها ما داریم یک قسمت را بارها و بارها تکرار می کنیم؟  برای هر تست ما داریم متغیر response را هر دفعه ایجاد می کنیم . به نظر کار بیهوده و مستعد خطا است این روش. بهتر است که روشی را پیدا کنیم که هر دفعه کدی را تکرار نکنیم.



از انجایی که تست های واحد از بالا به پایین اجرا می شوند، می توانیم یک متد setup اضافه کنیم که قبل اجرای تست ها اجرا خواهد شد. قبل از هر تست self.response را در صفحه  اصلی اجرا خواهد کرد. بنابراین نیازی نیست که متغیر response را برای هر تست ایجاد کنیم. و همچنین به این معنی است که دیگر می توانیم test_homepage_url_name را حذف کنیم به خاطر اینکه برای هر تست، ان را با استفاده از reverse صدا خواهیم کرد. 

##### code

------

```python
# pages/tests.py
from django.test import SimpleTestCase
from django.urls import reverse

class HomepageTests(SimpleTestCase): # new
    
    def setUp(self):
        url = reverse('home')
        self.response = self.client.get(url)
        
    def test_homepage_status_code(self):
    	self.assertEqual(self.response.status_code, 200)
        
		def test_homepage_template(self):
      self.assertTemplateUsed(self.response, 'home.html')
    
    def test_homepage_contains_correct_html(self):
    	self.assertContains(self.response, 'Homepage')
        
		def test_homepage_does_not_contain_incorrect_html(self):
        self.assertNotContains(
        self.response, 'Hi there! I should not be on the 		page.')      

```

------

الان تست را دوباره اجرا کنید. به خاطر اینکه setUp یک روش کمکی است در پایان تست اجرا نخواهد شد. بنابراین در پایان 4 تست با موفقیت اجرا خواهد شد.

##### Command Line

------

```tex
$ docker-compose exec web python manage.py test pages
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
....
----------------------------------------------------------------------
Ran 4 tests in 0.278s
OK
Destroying test database for alias 'default'...

```

------

# Resolve

اخرین تستی که می توانیم انجام بدهیم این است که مطمئن شویم homepageviwe در مسیر درستی قرار دارد. 

Django برای این کار ابزار مخصوصی به نام [resolve](https://docs.djangoproject.com/en/3.1/ref/urlresolvers/#resolve) دارد که می خواهیم از ان استفاده کنیم. ما نیاز داریم علاوه بر homepageview ، resolve را هم در بالای کد وارد کنیم. تست، Test_homepage_resolves_homepageview،  بررسی می کند که نام view 

ای که متد resolve استفاده می کند برابر HomePageView خواهد بود.

##### Code

------

```python
# pages/tests.py
from django.test import SimpleTestCase
from django.urls import reverse, resolve # new
from .views import HomePageView # new

class HomepageTests(SimpleTestCase):
    def setUp(self):
        url = reverse('home')
        self.response = self.client.get(url)
    
    def test_homepage_status_code(self):
        self.assertEqual(self.response.status_code, 200)
    
    def test_homepage_template(self):
        self.assertTemplateUsed(self.response, 'home.html')
    
    def test_homepage_contains_correct_html(self):
        self.assertContains(self.response, 'Homepage')
    
    def test_homepage_does_not_contain_incorrect_html(self):
        self.assertNotContains(
        self.response, 'Hi there! I should not be on the page.')
    
    def test_homepage_url_resolves_homepageview(self): # new
        view = resolve('/')
        self.assertEqual(
        view.func.__name__,
        HomePageView.as_view().__name__
        )

```

------

بسیار عالی . این اخرین تست ما خواهد بود. بیاید ان را اجرا کنیم.

##### Command Line

------

```tex
$ docker-compose exec web python manage.py test
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
.....
----------------------------------------------------------------------
Ran 7 tests in 0.282s
OK
Destroying test database for alias 'default'...
```

------



# Git

الان زمانی است که باید تغییرات را به git اضافه کنیم. 



##### Command Line

------

```tex
$ git status
$ git add .
$ git commit -m 'ch4'
```

------

شما می توانید کد خود را با کد اصلی در [اینجا](https://github.com/wsvincent/djangoforprofessionals/tree/master/ch4-pages) مقایسه کنید. 



# خلاصه

ما قالب های خود را پیکر بندی کرده ایم و صفحه ی اصلی را به پروژه ی خود اضافه کردیم. ما همچنین برای هر یکی از موارد یک تست ایجاد کرده ایم که شامل کارهایی است که در این فصل انجام دادیم. بعضی از توسعه دهندگان ترجیح می دهند از روشی استفاده کنند که Test_Driven نامیده می شود که به صورتی است که ابتدا همه ی کد ها نوشته می شود بعد تست ها نوشته می شوند. من ترجیح می دهم که هر قسمتی که نوشته شد تست همان هم نوشته شود و تست شود. در پروژه هایی که سنگین هستند تقریبا محال است به خاطر سپردن تمامی مراحل. همچنین در یک کار تیمی که چندین نفر بر روی یک پروژه کار می کنند ، مشکل است که فهمید چه کدی و توسط چه کسی بعدا با خطا مواجه شده است.



در فصل بد ما ثبت نام کاربر را پوشش خواهیم داد: login, logout, sign up
