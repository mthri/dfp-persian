<div dir='rtl'>

# فصل 13 :مجوز ها

در حال حاضر هیچ مجوزی برای پروژه کتابفروشی ما تعیین نشده است. هر کاربری می تواند بدون احراز هویت همه ی صفحات را ببیند و امکان انجام تمامی کار ها را داشته باشد. اگر چه آزاد بودن دسترسی ها برای نمونه سازی مناسب است اما باید مجوز ها ی لازم پیش از تبدیل سایت به محصول قرار داده شوند.

جنگو امکانات پیش ساخته ای را برای محدودسازی کاربرانی که به سیستم وارد نشده اند،قفل کردن صفحات و دسترسی افراد احراز هویت شده، گروه های خاص و یا کاربران با دسترسی های خاص فراهم می کند .

### فقط کاربران وارد شده (Logged in users only)

بطور جالبی چندین راه برای اضافه کردن مجوز های اساسی وجود دارد که محدود کردن دسترسی به کاربران وارد شده یکی از آن ها است. این کار را می توان از یک روش ساده و مستقیم با استفاده از تابع دکوریتور (Decorator) login_required و همچنین چون از class based view استفاده میکنیم با استفاده از LoginRequired mixin انجام داد .

ابتدا با محدود کردن دسترسی به صفحات کتاب و ارائه ی امکان دسترسی به کاربران وارد شده شروع می کنیم ، بدین منظور یک لینک در نوار بالایی صفحه وجود دارد . البته این شرایطی نیست که کاربر به طور تصادفی آدرس را پیدا کند (هر چند این امکان وجود دارد) به همین دلیل هم آدرس عمومی می باشد .

ابتدا LoginRequiredMixin را import می کنیم و پیش از ListView قرار می دهیم . در این حالت ابتدا وارد شدن کاربر به سیستم بررسی می شود و اگر کاربر وارد نشده باشد ListView بارگزاری نمی شود . بخش دیگر قرار دادن یک Url به منظور هدایت کاربر وارد نشده به آن است تا وارد سیستم شود . این Url به منظور ورود به سیستم است و چون ما از django-allauth استفاده می کنیم account-login نامیده می شود . اگر از سیستم سنتی احراز هویت جنگو استفاده می کردیم آنگاه این login نامیده میشد .

ساختار کلی برای BookDetailView نیز به صورت مشابه است و باید LoginRequiredMixin و یک آدرس Login را اضافه نماییم .

<div dir="ltr">

```python
# books/views.py
from django.contrib.auth.mixins import LoginRequiredMixin # new
from django.views.generic import ListView, DetailView
from .models import Book
class BookListView(LoginRequiredMixin, ListView): # new
model = Book
context_object_name = 'book_list'
template_name = 'books/book_list.html'
login_url = 'account_login' # new
class BookDetailView(LoginRequiredMixin, DetailView): # new
model = Book
context_object_name = 'book'
template_name = 'books/book_detail.html'
login_url = 'account_login' # new
```

</div>

حال اگر از سیستم خارج شده و برروی لینک Books کلیک کنید به صفحه ی ورود به سیستم هدایت می شود در حالی که اگروارد سیستم شده باشد با کلیک روی لینک فوق لیست کتاب ها نمایش داده می شوند . حتی اگر uuid یک کتاب را نیز بدانید و با وارد کردن آن سعی در دسترسی به اطلاعات یک کتاب بدون ورود به سیستم را داشته باشد مجددا به صفحه ورود هدایت خواهید شد .

### مجوز ها

جنگو از یک permission system پایه استفاده می کند که بوسیله ی پنل ادمین کنترل می شود . برای نشان دادن آن نیاز به ایجاد یک کاربر داریم . به homepage پنل ادمین رفته و بر روی "Add +" در کنار users کلیک کنید .

صفحه ی دوم به ما اجازه می دهد تا یک آدرسی ایمیل مناسب را به عنوان specialemail@yahoo.com قرار دهیم . ما از dajngo-allauth استفاده می کنیم بنابراین برای ورود، به email نیاز داریم اما چون پنل ادمین را شخصی سازی نکرده ایم سیستم برای ایجاد کاربر جدید به نام کاربری نیاز دارد .

اگر نخواهید از سیستم معمول کاربران استفاده کنید یعنی به جای AbstractUser از AbstarctBaseUser استفاده نمایید به فصل 3 برگردید ، در آن جا یک مدل User را به شکل شخصی سازی شده
(Customize) ایجاد کرده ایم .

با پایین تر آمدن در صفحه گزینه هایی برای تنظیم گروه ها به در کنار مجوز های کاربران وجود دارد . این لیستی از امکان های پیش فرضی می باشد که جنگو فراهم نموده است که اکنون از آن استفاده نمیکنیم زیرا در قسمت بعد مجوز های دلخواه برای کاربران را قرار خواهیم داد پس بر روی دکمه ی save در پایین گوشه ی سمت راست کلیک کنید .

### مجوز های دلخواه (custom permissions)

معمولا در پروژه های جنگو از custom permissions استفاده می شود که می توانیم آن ها را با استفاد از meta class بر روی مدل های دیتابیس تنظیم نماییم .

برای مثال بگذارید شرایط خاصی که در آن نویسده امکان خواندن همه ی کتاب ها را دارد را اضافه کنیم ، در واقع نویسنده ها به DetailView دسترسی خواهند داشت . می توانیم محدودیت های خیلی بیشتری را بر اساس کتاب ها اعمال کنیم ولی همین برای گام اول مناسب است .

در فایل books/models.py یک Meta class را اضافه می کنیم و persmission name و توضیحات را به گونه ای تنظیم می کنیم که در پنل ادمین قابل مشاهده باشد.

<div dir="ltr">

```python
# books/models.py
...
class Book(models.Model):
id = models.UUIDField(
primary_key=True,
default=uuid.uuid4,
editable=False)
title = models.CharField(max_length=200)
author = models.CharField(max_length=200)
price = models.DecimalField(max_digits=6, decimal_places=2)
cover = models.ImageField(upload_to='covers/', blank=True)
class Meta: # new
permissions = [
('special_status', 'Can read all books'),
]
def __str__(self):
return self.title
def get_absolute_url(self):
return reverse('book_detail', args=[str(self.id)])
...
```

</div>

ترتیب کلاس ها و متد های داخلی در این جا حساب شده است و از بخش ModelStyle در مستندات جنگو پیروی می کند .

چون در مدل خود تغییراتی ایجاد کردیم و آن را به روز نمودیم باید یک فایل migration ایجاد کرده و آن را اعمال کنیم .

<div dir="ltr">

```shell
$ docker-compose exec web python manage.py makemigrations books
$ docker-compose exec web python manage.py migrate
```

</div>

### مجوز های کاربر (User permissions)

حال نیاز داریم که این مجوز های دلخواه خود را بر کاربر جدید special@email.com خود اعمال کنیم . بخاطر وجود پنل ادمین انجام این کار چندان پیچیده نیست .

به قسمت users بروید که در آن جا سه کاربر : special@email.com , testuser@email.com , will@learndjango.com قرار دارند .

بر روی special@email.com کلیک کنید و به قسمت user permissions در انتهای صفحه بروید . به دنبال books | book | Can read all books بگردید و آن را انتخاب کنید .

بر روی فلش کلیک کنید تا تغییرات به کاربر مورد نظر اضافه شود و سپس بر روی دکمه ی save بزنید .

### PermissionRequiredMixin

گام نهایی برای اعمال مجوز ها استفاده از PermissionRequiredMixin می باشد . یکی از مزایای استفاده از class based views امکان پیاده سازی عملگر های پیشرفته با مقدار کد بسیار کم است که یکی از مثال های آن Mixin مورد استفاده است .

PermissionRequiredMixin را به لیست import در بالای صفحه اضافه کنید .
سپس آن را به DetailView بعد از LoginRequiredMixin و قبل از DetailView اضافه کنید . ترتیب قرار گرفتن مجوز ها باید منطقی باشد و نباید کاربری که به سیستم وارد شده است مجددا مورد بررسی قرار بگیرد . در نهایت یک فیلد permission required را اضافه کنید که مجوز دلخواه را مشخص می کند که در مورد ما اسم آن special status می باشد و در مدل books قرار دارد .

<div dir="ltr">

```python
# books/models.py
...
# books/views.py
from django.contrib.auth.mixins import (
LoginRequiredMixin,
PermissionRequiredMixin # new
)
from django.views.generic import ListView, DetailView
from .models import Book
class BookListView(LoginRequiredMixin, ListView):
model = Book
context_object_name = 'book_list'
template_name = 'books/book_list.html'
login_url = 'account_login'
class BookDetailView(
LoginRequiredMixin,
PermissionRequiredMixin, # new
DetailView):
model = Book
context_object_name = 'book'
template_name = 'books/book_detail.html'
login_url = 'account_login'
permission_required = 'books.special_status' # new
...
```

</div>

برای امتحان کردن کارمان از پنل ادمین خارج می شویم .این کار لازم است زیرا کاربری که برای ادمین ساخته می شود superuser است و به همه ی قسمت ها دسترسی دارد . با کاربر usertest@email.com وارد سایت کتاب فروشی می شویم وسپس به صفحه ی کتاب ها که لیست سه کتاب در دسترس وجود دارد می رویم . حال اگر برروی هریک از 3 کتاب کلیک کنیم با ارور 403 مواجه می شویم و دسترسی امکان پذیر نیست .

حال به صفحه ی نخست به آدرس http://127.0.0.1:8000/ باز می گردیم و سپس خارج می شویم . سپس با استفاده از حساب کاربری spacail@email.com وارد می شویم . به صفحات کتاب ها می رویم و همه ی صفحا کتاب ها در دسترس می باشند .

### Groups & UserPassesTestMixin

سومین مجوز ترکیبی UserPassesTestMixin می باشد که دسترسی به ویو را تنها برای کاربرانی که یک تست خاص را گذرانده اند محدود می کند . همچنین در پروژه های در بعد وسیع Groups که مسیر جنگو برای اعمال مجوز ها بر روی دسته بندی های مختلف کاربران می باشد نقش مهم و برجسته ای دارد . اگر به صفحه ی نخست ادمین نگاه کنیم یک قسمت اختصاصی Groups قرار دارد که میتوان آن را اضافه کرد و مجوز های مورد نظر را برایش تنظیم نمود . این روش بسیار موثر تر از اعمال مجوز ها برای هر کاربر به طور جداگانه می باشد .

به عنوان مثالی از گروه ها اگر یک قسمت premium در سایت خود داشته باشیم می توان با اضافه کردن کاربران خاص به عنوان کاربر premium چندین مجوز را شامل آن ها نمود .

### تست ها

خوب هست که هرگاه تغییراتی را درقسمتی از کد ایجاد می کنیم تست را اجرا نماییم . در واقع هدف از تست این است که تغییراتی که در کد ایجاد کردیم باعث بروز مشکل در قسمت دیگری از برنامه نشود .

<div dir="ltr">

```shell
$ docker-compose exec web python manage.py test
...
Ran 17 tests in 0.519s
FAILED (failures=2
```

</div>

این نشان می دهد که تعدادی تست رد شده داریم . به طور مشخص test_book_list_view و test_book_- detail_view کد موقعیت 302 برخورده اند که نشان دهنده ی تغییر مسیر است و در صورت عدم وجود مشکل کد موقعیت آن ها باید برابر 200 باشد .
علت این مشکل این است که login required به لیست ویو کتاب ها اضافه کرده ایم ولی برای دسترسی به جزئیات صفحه نیز کاربر به مجوز special_status نیازمند است . گام نخست وارد کردن permission با استفاده از توابع از پیش ساخته شده ی احراز هویت است . سپس داخل BookTests واقع در books/tests.py را به متد setUp اضافه کنید تا همه ی تست های ما امکان پذر باشد . test_book_list_view را به قسمت های جداگانه برای کاربران وارد شده و خارج شده تقسیم می کنیم . همچنین deayil veiew set را بروزرسانی می کنیم تا بررسی برای وجود مجوز صحیح برای هرکاربر نیز صورت گیرد .

<div dir="ltr">

```python
# books/models.py

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Permission # new
from django.test import Client, TestCase
from django.urls import reverse
from .models import Book, Review
class BookTests(TestCase):
def setUp(self):
self.user = get_user_model().objects.create_user(
username='reviewuser',
email='reviewuser@email.com',
password='testpass123'
)
self.special_permission = Permission.objects.get(
codename='special_status') # new
self.book = Book.objects.create(
title='Harry Potter',
author='JK Rowling',
price='25.00',
)
self.review = Review.objects.create(
book = self.book,
author = self.user,
review = 'An excellent review',
)
def test_book_listing(self):
...
def test_book_list_view_for_logged_in_user(self): # new
self.client.login(email='reviewuser@email.com', password='testpass123')
response = self.client.get(reverse('book_list'))
self.assertEqual(response.status_code, 200)
self.assertContains(response, 'Harry Potter')
self.assertTemplateUsed(response, 'books/book_list.html')
def test_book_list_view_for_logged_out_user(self): # new
self.client.logout()
response = self.client.get(reverse('book_list'))
self.assertEqual(response.status_code, 302)
self.assertRedirects(
response, '%s?next=/books/' % (reverse('account_login')))
response = self.client.get(
'%s?next=/books/' % (reverse('account_login')))
self.assertContains(response, 'Log In')
def test_book_detail_view_with_permissions(self): # new
self.client.login(email='reviewuser@email.com', password='testpass123')
self.user.user_permissions.add(self.special_permission)
response = self.client.get(self.book.get_absolute_url())
no_response = self.client.get('/books/12345/')
self.assertEqual(response.status_code, 200)
self.assertEqual(no_response.status_code, 404)
self.assertContains(response, 'Harry Potter')
self.assertContains(response, 'An excellent review')
self.assertTemplateUsed(response, 'books/book_detail.html'
...
```

</div>

اگر مجددا مجموعه ی تست ها را اجرا کنید باید همه ی تست ها بدون مشکل انجام شوند .

<div dir="ltr">

```shell
$ docker-compose exec web python manage.py test
...
Ran 18 tests in 0.944s
OK
```

</div>

### گیت

مطمئن شوید که یک commit جدید گیت برای تغییراتی که در این فصل انجام شد ایجاد کرده اید .


<div dir="ltr">

```shell
$ git status
$ git add .
$ git commit -m 'ch13'
```

</div>

مثل همیشه می توانید کد خود را با کد موجود در منبع رسمی در گیت هاب مقایسه کنید.

### جمع بندی

مجوز ها و گروه ها حوزه ی بسیار وسیعی است که می تواند از پروژه ای به پروژه ی دیگر تغییر کند هرچند اساس انجام کار ثابت است و مشابه آن چیزی است که اینجا انجام دادیم . اولین مجوز مربوط به محدود کردن دسترسی به کاربران وارد شده می باشد و همچنین می توان مجوز های دیگری را مرتبط با گروه ها و کاربران اضافه نمود . در فصل بعد امکان جست و جو را نیز به سایت کتاب فروشیمان اضافه خواهیم نمود .

</div>