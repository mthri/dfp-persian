<div dir="rtl">

# داکر

با وجود تمامی پیشرفت ها در برنامه نویسی مدرن، پیکربندی اصولی یک محیط توسعه محلی همچنان یک چالش بزرگ است. در یک پروژه فاکتورهای متعددی از قبیل کامپیوتر های مختلف، سیستم عامل های مختلف، نسخه های گوناگون جنگو، موارد مختلفی از یک محیط مجازی و غیره وجود دارد. اما چالش زمانی بزرگتر میشود که باید در یک محیط تیمی کار کنیم که همه افراد به پیکربندی یکسانی [از محیط توسعه] نیاز دارند.

راه حلی بنام **داکر** در سالهای اخیر پدیدار شده است. اگر چه عمری از پیدایش آن نمیگذرد، اما بسرعت تبدیل به گزینه ی اصلی برای توسعه دهندگانی شد که در سطح تولید کار میکنند. سرانجام، با استفاده از داکر میتوان یک محیط توسعه ی محلی قابل اعتماد و منسجمی بوجود آورد که از ورژن مدنظر پایتون و نصب جنگو گرفته تا سرویس های مازادی در کنار آنها نظیر پایگاه داده ها را شامل میشود. این به این معناست که دیگر مهم نیست شما از چه سیستم عاملی (مک، لینوکس، ویندوز) استفاده میکنید، چراکه همه چیز در خود داکر در حال اجراست. همچنین داکر همکاری در محیط های تیمی را رفته رفته آسان تر میکند. آن زمان که از فایل های طولانی و قدیمی README برای افزودن یه محیط توسعه جدید در پروژه های گروهی استفاده میکردیم دیگر گذشته است. در عوض داکر این امکان را میدهد که به سادگی دو فایل Dockerfile و docker-compose.yml را به اشتراک بگذارید و توسعه دهنده میتواند اطمینان داشته باشد که محیط توسعه محلی او همانند سایر اعضای تیم است.

داکر یک فناوری کامل نیست و نسبتا نوپا است که زیر ساخت های آن در حال توسعه هستند. اما میتوان این نوید را داد که یک محیط توسعه سازگار و قابل اشتراک است که قادر است بصورت محلی روی هر رایانه یا سروری اجرا شود که همین موضوع آن را به انتخابی مناسب تبدیل میکند. در این فصل، کمی بیشتر درباره داکر و داکراسیون کردن (dockerize) اولین پروژه جنگو می آموزیم.

پ.ن: داکراسیون: پیکربندی داکر متناسب با پروژه و همگام سازی آنها با یکدیگر

### داکر چیست؟

داکر ابزاری است که سیستم عامل نصبی روی سیستم شما را بوسیله پیمانه های لینوکسی از سایر اجزا مجزا میکند. این روشی برای مجازی سازی میباشد.

پ.ن: قبل از آشنایی با پیمانه ها(containers)، ابتدا باید مفهوم image را درک کنیم.

ریشه مجازی سازی به ابتدای علوم کامیوتر برمیگردد، زمانی که ابر کامپیوتر ها رایج بودند. این سوال بوجود آمد که "چند برنامه نویس چگونه میتوانند از یک رایانه بطور همزمان استفاده کنند؟" پاسخ، مجازی سازی بود؛ بالاخص ماشین های مجازی که نسخه کاملی از کامپیوتر ها به همراه سیستم عامل آنها بود.

اگر شما یک فضای ابری در سرویس های ارائه دهنده مثل آمازون تهیه کنید، این چنین نیست که یک سخت افزار اختصاصی به شما ارائه دهند. در عوض شما هستید که یک سرور فیزیکی را با سایر مشتریان به اشتراک میگذارید. اما چونکه مشتریان ماشین های مجازی خود را روی سرور آمازون اجرا میکنند، بنظر میرسد هرکس برای خودش یک سرور اختصاصی دارد. این فناوری امکان افزودن یا حذف سرور از فضای ابری را ممکن میسازد. این فناوری تا حدی بسیار زیادی توسط نرم افزار ها پشتیبانی میشوند و سخت افزار ها بطور کامل در این تغییرات دخیل نیستند.

و اما! نقطه ضعف ماشین های مجازی چیست؟ اندازه و سرعت دو تا از چالش های هستند. یک سیستم عامل معمولی به راحتی میتواند ۷۰۰ مگابایت حجم داشته باشد. بنابراین اگر یک سرور فیزیکی از سه ماشین مجازی (۳×۷۰۰) پشتیبانی کند، ۲.۱ گیگابایت از فضای دیسک بعلاوه ی نیاز های سی پی یو . منابع حافظه اشغال میشود.

خوب راه حل چیست؟ از داکر استفاده کنید. ایده اصلی این است که اکثر رایانه ها از یک سیستم عامل لینوکس استفاده میکنند. حال اگر مجازی سازی را از لایه های بالایی لینوکس شروع کنیم چه میشود؟ (منظور این است که از هسته اصلی لینوکس شروع نکنیم) آیا حجم کمتر و سرعت بیشتری ارائه نمیشود. راه حلی برای تکرار عملکرد های مشابه در پروژه است؟ پاسخ بله است. راه حل این چالش ها پیمانه های لینوکسی هستند که در سالهای اخیر بسیار محبوب شده اند. برای برنامه نویس ها بویژه وب اپلیکیشن ها (همچون جنگو) ماشین های مجازی و پیمانه های لینوکسی منابعی بیش از آنچه که نیاز است ارائه میدهند. این اساسا همان چیزی است که داکر ارائه میدهد: راهی برای پیاده سازی پیمانه های لینوکسی.

بهترین تشبیهی که میتوانیم اینجا بکار ببریم، محله و آپارتمان هستند. فرض کنید ماشین مجازی همان محله است. در هر محله ساختمان های مجزا از هم با زیر ساخت های خاص خود وجود دارد. از جمله لوله کشی، سیستم گرمایش، حمام و آشپزخانه. پیمانه های ماشین مجازی همان ساختمان ها هستند که در لوله کشی و سیستم گرمایش مشترک هستند، اما ظرفیت هر کدام از این بخش ها در ساختمان های مختلف بسته به نیاز مالک ساختمان و تعداد خانوار ها متفاوت است.

### پیمانه ها (containers) در مقایسه با محیط های مجازی

شما بایستی از قبل بعنوان یک برنامه نویس پایتون با مفهوم محیط های مجازی که راهی برای ایزوله کردن پکیج های پایتونی هستند آشنا باشید. جا داره از این محیط مجازی یه تشکری کنیم (: با وجود محیط مجازی در یک کامپیوتر میتوانیم بصورت محلی چند پروژه را اجرا کنیم. مثلا: فرض کنید یک پروژه از پایتون نسخه ۳.۴ و جنگو ۱.۱۱ استفاده میکند، در حالی که پروژه دیگر از پایتون ۳.۸ و جنگو ۳.۱ بهره گرفته است. با ایجاد یک محیط مجازی اختصاصی برای هر یک از این دو پروژه میتوان پکیج های متفاوت را در حین آلوده نکردن سیستم کامپیوتری [که بخاطر نصب نسخه های مختلف از یک پکیج ایجاد میشوند] مدیریت کرد.

در حال حاضر، چند ابزار محبوب برای پیاده سازی محیط مجازی وجود دارد:

- `venv`
- `pipenv`
- `virtualenv`

اما اساسا همه اینها یک کار انجام میدهند.
مهم ترین فرق بین محیط های مجازی و داکر این است که، محیط های مجازی فقط میتوانند از پکیج های پایتونی پشتیبانی کنند. مثلا قابلیت نصب برنامه هایی که پایتونی نیستند (مثل PostgreSQL یا MySQL) ندارند. چرا که این برنامه ها بایستی در سیستم اصلی کامپیوتر شما بصورت محلی نصب باشند. به بیانی دیگر، محیط های مجازی فقط و فقط به اشاره به پایتون و هر آنچه که از جنس پایتون است دارد و خود به تنهایی شامل این موارد نیست.

پیمانه های لینوکسی یک قدم فرا تر رفته، نه فقط بخش های مربوط به پایتون را بلکه کل سیستم عامل و هر چیزی که در آن نصب است را تفکیک میکند. مثلا هم میتوان پایتون و موارد مربوط به نوع دیتا بیس [از قبیل MySQL] را در داکر نصب و اجرا کنیم.

داکر به خودی خود موضوعی پیچیده است و ما در این کتاب عمیقا آن را برسی نمیکنیم. درک مفاهیم اولیه و نکات کلیدی آن مهم است. اگر میخواهید در این باره بیشتر بدانید، توصیه میکنم سری به [Dive into Docker video course](https://diveintodocker.com/ref-dfp) بزنید (:

### نصب داکر

خوب خوب، دیگه تئوریجات کافیه. بیاد که داکر و جنگو را در کنار هم استفاده کنیم. قدم اول ثبت نام در سایت [داکر هاب](https://hub.docker.com/signup) و نصب نسخه ی دسکتاپ داکر بر روی سیستم است.

از طریق این لینک ها میتوانید داکر را نصب کنید:

- [داکر برای مک](https://docs.docker.com/desktop/mac/install/)
- [داکر برای لینوکس](https://docs.docker.com/desktop/windows/install/)
- [داکر برای ویندوز](https://docs.docker.com/engine/install/)

از آنجایی که فایل نصبی حجیم است، دانلود ممکن است کمی طول بکشد. در این مرحله با خیال راحت دراز بکشین (:
لازم به ذکر است داکر در نسخه لینوکس از یوزر root استفاده میکند که این موضوع اغلب ایده آل نیست. در صورت تمایل میتوانید داکر را طوری تنظیم کنید که به عنوان یوزر غیر root اجرا شود.

وقتی که داکر نصب شد با اجرای دستور docker --version در cmd میتوانیم ورژن در حال اجرای داکر را تایید کنیم. ورژن داکر حداقل باید ۱۸ باشد.

<div dir="ltr">

```shell
$ docker --version
# Docker version 19.03.12, build 48a66213f
```

</div>

بعضی اوقات داکر از یک ابزار جانبی به اسم [Docker Compose](https://docs.docker.com/compose/) برای کمک به اجرای خودکار دستورات استفاده میشود.
Docker Compose را برای مک و ویندوز میتوانید دانلود کنید اما اگر از لینوکس استفاده میکنید، بایستی به صورت دستی آنرا نصب کنید. این کار را میتوانید با اجرای دستور `sudo pip install docker-compose` پس اینکه نصب داکر تمام شد انجام دهید.

#### Hello World

داکر یک image مخصوص خود به اسم "Hello, World" دارد که به عنوان اولین اجرا میتواند مفید باشد. در cmd، `docker run hello-world` را اجرا کنید. این دستور image رسمی داکر را دانلود و سپس در قالب یک پیمانه اجرا میکند. درباره image و container (پیمانه) جلوتر صحبت میکنیم (:

<div dir="ltr">

```shell
$ docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
1b930d010525: Pull complete
Digest: sha256:b8ba256769a0ac28dd126d584e0a2011cd2877f3f76e093a7ae560f2a5301c00
Status: Downloaded newer image for hello-world:latest
Hello from Docker!
This message shows that your installation appears to be working correctly.
To generate this message, Docker took the following steps:
1. The Docker client contacted the Docker daemon.
2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
(amd64)
3. The Docker daemon created a new container from that image which runs the
executable that produces the output you are currently reading.
4. The Docker daemon streamed that output to the Docker client, which sent it
to your terminal.
To try something more ambitious, you can run an Ubuntu container with:
$ docker run -it ubuntu bash
Share images, automate workflows, and more with a free Docker ID:
https://hub.docker.com/
For more examples and ideas, visit:
https://docs.docker.com/get-started/
```

</div>

دستور `docker info` به ما این امکان را میدهد تا به آنچه که در داکر هست سرک بکشیم. این دستور خروجی های زیادی را نمایش میدهد اما خطوط اول که نشان میدهد ما یک container متوقف شده و یک image داریم برایمان حائز اهمیت است.

<div dir="ltr">

```shell
$ docker info
Client:
Debug Mode: false
Server:
Containers: 1
Running: 0
Paused: 0
Stopped: 1
Images: 1
...
```

</div>

تمامی این خطوط نشان میدهد داکر با موفقیت نصب شده و در حال اجراست.

### جنگو Hello World

هم اکنون یه پروژه جنگو به اسم `Hello World` درست میکنیم که روی سیستم شما اجرا میشود و آن را به داکر منتقل میکنیم و میبینیم که چطور همه چیز با هم درست کار میکند.

اولین قدم انتخاب یه مکان برای قرار دادن کد ها میباشد. این قسمت میتواند هر قسمتی از سیستم شما باشد. اما اگر از مک استفاده میکنید، راه ساده آن استفاده از Desktop میباشد. از طریق کامند لاین وارد `Desktop` شوید و یک پوشه به اسم `code` بسازید. تمام مثال ها و پروژه های داخل این پوشه قرار داده میشود.

<div dir="ltr">

```shell
$ cd Desktop
$ mkdir code && cd code
```

</div>

برای این مثال یک پوشه اسم `hello` درست کنید و با استفاده از `pipenv` جنگو را نصب کنید که دو فایل `Pipfile` و `Pipfile.lock` میسازد. با دستور `pipenv shell` محیط مجازی را فعال کنید

<div dir="ltr">

```shell
$ mkdir hello && cd hello
$ pipenv install django=3.1.0
$ pipenv shell
(hello) $
```

</div>

با استفاده از دستور `startproject` یک پروژه جنگو به اسم `config` درست میکنیم. `.` در آخر دستور یک قسمت اختیاری میباشد که بیشتر توسعه دهندگان جنگو استفاده میکنند. قرار نگرفتن آن، چند فایل اضافه درست میکند که با استفاده از آن این فایل ها صاخته نمیشوند.

با استفاده از دستور `migrate` دیتابیس و را میسازیم و پروژه را با `runserver` اجرا میکنیم.

<div dir="ltr">

```shell
(hello) $ django-admin startproject config .
(hello) $ python3 manage.py migrate
(hello) $ python3 manage.py runserver
```

</div>

با در نظر گرفتن این که همه چیز درست کار میکند، وارد `http://127.0.0.1:8000` با یک مرورگر شوید و صفحه خوش آمد گویی جنگو را مشاهده کنید.

### ایمیج ها، پیمانه ها و میزبانی داکر

یک ایمیج داکر محتوای فوری یک پروژه میباشد. ایمیج های داکر با فایلی به نام `Dockerfile` اجرا میشوند که شامل دستور عمل های یک ایمیج میباشد. یک پیمانه به عنوان مثال ه ایمیج داکر اجرا میشود. به مثال آپارتمان بر میگردیم، ایمیج یک طرح یا مجموعه ای از طرح های آپارتمان است. پیمانه هم ساختمان واقعی و کاملا ساخته شده است.

سومین مفهموم، میزبانی داکر است که سیستم عاملی اساسی است. حتی ممکن هست شما چند پیمانه توسط میزبان داکر اجرا کنید.  وقتی میخواهیم توسط داکر کد بزنیم یا روندی را انجام دهیم، یعنی آنها توسط میزبانی داکر اجرا میشوند.

اولین `Dockerfile` خودمون رو میسازیم و این عملیات رو مشاهده می کنیم.

<div dir="ltr">

```shell
$ touch Dockerfile
```

</div>

حالا کد های زیر رو بهش اضافه کنید تا درباره آنها خط به خط صحبت کنیم.

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

همچنین `Dockerfile` از بالا به پایین وقتی ایمیج ساخته میشود خوانده میشوند. اولین قسمت باید دستور `FROM` باشد تا ایمیج اصلی را برای ایمیج ما فراخوانی کند. این بار، `Python 3.8`.

سپس از دستور `ENV` برای تعریف دو محیط استفاده میکنیم.

- `PYTHONUNBUFFERED` اطمینان می دهد که خروجی کنسول ما آشنا به نظر می رسد و توسط داکر بافر نمی شود ،
که ما نمی خواهیم.
- `PYTHONDONTWRITEBYTECODE` به این معنی که پایتون سعی نمی کند فایل های .pyc بنویسد که ما نیز انجام می دهیم
میل ندارد.

مرحله بعد استفاده از `WORKDIR` برای تنظیم مسیر پیش فرض فهرست کار در ایمیج خود به نام `code` که کد است استفاده می کنیم
جایی که ما کد خود را ذخیره می کنیم اگر این کار را نکردیم ، هر بار می خواستیم دستورات را اجرا کنیم
پیمانه ها باید در مسیری طولانی تایپ کنیم. در عوض، داکر فرض میکند که ما میخواهیم تمام دستورات را داخل پوشه اجرا کنیم.

برای وابستگی ها، از `Pipenv` استفاده میکنیم. پس دو فایل `Pipfile` و `Pipfile.lock` را داخل پوشه `code` داخل داکر کپی میکنیم.

ارزش داره که توضیح بدیم که چرا `Pipenv` فایل `Pipfile.lock` را درست میکند.  مفهمون فایل های `lock` هنوز یونیک نیست داخل پایتون و `Pipenv`. در واقع در پکیج منیجر ها قابل مشاهده است برای زبان های محبوب. مثل `Gemfile.lock` رو روبی، `yarn.lock` در جاوا اسکریپت، `composer.lock` در php و غیره. `Pipenv` اولین و محبوب ترین پروژه ای بود که این ها را داخل پایتون قرار داد.

مزایای فایل `lock` این هست که منجر به نصب کامل میشوند. مهم نیست چند بار پکیج را نصب میکنید، همیشه نتیجه یکسان خواهد بود. بدون این فایل ها وابستگی ها و ترتیب ها اینطور نیست. اعضای تیمی که لیست یکسانی از بسته های نرم افزاری را نصب می کنند ممکن است ساختار کمی متفاوت داشته باشند.

وقتی که از داکر استفاده میکنیم، چه در سیستم شخصی و چه در جای دیگه، و بروزسانی بسته های نرم افزاری، احتمال درگیری `Pipfile.lock` بوجود می آید. در فصل بعد این موضوع را بررسی میکنیم.

Moving along we use the RUN command to first install Pipenv and then pipenv install to install
the software packages listed in our Pipfile.lock, currently just Django. It’s important to add the
--system flag as well since by default Pipenv will look for a virtual environment in which to install
any package, but since we’re within Docker now, technically there isn’t any virtual environment.
In a way, the Docker container is our virtual environment and more. So we must use the --system
flag to ensure our packages are available throughout all of Docker for us.
As the final step we copy over the rest of our local code into the /code/ directory within Docker.
Why do we copy local code over twice, first the Pipfile and Pipfile.lock and then the rest?
The reason is that images are created based on instructions top-down so we want things that
change often–like our local code–to be last. That way we only have to regenerate that part of the
image when a change happens, not reinstall everything each time there is a change. And since
the software packages contained in our Pipfile and Pipfile.lock change infrequently, it makes
sense to copy them over and install them earlier.
Our image instructions are now done so let’s build the image using the command docker build
. The period, ., indicates the current directory is where to execute the command. There will be
a lot of output here; I’ve only included the first two lines and the last three.

<div dir="ltr">

```shell
$ docker build .
Sending build context to Docker daemon
Step 1/7 : FROM python:3.8
3.8: Pulling from library/python
...
Successfully built 8d85b5d5f5f6
```

</div>

نیاز هست یک فایل به اسم `docker-compose.yml` ساخته شود تا کنترل روی اجرای پیمانه انجام شود که روی بر پایه ایمیج `Dockerfile` هست.

<div dir="ltr">

```shell
$ touch docker-compose.yml
```

</div>

فایل ما شامل کد های زیر میشود.

<div dir="ltr">

```yml
version: '3.8'

services:
    web:
        build: .
        command: python /code/manage.py runserver 0.0.0.0:8000
        volumes:
        - .:/code
        ports:
        - 8000:8000
```

</div>

در خط بالا ما ورژن داکر را مشخص میکنیم که در حال حاضر 3.8 میباشد. با ورژن حال پایتون که 3.8 هست اشتباه نگیرید. کاملا تصادفی است!

سپس اطلاعات پیمانه را مشخص میکنیم که در داکر هاست اجرا میشود. امکان اجرای چند پیمانه نیز وجود دارد اما ولی فعلا یک پیمانه را توضیح میدهیم. مشخص میکنیم که پیمانه چطور ساخته. به پوشه فعلی `.` نگاه کن برای `Dockerfile`.بعد داهل پیمانه وب سرور را اجرا کن.

The volumes mount automatically syncs the Docker filesystem with our local computer’s
filesystem. This means that we don’t have to rebuild the image each time we change a single
file!
Lastly, we specify the ports to expose within Docker which will be 8000, which is the Django
default.
If this is your first time using Docker, it is highly likely you are confused right now. But don’t
worry. We’ll create multiple Docker images and containers over the course of this book and with
practice the flow will start to make more sense. You’ll see we use very similar Dockerfile and
docker-compose.yml files in each of our projects.
The final step is to run our Docker container using the command docker-compose up. This
command will result in another long stream of output code on the command line.

<div dir="ltr">

```shell
$ docker-compose up
Creating network "hello_default" with the default driver
Building web
Step 1/7 : FROM python:3.8
...
Creating hello_web_1 ... done
Attaching to hello_web_1
web_1 | Watching for file changes with StatReloader
web_1 | Performing system checks...
web_1 |
web_1 | System check identified no issues (0 silenced).
web_1 | August 03, 2020 - 19:28:08
web_1 | Django version 3.1, using settings 'config.settings'
web_1 | Starting development server at http://0.0.0.0:8000/
web_1 | Quit the server with CONTROL-C.
```

</div>

برای صحت این که کار میکند داخل مرورگر وارد `127.0.0.1:8000` شوید، صفحه را رفرش کنید و صفحه `Hello, World` باید نشان داده شود. جنگو هم اکنون با داکر اجرا میشود. ما در یک محیط مجازی کار نمیکنیم. ما حتی دستور `runserver` را هم اجرا نکردیم. تمام کار های پروژه روی یک وب سرور مستقل داکر اجرا میشود. موفقیت!

برای متوقف کردن پیمانه، دنترل و سی را هم زمان بفشارید و دستور `docker-composer down` را اجرا کنید. پیمانه های داکر حجم زیادی از مموری را میگیرد، پس ایده خوبی هست که آنها را متوقف کنیم. آنها بی تابعیت هستند و به همین هست که ما از `volumes` برای کپی کردن کد ها روی محیطی که میتوان استفاده کرد، استفاده کردیم.

<div dir="ltr">

```shell
$ docker-compose down
Removing hello_web_1 ... done
Removing network hello_default
```

</div>

### گیت

گیت یک سیستم کنترل ورژن امروزی هست که در این کتاب استفاده میکنیم. در ابتدا یه فایل گیت با `git init` میسازیم، تغییرات را مشاهده میکنیم و وقتی آنها را ثبت میکنیم.

<div dir="ltr">

```shell
$ git init
$ git status
$ git add .
$ git commit -m "ch1"
```

</div>

حالا با [پروژه اصلی این فصل داخل گیتهاب](https://github.com/wsvincent/djangoforprofessionals/tree/master/ch3-books) پروژه خود را مقایسه کنید.

### نتیجه گیری

داکر یه محیط کاملا مستقل شامل تمام چیزایی هست که ما برای توسعه لوکال نیاز داریم. وب سرویس، دیتابیس و حتی بیشتر. الگو کلی یک پروژه جنگو یکسان میباشد.

- ساخت محیط مجازی و نصب جنگو
- ساخت پروژه
- خروج از محیط مجازی
- نوشتن `Dockerfile` و ساخت ایمیج
- ساخت `docker-compose.yml` و اجرا با دستور `docker-compose up`

ما چند پروژه جنگو با داکر باز میسازیم. پس این جریان منطقی تر به نظر میرسد. در فصل بعد یک پروژه جنگو با داکر و PostgreSQL در یک پیمانه جدا به عنوان دیتابیس میسازیم.