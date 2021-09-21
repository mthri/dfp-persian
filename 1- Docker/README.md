<!DOCTYPE html>
<html lang="fa">
<head>

</head>
<body>
 <div dir="rtl" >
  
 <i> 
 <h1>
  فصل یک: داکر
 </h1>
 </i> 
  
 <p>
با وجود تمامی پیشرفت ها در برنامه نویسی مدرن، پیکربندی اصولی یک محیط توسعه محلی همچنان
 یک چالش بزرگ است. در یک پروژه فاکتورهای متعددی از قبیل کامپیوتر های مختلف، سیستم عامل های مختلف، نسخه های گوناگون جنگو، موارد مختلفی از یک محیط مجازی و غیره وجود دارد. اما چالش زمانی بزرگتر میشود که باید در یک محیط تیمی کار کنیم که همه افراد به پیکربندی یکسانی [از محیط توسعه] نیاز دارند.
 </p>
  
 <p>
راه حلی بنام <b>'داکر'</b> در سالهای اخیر پدیدار شده است. اگر چه عمری از پیدایش آن نمیگذرد، اما بسرعت تبدیل به گزینه ی اصلی برای توسعه دهندگانی شد که در سطح تولید کار میکنند.
سرانجام، با استفاده از داکر میتوان یک محیط توسعه ی محلی قابل اعتماد و منسجمی بوجود آورد که از ورژن مدنظر پایتون و نصب جنگو گرفته تا سرویس های مازادی در کنار آنها نظیر پایگاه داده ها را شامل میشود. این به این معناست که دیگر مهم نیست شما از چه سیستم عاملی (مک، لینوکس، ویندوز) استفاده میکنید، چراکه همه چیز در خود داکر در حال اجراست. همچنین داکر همکاری در محیط های تیمی را رفته رفته آسان تر میکند.
آن زمان  که از فایل های طولانی و قدیمی README برای افزودن یه محیط توسعه جدید در پروژه های گروهی استفاده میکردیم دیگر گذشته است. در عوض داکر این امکان را میدهد که به سادگی دو فایل <i>Dockerfile</i> و <i>docker-compose.yml</i>  را به اشتراک بگذارید و توسعه دهنده میتواند اطمینان داشته باشد که محیط توسعه محلی او همانند سایر اعضای تیم است.
 </p>
  
 <p>
داکر یک فناوری کامل نیست و نسبتا نوپا است که زیر ساخت های آن در حال توسعه هستند. اما میتوان این نوید را داد که یک محیط توسعه سازگار و قابل اشتراک است که قادر است بصورت محلی روی هر رایانه یا سروری اجرا شود که همین موضوع آن را به انتخابی مناسب تبدیل میکند.
در این فصل، کمی بیشتر درباره داکر و داکراسیون کردن (dockerize) اولین پروژه جنگو می آموزیم.
  
  <br>
  <br>
  <i> 
پ.ن: داکراسیون: پیکربندی داکر متناسب با پروژه و همگام سازی آنها با یکدیگر
</i> 
   </p>
  
  
 <h1> 
  داکر چیست?
 </h1>
  
  <p>
   داکر ابزاری است که سیستم عامل نصبی روی سیستم شما را بوسیله پیمانه های لینوکسی از سایر اجزا مجزا میکند. این روشی برای مجازی سازی میباشد.
   <br><br>
   پ.ن: قبل از آشنایی با پیمانه ها(containers)، ابتدا باید مفهوم image را درک کنیم.
  </p>
  
  
  <p>
  ریشه مجازی سازی به ابتدای علوم کامیوتر برمیگردد، زمانی که ابر کامپیوتر ها رایج بودند.
این سوال بوجود آمد که "چند برنامه نویس چگونه میتوانند از یک رایانه بطور همزمان استفاده کنند؟"
پاسخ، مجازی سازی بود؛ بالاخص ماشین های مجازی که نسخه کاملی از کامپیوتر ها به همراه سیستم عامل آنها بود.
  </p>
  
  
  <p>
 اگر شما یک فضای ابری در سرویس های ارائه دهنده مثل آمازون تهیه کنید، این چنین نیست که یک سخت افزار اختصاصی به شما ارائه دهند. در عوض شما هستید که یک سرور فیزیکی را با سایر مشتریان به اشتراک میگذارید. اما چونکه مشتریان ماشین های مجازی خود را روی سرور آمازون اجرا میکنند، بنظر میرسد هرکس برای خودش یک سرور اختصاصی دارد.  این فناوری امکان افزودن یا حذف سرور از فضای ابری را ممکن میسازد. این فناوری تا حدی بسیار زیادی توسط نرم افزار ها پشتیبانی میشوند و سخت افزار ها بطور کامل در این تغییرات دخیل نیستند.
 </p>
  
  
  <p>
 و اما! 
 <b>
  نقطه ضعف ماشین های مجازی چیست؟
 </b> 
اندازه و سرعت دو تا از چالش های هستند.
یک سیستم عامل معمولی به راحتی میتواند ۷۰۰ مگابایت حجم داشته باشد. بنابراین اگر یک سرور فیزیکی از سه ماشین مجازی (۳×۷۰۰) پشتیبانی  کند، ۲.۱ گیگابایت از فضای دیسک بعلاوه ی نیاز های سی پی یو . منابع حافظه اشغال میشود.
  </p>
  
  <p>
   <b>
    خوب راه حل چیست؟ از داکر استفاده کنید.
   </b>
ایده اصلی این است که اکثر رایانه ها از یک سیستم عامل لینوکس استفاده میکنند.
حال اگر مجازی سازی را از لایه های بالایی لینوکس شروع کنیم چه میشود؟ (منظور این است که از هسته اصلی لینوکس شروع نکنیم) آیا حجم کمتر و سرعت بیشتری ارائه نمیشود.
راه حلی برای تکرار عملکرد های مشابه در پروژه است؟ 
پاسخ بله است. راه حل این چالش ها پیمانه های لینوکسی هستند که در سالهای اخیر بسیار محبوب شده اند. برای برنامه نویس ها بویژه وب اپلیکیشن ها (همچون جنگو) ماشین های مجازی و پیمانه های لینوکسی منابعی بیش از آنچه که نیاز است ارائه میدهند.  این اساسا همان چیزی است که داکر ارائه میدهد: راهی برای پیاده سازی پیمانه های لینوکسی.
  </p>
  
  
  
  <p>
   بهترین تشبیهی که میتوانیم اینجا بکار ببریم، محله و آپارتمان هستند. فرض کنید ماشین مجازی همان محله است. در هر محله ساختمان های مجزا از هم با زیر ساخت های خاص خود وجود دارد. از جمله لوله کشی، سیستم گرمایش، حمام و آشپزخانه.
پیمانه های ماشین مجازی همان ساختمان ها هستند
که در لوله کشی و سیستم گرمایش مشترک هستند، 
اما ظرفیت هر کدام از این بخش ها در ساختمان های مختلف بسته به نیاز مالک ساختمان و تعداد خانوار ها متفاوت است.
  </p>
  
  
  <h1>
   پیمانه ها (containers) در مقایسه با محیط های مجازی:
  </h1>
  
  <p>
  شما بایستی از قبل بعنوان یک برنامه نویس پایتون با مفهوم محیط های مجازی که راهی برای ایزوله کردن پکیج های پایتونی هستند آشنا باشید.
جا داره از این محیط مجازی یه تشکری کنیم (:
با وجود محیط مجازی در یک کامپیوتر میتوانیم بصورت محلی چند پروژه را اجرا کنیم. مثلا: فرض کنید یک پروژه از پایتون نسخه ۳.۴ و جنگو ۱.۱۱ استفاده میکند، در حالی که پروژه دیگر از پایتون ۳.۸ و جنگو ۳.۱ بهره گرفته است.
با ایجاد یک محیط مجازی اختصاصی برای هر یک از این دو پروژه میتوان پکیج های متفاوت را در حین آلوده نکردن سیستم کامپیوتری [که بخاطر نصب نسخه های مختلف از یک پکیج ایجاد میشوند] مدیریت کرد.
   <br><br>
   در حال حاضر، چند ابزار محبوب برای پیاده سازی محیط مجازی وجود دارد:
   <ul>
     <li><code>venv</code></li>
     <li><code>Pipenv</code></li>
     <li><code>virtualenv</code></li>
  </ul>
  اما اساسا همه اینها یک کار انجام میدهند.
  </p>
  
   <p>
 مهم ترین فرق بین محیط های مجازی و داکر این است که، محیط های مجازی فقط میتوانند از پکیج های پایتونی پشتیبانی کنند. مثلا قابلیت نصب برنامه هایی که پایتونی نیستند (مثل PostgreSQL یا MySQL) ندارند. چرا که این برنامه ها بایستی در سیستم اصلی کامپیوتر شما بصورت محلی نصب باشند.
به بیانی دیگر،  محیط های مجازی فقط و فقط به اشاره به پایتون و هر آنچه که از جنس پایتون است دارد و خود به تنهایی شامل این موارد نیست.
   </p>
 
 <p>
پیمانه های لینوکسی یک قدم فرا تر رفته، نه فقط بخش های مربوط به پایتون را بلکه کل سیستم عامل و هر چیزی که در آن نصب است را تفکیک میکند.
 مثلا هم میتوان پایتون و موارد مربوط به نوع دیتا بیس [از قبیل MySQL] را در داکر نصب و اجرا کنیم.
 </p>
 
 <p>
 داکر به خودی خود موضوعی پیچیده است و ما در این کتاب عمیقا آن را برسی نمیکنیم.
درک مفاهیم اولیه و نکات کلیدی آن مهم است. اگر میخواهید در این باره بیشتر بدانید، توصیه میکنم سری به <a href="https://diveintodocker.com/ref-dfp">Dive into Docker video course</a> بزنید (:
 </p>
 
 <h1>نصب داکر:</h1>
 
 <p>
  خوب خوب، دیگه تئوریجات کافیه. بیاد که داکر و جنگو را در کنار هم استفاده کنیم. قدم اول ثبت نام در سایت <a href="https://hub.docker.com/signup">Docker Hub</a> و نصب نسخه ی دسکتاپ داکر بر روی سیستم است.
 <br><br>
  از طریق این لینک ها میتوانید داکر را نصب کنید:
  <br><br>
  <ul>
   <li><a href="Docker Compose is included with Mac and Windows downloads but if you are on Linux you
will need to add it manually. You can do this by running the command sudo pip install
docker-compose after your Docker installation is complete.">داکر برای مک</a></li>
   <li><a href="https://docs.docker.com/install/">داکر برای لینوکس</a></li>
   <li><a href="https://hub.docker.com/editions/community/docker-ce-desktop-windows">داکر برای ویندوز</a></li>
  </ul>
  <br>
 از آنجایی که فایل نصبی حجیم است، دانلود ممکن است کمی طول بکشد. در این مرحله با خیال راحت  دراز بکشین (:
 </p>
  
 <p>
     لازم به ذکر است داکر در نسخه لینوکس از یوزر root استفاده میکند که این موضوع اغلب ایده آل نیست. در صورت تمایل میتوانید داکر را طوری تنظیم کنید که به عنوان یوزر غیر root اجرا شود.
 </p>
 
 <p>
  وقتی که داکر نصب شد با اجرای دستور docker --version در cmd میتوانیم ورژن در حال اجرای داکر را تایید کنیم. ورژن داکر حداقل باید ۱۸ باشد.
 </p>
 <div  dir="ltr" >
 <hr>
  <strong>Command Line</strong>
  <br><br>
  <code>
   $ docker --version
  </code>
  <br>
  <code>
   Docker version 19.03.12, build 48a66213f
  </code>
 <hr>
  </div>
  <p>
 بعضی اوقات داکر از یک ابزار جانبی به اسم  <a href="https://docs.docker.com/compose/">Docker Compose</a> برای کمک به اجرای خودکار دستورات استفاده میشود.
   <br>
   Docker Compose را برای مک و ویندوز  میتوانید دانلود کنید اما اگر از لینوکس استفاده میکنید، بایستی به صورت دستی آنرا نصب کنید. این کار را میتوانید با اجرای دستور      <code>sudo pip install docker-compose</code> پس اینکه نصب داکر تمام شد انجام دهید.
   </p>
 
 <h1>Hello, World</h1>
  <p>
   داکر یک image مخصوص خود به اسم "Hello, World" دارد که به عنوان اولین اجرا میتواند مفید باشد. در cmd، <code>docker run hello-world</code> را اجرا کنید. این دستور image رسمی داکر را دانلود و سپس در قالب یک پیمانه اجرا میکند.
درباره image و container (پیمانه) جلوتر صحبت میکنیم (:
  </p>
 <br><br>
 
 <div  dir="ltr" >
 <hr>
  <strong>Command Line</strong>
  <br><br>
   <div><code>$ docker run hello-world</code></div>
   <div>Unable to find image 'hello-world:latest' locally</div>
   <div>latest: Pulling from library/hello-world</div>
   <div>1b930d010525: Pull complete</div>
   <div>Digest: sha256:b8ba256769a0ac28dd126d584e0a2011cd2877f3f76e093a7ae560f2a5301c00</div>
   <div>Status: Downloaded newer image for hello-world:latest</div
    <br><br>
   <div>Hello from Docker!</div>
   <div>This message shows that your installation appears to be working correctly.</div>
    <br><br>
   <div>To generate this message, Docker took the following steps:</div>
   <div>1. The Docker client contacted the Docker daemon.</div>
   <div>2. The Docker daemon pulled the "hello-world" image from the Docker Hub.(amd64)</div>
   <div>3. The Docker daemon created a new container from that image which runs the
           executable that produces the output you are currently reading.</div>
   <div>4. The Docker daemon streamed that output to the Docker client, which sent it
           to your terminal.</div>
    <br><br>
   <div>To try something more ambitious, you can run an Ubuntu container with:</div>
   <div>$ docker run -it ubuntu bash</div>
    <br><br>
   <div>Share images, automate workflows, and more with a free Docker ID:</div>
   <div>https://hub.docker.com/</div>
    <br><br>
   <div>For more examples and ideas, visit:</div>
   <div>https://docs.docker.com/get-started/</div>
 <hr>
  </div>
  <br><br>
  <p>
  دستور <code>docker info</code> به ما این امکان را میدهد تا به آنچه که در داکر هست سرک بکشیم. 
این دستور خروجی های زیادی را نمایش میدهد اما خطوط اول که نشان میدهد ما یک container متوقف شده و یک image داریم برایمان حائز اهمیت است.
  </p>
  <br><br>
  
   <div  dir="ltr" >
 <hr>
  <strong>Command Line</strong>
  <br><br>
  <code>$ docker info</code>
    <div>
     Client:
    </div>
Debug Mode: false<br>
Server:<br>
Containers: 1<br>
Running: 0<br>
Paused: 0<br>
Stopped: 1<br>
Images: 1<br>
...
 <hr>
  </div>
  <br><br>
  <p>
   تمامی این خطوط نشان میدهد داکر با موفقیت نصب شده و در حال اجراست.
  </p>
  </div>
 
</body>
 
</html>
 