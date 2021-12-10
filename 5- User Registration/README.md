
## فصل  پنجم : User Registeration

    
یک ویژگی مهم در وب سایت های پویا، بحث ثبت نام کاربران است. این مسئله در پروژه فروشگاه کتاب مورد نظر ما نیز وجود دارد. در این فصل به پیاده سازی موارد ورود به سایت، خروج از سایت و ثبت نام در سایت می پردازیم. از آنجایی که جنگو نماها و آدرس های اینترنتی لازم برای دو مورد ورود و خروج از سایت را در اختیار ما قرار می دهد، پیاده سازی دو مورد اول نسبتا راحت است اما پیاده سازی مورد ثبت نام به دلیل اینکه هیچ راه ل داخلی از پیش تعریف شده ای برای آن در جنگو وجود ندارد، چالش رانگیز است.

### Auth App
بیایید با پیاده سازی دو مورد ورود به سایت و خروج از سایت با استفاده از سیستم احراز هویت (auth app)جنگو شروع کنیم. جنگو، ویو ها و url های مهمی را دراختیارمان قرار میدهد و این یعنی ما فقط به یک template ای برای بروزرسانی کارهایی که میبایست انجام دهیم نیاز داریم. این کار زمان زیادی را برای ما به عنوان یک توسعه دهنده ذخیره کرده و تضمین میکند که مرتکب اشتباهی نمخواهیم شد. زیر کد اصلی قبلا توسط میلیونها توسعه دهنده مورد آزمایش و بهره برداری قرار گرفته است. 

### Auth App

Let’s begin by implementing log in and log out using Django’s own [auth](https://docs.djangoproject.com/en/3.1/topics/auth/default/) app. Django provides us
with the necessary views and urls which means we only need to update a template for things to
work. This saves us a lot of time as developers and it ensures that we don’t make a mistake since
the underlying code has already been tested and used by millions of developers.


However this simplicity comes at the cost of feeling “magical” to Django newcomers. We covered
some of these steps previously in my book, [Django for Beginners](https://djangoforbeginners.com/), but we did not slow down and
look at the underlying source code. The intention for a beginner was to broadly explain and
demonstrate “how” to implement user registration properly, but this came at the cost of truly
diving into “why” we used the code we did.


Since this is a more advanced book, we delve deeper to understand the underlying source code
better. The approach here can also be used to explore any other built-in Django functionality on
your own.

The first thing we need to do is make sure the `auth` app is included in our `INSTALLED_APPS` setting.
We have added our own apps here previously, but have you ever taken a close look at the built-in
apps Django adds automatically for us? Most likely the answer is no. Let’s do that now!


<div dir="ltr">

Code
```python
# config/settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth', # Yoohoo!!!!
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Local
    'accounts',
    'pages',
]
```

</div>


There are, in fact, 6 apps already there that Django provides for us which power the site. The
first is admin and the second is auth. This is how we know the auth app is already present in our
Django project.


When we earlier ran the migrate command for the first time all of these apps were linked
together in the initial database. And remember that we used the `AUTH_USER_MODEL` setting to
tell Django to use our custom user model, not the default User model here. This is why we had
to wait until that configuration was complete before running migrate for the first time.


### Auth URLs and Views

To use Django’s built-in auth app we must explicitly add it to our `config/urls.py` file. The easiest
approach is to use `accounts/` as the prefix since that is commonly used in the Django community.
Make the one line change below. Note that as our `urls.py` file grows in length, adding comments
for each type of URL–admin, user management, local apps, etc.–helps with readability.


<div dir="ltr">

Code
```python
# config/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Django admin
    path('admin/', admin.site.urls),
    
    # User management
    path('accounts/', include('django.contrib.auth.urls')), # new
    
    # Local apps
    path('', include('pages.urls')),
]
```

</div>

What’s included in the auth app? A lot it turns out. First off, there are a number of associated
urls.



<div dir="ltr">

Code
```python
accounts/login/ [name='login']
accounts/logout/ [name='logout']
accounts/password_change/ [name='password_change']
accounts/password_change/done/ [name='password_change_done']
accounts/password_reset/ [name='password_reset']
accounts/password_reset/done/ [name='password_reset_done']
accounts/reset/<uidb64>/<token>/ [name='password_reset_confirm']
accounts/reset/done/ [name='password_reset_complete']
```

</div>


How did I know that? Two ways. The first is the [official auth docs](https://docs.djangoproject.com/en/3.1/topics/auth/default/#module-django.contrib.auth.views)
tell us so! But a second, deeper
approach is to look at the Django source code which is [available on Github](https://github.com/django/django). 
If we navigate or
search around we’ll find our way to the [auth app itself](https://github.com/django/django/tree/b9cf764be62e77b4777b3a75ec256f6209a57671/django/contrib/auth). 
And within that we can find the `urls.py`
file [at this link](https://github.com/django/django/blob/b9cf764be62e77b4777b3a75ec256f6209a57671/django/contrib/auth/urls.py) which shows the complete source code.


It takes practice to understand the Django source code, but it is well worth the time

### Homepage

What’s next? Let’s update our existing homepage so that it will notify us if a user is already logged
in or not which currently can only happen via the admin.


Here is the new code for the `templates/home.html` file. It uses the Django templating engine’s
[if/else](https://docs.djangoproject.com/en/3.1/ref/templates/builtins/#if) tags for basic logic



<div dir="ltr">

Code
```html
<!-- templates/home.html -->
{% extends '_base.html' %}

{% block title %}Home{% endblock title %}

{% block content %}
  <h1>Homepage</h1>
  {% if user.is_authenticated %}
    Hi {{ user.email }}!
  {% else %}
    <p>You are not logged in</p>
    <a href="{% url 'login' %}">Log In</a>
  {% endif %}
{% endblock content %}
```

</div>

If the user is logged in (authenticated), we display a greeting that says “Hi” and includes their
email address. These are both [variables](https://docs.djangoproject.com/en/3.1/topics/templates/#variables) which we can use with Django’s template engine via
double opening {{ and closing }} brackets.

The default User contains numerous fields including 
[is_authenticated](https://docs.djangoproject.com/en/3.1/ref/contrib/auth/#django.contrib.auth.models.User.is_authenticated)
and [email](https://docs.djangoproject.com/en/3.1/ref/contrib/auth/#django.contrib.auth.models.User.email) which are
referenced here.

And the logout and login are URL names. The [url](https://docs.djangoproject.com/en/3.1/ref/templates/builtins/#url)
template tag means if we specify the URL
name the link will automatically refer to that URL path. For example, in the previous chapter we
set the name of our homepage URL to home so a link to the homepage would take the format of
`{% url 'home' %}`. More on this shortly.

If you look at the homepage now at http://127.0.0.1:8000/ it will likely show the email address
of your superuser account since we used it previously to log in.

![Homepage with greeting](images/1.png)

In the admin over at http://127.0.0.1:8000/admin/, if you click on the “Log out” button in the
upper right corner we can log out of the admin and by extension the Django project.


![Admin logout link](images/2.png)

Return to the homepage at http://127.0.0.1:8000/ and refresh the page.



### Django Source Code

You might have been able to piece together these steps on your own from reading [the official docs](https://docs.djangoproject.com/en/3.1/topics/auth/default/). 
But the deeper–and better–approach is to learn how to read the Django source code on
your own.

One question is, how was the `user` and its related variables magically available in our template?
The answer is that Django has a concept called the [template context](https://docs.djangoproject.com/en/3.1/topics/auth/default/#authentication-data-in-templates)
which means each template
is loaded with data from the corresponding `views.py` file. We can use user within template tags
to access User attributes. In other words, Django just gives this to us automatically.


So to check if a user is logged in or not, we access `user` and
then can use the boolean [is_authenticated](https://docs.djangoproject.com/en/3.1/ref/contrib/auth/#django.contrib.auth.models.User.is_authenticated)
attribute. If a user is logged in, it will return True and we can do things like display
the user’s email. Or if no user is logged in, the result will be False.


Moving on we have the URL name `login`. Where did that come from? The answer, of course, is
from Django itself! Let’s unpack the code snippet `{% url 'login' %}` piece by piece.


First up we’re using the [url template tag](https://docs.djangoproject.com/en/3.1/ref/templates/builtins/#url)
which takes as its first argument a [named URL pattern](https://docs.djangoproject.com/en/3.1/topics/http/urls/#naming-url-patterns).
That’s the optional name section we add as a best practice to all our URL paths. Therefore there
must be a `login` name attached to the URL used by Django for log ins, right!

There are two ways we could have known this. In other words, if I hadn’t just told you that we
wanted to use `{% url 'login' %}`, how could you have figured it out?

First look at the [official documentation](https://docs.djangoproject.com/en/3.1/). Personally I often use the search feature so I would have
typed in something like “login” and then clicked around until I found a description of log in. The
one we want is actually called [authentication views](https://docs.djangoproject.com/en/3.1/topics/auth/default/#module-django.contrib.auth.views)
and lists the corresponding URL patterns for us.


<div dir="ltr">

Code
```python
accounts/login/ [name='login']
accounts/logout/ [name='logout']
accounts/password_change/ [name='password_change']
accounts/password_change/done/ [name='password_change_done']
accounts/password_reset/ [name='password_reset']
accounts/password_reset/done/ [name='password_reset_done']
accounts/reset/<uidb64>/<token>/ [name='password_reset_confirm']
accounts/reset/done/ [name='password_reset_complete']
```

</div>

This tells us at the path accounts/login/ is where “login” is located and its name is 'login'. A
little confusing at first, but here is the info we need.

Going a step deeper to phase two, we can investigate the underlying Django source code to see
“logout” in action. If you perform a search [over on Github](https://github.com/django/django) you’ll eventually 
find the [auth app itself](https://github.com/django/django/tree/b9cf764be62e77b4777b3a75ec256f6209a57671/django/contrib/auth). 
Ok, now let’s start by investigating the `urls.py` file.
[Here is the link](https://github.com/django/django/blob/b9cf764be62e77b4777b3a75ec256f6209a57671/django/contrib/auth/urls.py) to the complete code:



<div dir="ltr">

Code
```python
# django/contrib/auth/urls.py
from django.contrib.auth import views
from django.urls import path

urlpatterns = [
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),

    path('password_change/', views.PasswordChangeView.as_view(),
        name='password_change'),
    path('password_change/done/', views.PasswordChangeDoneView.as_view(),
        name='password_change_done'),
    path('password_reset/', views.PasswordResetView.as_view(),
        name='password_reset'),
    path('password_reset/done/', views.PasswordResetDoneView.as_view(),
        name='password_reset_done'),
    path('reset/<uidb64>/<token>/', views.PasswordResetConfirmView.as_view(),
        name='password_reset_confirm'),
    path('reset/done/', views.PasswordResetCompleteView.as_view(),
        name='password_reset_complete'),
]
```

</div>




Here is the underlying code Django uses itself for the auth app. I hope you can see that the
“logout” route is not magic. It’s right there in plain sight, it uses the view LogoutView and has the
URL name 'logout'. Not magic at all! Just a little challenging to find the first time.

This three-step process is a great way to learn: either remember the Django shortcut, look it
up in the docs, or on occasion dive into the source code and truly understand where all this
goodness comes from.



### Log In
Back on our basic homepage, click on the “Log In” link and… it results in an error!


![Log in template not exist error](images/3.png)


Django is throwing a TemplateDoesNotExist error at us. Specifically, it seems to expect a log in
template at registration/login.html. In addition to Django telling us this, we can look in the
[documentation](https://docs.djangoproject.com/en/3.1/topics/auth/default/#all-authentication-views) and see that the desired `template_name` has that location .


But let’s really be sure and check the source code so we can remove any perceived magic here.
After all, it’s just Django.


Back in the [auth/views.py](https://github.com/django/django/blob/b9cf764be62e77b4777b3a75ec256f6209a57671/django/contrib/auth/views.py)
file we can see on line 47 for LoginView that the template_name is
'registration/login.html'. So if we wanted to change the default location we could, but it
would mean overriding LoginView which seems like overkill. Let’s just use what Django gives us
here.

Create a new `registration` folder within the existing templates directory and then add our
login.html file there, too.


<div dir="ltr">

Command Line
```shell
$ mkdir templates/registration
$ touch templates/registration/login.html
```

</div>

The actual code is as follows. We extend our base template, add a title, and then specify that we
want to use a form that will “post” or send the data.



<div dir="ltr">

Code
```html
<!-- templates/registration/login.html -->
{% extends '_base.html' %}

{% block title %}Log In{% endblock title %}

{% block content %}
  <h2>Log In</h2>
  <form method="post">
    {% csrf_token %}
    {{ form.as_p }}
    <button type="submit">Log In</button>
  </form>
{% endblock content %}

```

</div>


You should **always** add [CSRF protection](https://docs.djangoproject.com/en/3.1/ref/csrf/)
on any submittable form. Otherwise a malicious website
can change the link and attack the site and the user. Django has CSRF middleware to handle this
for us; all we need to do is add `{% csrf_token %}` tags at the start of the form.

Next we can control the look of the form contents. For now we’ll use [as_p()](https://docs.djangoproject.com/en/3.1/ref/forms/api/#as-p) so that each form
field is displayed within a paragraph p tag.

With that explanation out of the way, let’s check if our new template is working correctly. Refresh
the web page at http://127.0.0.1:8000/accounts/login/.


![Log in page](images/4.png)


And there is our page! Lovely. You can navigate back to the homepage and confirm that the “Log
In” link works, too, if you like. As a final step, go ahead and try to log in with your superuser
account on the log in page.


### Redirects

Did you notice I said “try” in that last sentence? If you click on the “Log In” link it brings up a
Page not found (404) error.


![Page not found error](images/5.png)

Django has redirected us to 127.0.0.1:8000/accounts/profile/ yet no such page exists. Now
why would Django do this? Well, if you think about it, how does Django know where we want to
redirect the user after log in? Maybe it’s the homepage. But maybe it’s a user profile page. Or any
number of options.


The final piece of the log in puzzle is to set the proper configuration for
[LOGIN_REDIRECT_URL](https://docs.djangoproject.com/en/3.1/ref/settings/#login-redirect-url)
because by default it redirects to `accounts/profile`.


Fortunately, this is a quick fix. We’ll send the user to our homepage. And since we specified a
URL name of home that’s all we need to redirect logged in users to the homepage.

At the bottom of the `config/settings.py` file add this one line.


<div dir="ltr">

Code
```python
# config/settings.py
LOGIN_REDIRECT_URL = 'home'
```

</div>

Attempt to log in again at http://127.0.0.1:8000/accounts/login/. Upon success it redirects
the user to the homepage greeting the superuser account you just logged in with!

![Homepage logged out](images/6.png)



### Log Out


Now let’s add a log out option to our homepage since only a superuser will have access to the
admin. How do we do this?


If you look at the `auth` views above we can see that logout uses LogoutView, which we could
explore in the source code, and has a URL name of logout. That means we can refer to it with a
template tag as just logout



But we can set this ourself, if desired, using [LOGOUT_REDIRECT_URL](https://docs.djangoproject.com/en/3.1/ref/settings/#logout-redirect-url)
which can be added to
the bottom of our `config/settings.py` file. Let’s do that so a logged out user is redirected to the
homepage


<div dir="ltr">

Code
```python
# config/settings.py
LOGIN_REDIRECT_URL = 'home'
LOGOUT_REDIRECT_URL = 'home' # new
```

</div>

Then add the logout link to `templates/home.html`.

<div dir="ltr">

Code
```html
<!-- templates/home.html -->
{% extends '_base.html' %}

{% block title %}Home{% endblock title %}

{% block content %}
  <h1>Homepage</h1>
  {% if user.is_authenticated %}
    Hi {{ user.email }}!
    <p><a href="{% url 'logout' %}">Log Out</a></p>
  {% else %}
    <p>You are not logged in</p>
    <a href="{% url 'login' %}">Log In</a>
  {% endif %}
{% endblock content %}
```

</div>



Refresh the homepage at http://127.0.0.1:8000/ and the “Log out” link is now visible.

![Homepage with logout link](images/7.png)

If you click on it you will be logged out and redirected to the homepage, which has the “Log In”
link visible.

![Homepage with login link](images/8.png)



### Sign Up


Implementing a sign up page for user registration is completely up to us. We’ll go through the
standard steps for any new page:

- create an app-level `accounts/urls.py` file
- update the project-level `config/urls.py` to point to the accounts app
- add a view called `SignupPageView`
- create a `signup.html` template
- update `home.html` to display the sign up page


A common question is: what’s the right order for implementing these steps? Honestly it doesn’t
matter since we need all of them for the sign up page to work properly. Generally, I like to start
with urls, then switch to views, and finally templates but it’s a matter of personal preference.


To start create a `urls.py` file within the accounts app. Up to this point it only contains our
CustomUser in the `models.py` file; we haven’t configured any routes or views.


<div dir="ltr">

Command Line
```shell
$ touch accounts/urls.py
```

</div>


The URL path for the sign up page will take a view called SignupPageView (which we’ll create
next), at the route signup/, and have a name of signup which we can later use to refer to the
page with a url template tag. The existing url names for login and signup are written within the
built-in Django app file `django/contrib/auth/urls.py` we saw above.




<div dir="ltr">

Code
```python
# accounts/urls.py
from django.urls import path
from .views import SignupPageView

urlpatterns = [
    path('signup/', SignupPageView.as_view(), name='signup'),
]
```

</div>



Next update the `config/urls.py` file to include the `accounts` app. We can create any route we
like but it’s common to use the same accounts/ one used by the default auth app. Note that it’s
important to include the path for `accounts.urls` below: URL paths are loaded top-to-bottom so
this ensures that any auth URL paths will be loaded first.


<div dir="ltr">

Code
```python
# config/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Django admin
    path('admin/', admin.site.urls),
    
    # User management
    path('accounts/', include('django.contrib.auth.urls')),
    
    # Local apps
    path('accounts/', include('accounts.urls')), # new
    path('', include('pages.urls')),
]
```

</div>

Now create the view SignupPageView. It references the CustomUserCreationForm and has a
`success_url` that points to the login page, meaning after the form is submitted the user will
be redirected there. The template_name will be `signup.html`.


<div dir="ltr">

Code
```python
# accounts/views.py
from django.urls import reverse_lazy
from django.views import generic
from .forms import CustomUserCreationForm


class SignupPageView(generic.CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'registration/signup.html'
]
```

</div>


As a final step create a file called signup.html file within the existing registration/ directory.


<div dir="ltr">

Command Line
```shell
$ touch templates/registration/signup.html
```

</div>

The code is basically identical to the log in page.



<div dir="ltr">

Code
```html
<!-- templates/registration/signup.html -->
{% extends '_base.html' %}

{% block title %}Sign Up{% endblock title %}

{% block content %}
<h2>Sign Up</h2>
  <form method="post">
    {% csrf_token %}
    {{ form.as_p }}
    <button type="submit">Sign Up</button>
  </form>
{% endblock content %}
```

</div>

As a final step we can add a line for “Sign Up” to our `home.html` template right below the link for
“Log In”. This is a one-line change.


<div dir="ltr">

Code
```html
<!-- templates/home.html -->
{% extends '_base.html' %}

{% block title %}Home{% endblock title %}

{% block content %}
  <h1>Homepage</h1>
  {% if user.is_authenticated %}
    Hi {{ user.email }}!
    <p><a href="{% url 'logout' %}">Log Out</a></p>
  {% else %}
    <p>You are not logged in</p>
    <a href="{% url 'login' %}">Log In</a>
    <a href="{% url 'signup' %}">Sign Up</a>
  {% endif %}
{% endblock content %}
```

</div>


All done! Reload the homepage to see our work.

![Homepage with Signup](images/9.png)

The “Sign Up” link will redirect us to http://127.0.0.1:8000/accounts/signup/.

![Signup page](images/10.png)



Create a new user with the email address `testuser@email.com`, username of testuser, and
testpass123 for the password. Upon submission it will redirect us to the Log In page. Log in
with the new account and it redirects to the homepage with a personalized greeting.

![Homepage with testuser greeting](images/11.png)

### Tests

For tests we do not need to test log in and log out features since those are built into Django and
already have tests. We do need to test our sign up functionality though!

Let’s start by creating a setUp method that loads our page. Then we’ll populate test_signup_template 
with tests for the status code, template used, and both included and excluded text
similarly to how we did it in the last chapter for the homepage.

In your text editor, update the `accounts/tests.py` file with these changes.



<div dir="ltr">

Code
```python
# accounts/tests.py
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse # new


class CustomUserTests(TestCase):
    ...
    
    
class SignupPageTests(TestCase): # new

    def setUp(self):
        url = reverse('signup')
        self.response = self.client.get(url)
    
    def test_signup_template(self): # new
        self.assertEqual(self.response.status_code, 200)
        self.assertTemplateUsed(self.response, 'registration/signup.html')
        self.assertContains(self.response, 'Sign Up')
        self.assertNotContains(
            self.response, 'Hi there! I should not be on the page.')
```

</div>

Then run our tests.

<div dir="ltr">

Command Line
```shell
$ docker-compose exec web python manage.py test
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
........
----------------------------------------------------------------------
Ran 8 tests in 0.329s

OK
Destroying test database for alias 'default'...
```

</div>

Next we can test that our CustomUserCreationForm is being used and that the page resolves to
SignupPageView.


<div dir="ltr">

Code
```python
# accounts/tests.py
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse,  resolve # new
from .forms import CustomUserCreationForm # new
from .views import SignupPageView # new


class CustomUserTests(TestCase):
    ...
    
    
class SignupPageTests(TestCase):

    def setUp(self):
        url = reverse('signup')
        self.response = self.client.get(url)
    
    def test_signup_template(self):
        self.assertEqual(self.response.status_code, 200)
        self.assertTemplateUsed(self.response, 'registration/signup.html')
        self.assertContains(self.response, 'Sign Up')
        self.assertNotContains(
            self.response, 'Hi there! I should not be on the page.')
            
    def test_signup_form(self): # new
        form = self.response.context.get('form')
        self.assertIsInstance(form, CustomUserCreationForm)
        self.assertContains(self.response, 'csrfmiddlewaretoken')
        
    def test_signup_view(self): # new
        view = resolve('/accounts/signup/')
        self.assertEqual(
            view.func.__name__,
            SignupPageView.as_view().__name__
        )
```

</div>

Run our tests again.


<div dir="ltr">

Command Line
```shell
$ docker-compose exec web python manage.py test
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
..........
----------------------------------------------------------------------
Ran 10 tests in 0.328s

OK
Destroying test database for alias 'default'...

```

</div>

All done.


### setUpTestData()

Django 1.8 introduced a [major update to TestCase](https://docs.djangoproject.com/en/3.1/releases/1.8/#testcase-data-setup)
that added the ability to run tests both within
a whole class and for each individual test. In particular,
[setUpTestData()](https://docs.djangoproject.com/en/3.1/topics/testing/tools/#django.test.TestCase.setUpTestData)
allows the creation of
initial data at the class level that can be applied to the entire TestCase. This results in much
faster tests than using setUp(), however, care must be taken not to modify any objects created
in setUpTestData() in your test methods.


We will use setUp() in this book, but be aware that if your test suite seems sluggish a potential
optimization to look into is using setUpTestData()


### Git

As ever make sure to save our work by adding changes into Git.


<div dir="ltr">

Command Line
```shell
$ git status
$ git add .
$ git commit -m 'ch5'
```

</div>


The official source code is [located on Github](https://github.com/wsvincent/djangoforprofessionals/tree/master/ch5-user-registration)
if you want to compare your code.



### Conclusion

Our Bookstore project is not the most beautiful site in the world, but it is very functional at
this point. In the next chapter we’ll configure our static assets and add Bootstrap for improved
styling.



</div>
