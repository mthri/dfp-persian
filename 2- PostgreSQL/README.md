
<h1 dir="rtl">فصل دوم : PostgreSQL</h1>

<p dir="rtl">
یکی از تفاوت های اصلی بین یک اپلیکیشن ابتدایی و یک اپلیکیشن آماده به کار(production-ready) جنگو، در دیتابیس های آنان است.  
جنگو بدلیل راحت بودن، سریع بودن و file-based بودن SQLite، از این دیتابیس بصورت پیشفرض برای توسعه ی محلی (local development) بهره می برد و آن را به گزینه ی مناسبی تبدیل می کند. علاوه بر آن،این دیتابیس نیاز به هیچ گونه نصب و پیکربندی ندارد.
</p>

<p dir="rtl">
هرچند این دیتابیس معایب خاص خود را دارد. بطور کلی، SQLite دیتابیس مناسبی برای سایت های رده بالا و حرفه ای نیست. اما برای پیاده کردن ایده های اولیه این دیتابیس می تواند پاسخ گو باشد.بطور کلی SQLite بصورت خیلی کم و محدود برای پروژه های بزرگ مورد استفاده قرار می گیرد.
</p>

<p dir="rtl">
جنگو چهار دیتابیس را پشتیبانی می کند: SQLite, PostgreSQL, MySQL و Oracle.ما در این کتاب از PostgreSQL بدلیل معروف بودن آن استفاده خواهیم کرد. زیبایی Django ORM در آن است که اگر حتی از Oracle یا MySQL به جای PostgreSQL استفاده کنیم؛ تفاوتی در کد ما ایجاد نمی کند. Django ORM  کار ترجمه کد از زبان برنامه نویسی پایتون، به زبان دیتابیس ها را به راحتی مدیریت می کند و این بسیار شگفت انگیز است.
</p>

<p dir="rtl">
چالشی که این سه دیتابیس  برای ما ایجاد می کنند این است که اگر بخواهید یک production environment را بر روی کامپیوتر خود(local computer) ایجاد کنید؛ باید هر کدام از این دیتا بیس ها  را نصب  و بصورت محلی(local) آن ها را اجرا نمایید و ما دقیقا می خواهیم همین عمل را انجام دهیم. در حالی که جنگو جزییات سوییچ بین دیتابیس ها را مدیریت می کند اما زمانی که شما از SQLite برای توسعه ی محلی (local development) و از دیتابیسی دیگر برای محصول نهایی استفاده می کنید؛ممکن است به باگ های خیلی کوچک و اجتناب ناپذیر برخورد کنید که پیدا کردن و رفع آن ها ممکن است شما را به دردسر بیندازد. بنابراین استفاده از یک دیتابیس هم برای توسعه ی محلی و هم برای محصول نهایی راه حل بهتری است.
</p>

<p dir="rtl">
در این فصل ابتدا ما یک پروژه ی جنگو را با استفاده از دیتابیس SQLite توسعه می دهیم و سپس بر روی مباحث Docker و PostgreSQL  سوییچ می کنیم.
</p>

<h2 dir="rtl">شروع به کار</h2>
<p dir="rtl">
ابتدا با استفاده از command line بر روی پوشه ی code در desktop سوییچ کنید. شما این کار را می توانید با دو روش انجام دهید.یا با تایپ کردن    <code dir="ltr">cd ..</code> می توانید از  <code dir="ltr">Desktop/code/hello</code>به  <code>Desktop/code</code> هدایت شوید و  یا با تایپ 
 <code dir="ltr">cd ~/Desktop/code/</code>می توانید به آدرس مورد نظرتان هدایت شوید. سپس یک directory به اسم  <code dir="lt">postgresql</code> بسازید.

</p> 

**Command Line**
```bash
$ cd  ..
$ mkdir postgresql && cd postgresql
```
  
<p dir="rtl">
حالا جنگو را نصب کنید،   <code>shell</code>را راه اندازی کنید و یک پروژه ی کوچک به نام <code>postgresql_project</code> بسازید. یادتان باشد که <code>.</code>  را در آخر command وارد کنید 
</p>

**Command Line**
```bash
$ pipenv install django==2.2.7
$ pipenv shell
(postgresql) $ django-admin startproject postgresql_project .
```
<p dir="rtl">
 حالا می توانیم دیتابیس را <code>migrate</code> کنیم تا آن را راه اندازی نماییم و سپس با استفاده از ،<code>runserver</code> سرور محلی(local server) را راه اندازی کنیم.
</p>

<blockquote dir="rtl">
به طور کلی، من اجرای migrate را بر روی پروژه های جدید پیشنهاد نمی کنم؛ مگر این که مدل اختصاصی کاربر پیکربندی شده باشد. در غیر این صورت، جنگو، دیتابیس را به مدل داخلی کاربر  متصل می کند که در این حالت اصلاح و تغییر آن در ادامه ی این پروژه، کار دشوار و پیچیده ای خواهد بود. این مبحث را بصورت جزیی تر در فصل 3 بیان خواهیم کرد. چون قصد اصلی ما در این فصل صرفا پیاده سازی هدفمان می باشد؛ بنابراین استفاده از مدل پیش فرض کاربر یک استثنا می باشد.
</blockquote>
  
**Command Line**
```bash
(postgresql) $ python manage.py migrate
(postgresql) $ python manage.py runserver
```

<p dir="rtl">
اگر دستورات به درستی اجرا شوند، شما به آدرس http://127.0.0.1:8000/  در مرورگرتان هدایت می شوید.شاید نیاز باشد که شما حداقل یک بار صفحه را ریفرش کنید اما بعد از این کار، شما باید با صفحه ی خوش آمد گویی جنگو مواجه شوید.
</p>
  
<p dir="rtl">
سرور محلی  (local server) را با <code>control + c</code> متوقف کنید و سپس با دستور <code>ls</code> همه ی فایل ها و directory ها را لیست کنید.
</p>
 
**Command Line**
```bash
(postresql) $ ls
Pipfile     Pipfile.lock     db.sqlite3     manage.py     postgresql_project.
```
<h2 dir="rtl">Docker</h2>

<p dir="rtl">
برای سوییچ به داکر، ابتدا با تایپ  <code dir=”ltr”>exit</code>از محیط مجازی (virtual environment) خارج شده و سپس فایل هایی با اسم <code dir=”ltr”>Dockerfile</code> و <code dir=”ltr”> docker-compose.yml</code> ایجاد کنید. این فایل ها بترتیب، <code dir=”ltr>Docker image</code> و <code dir=”ltr”>container</code> را کنترل می کنند. 
</p>
 
**Command Line**
```bash
(postgresql) $ exit
$ touch Dockerfile
$ touch docker-compose.yml
```
<p dir="rtl">
<code dir=”ltr”>Dockerfile</code> زیر، همانند فایلی است که در فصل اول مورد استفاده قرار گرفته بود.       
</p>

**Dockerfile**
```docker
# Pull base image
FROM python:3.7

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

<p dir="rtl">
حالا image اولیه را با استفاده از دستور <code dir="ltr"> docker build .</code> ایجاد نمایید.
</p>

<p dir="rtl">
آیا متوجه شدید که <code dir="ltr">Dockerfile</code> این بار image را بسیار سریع تر ایجاد کرد؟ این اتفاق به این دلیل است که داکر در همان ابتدا، در کامپیوتر شما بصورت محلی به دنبال یک image خاص می گردد. اگر image مورد نظر را بصورت محلی پیدا نکرد؛سپس آن را دانلود می کند. چون بسیاری از این image ها از فصل قبل بر روی کامپیوتر بوده اند، بنابراین داکر نیازی نمی بیند که آن ها را دوباره دانلود نماید.  
</p>

<p dir="rtl">
حالا نوبت به فایل <code dir="ltr">docker-compose.yml</code> می رسد؛ که این فایل نیز همان فایلی است  در فصل اول مورد استفاده قرار گرفته بود.     
</p>

**docker-compose.yml**
```
version: '3.7'


services:
    web:
        build: .
        command: python /code/manage.py runserver 0.0.0.0:8000
        volumes:
            - .:/code
        ports:
            - 8000:8000			      
```

<h2 dir="rtl">حالت تفکیک شده (Detached Mode)</h2>

<p dir="rtl">
این بار container را با حالت تفکیک شده راه اندازی می کنیم؛ که در این حالت نیاز به یکی از دو فلگ (flag) <code dir="ltr">-d</code>  یا  <code dir="ltr">-detach</code>داریم. لازم بذکر است که این دو فلگ کار مشابه ای را انجام می دهند.

**command line**
```bash
$ docker-compose up -d
```

<p dir="rtl">
حالت تفکیک شده، <a href="https://docs.docker.com/compose/reference/up/">container</a> را در پس زمینه اجرا می کند. این بدان معنی است که ما می توانیم تنها از یک command line استفاده کنیم، بدون این که نیازی به command line دیگری باشد. این مهم باعث می شود که وقت ما بیهوده صرف سوییچ کردن بین command line ها نشود. از طرفی دیگر بدی این روش این است که اگر اروری بوجود آید؛ این ارور همیشه نمایش داده نمی شود. بنابراین اگر،در برخی موارد، صفحه ی نمایش کامپیوتر شما با این کتاب همخوانی نداشت؛ با تایپ کردن <code dir=”ltr”>docker-compose logs</code> خروجی فعلی را چاپ کنید و خطا ها و ارور های آن را برطرف نمایید. 
</p>

<p dir="rtl">
 به احتمای زیاد شما با پیام <code dir="ltr">Warning: Image for service web was built because it did not already exist</code> در زیر command مواجه خواهید شد. داکر بصورت اتوماتیک یک image درون container ساخته است. همانطور که در ادامه ی این کتاب خواهیم دید؛ اضافه کردن فلگ <code dir="ltr">--build</code> ، زمانی که پکیج های ترم افزار (software package) آپدیت هستند، لازم است. چرا که داکر، بصورت پیش فرض، بدنبال کپی حافظه ی محلی (local cached copy) نرم افزار می گردد و از آن برای ارتقا عملکرد استفاده می کند.
</p>

<p dir="rtl">
برای این که اطمینان پیدا کنیم که همه چیز بدرستی کار می کند به آدرس http://127.0.0.1:8000/ در  درون مرورگرتان برگردید؛ صفحه را ریفرش کنید تا دوباره با صفحه ی خوش آمد گویی جنگو مواجه شوید.
</p>
