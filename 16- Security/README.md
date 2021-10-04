<div dir='rtl' align='right'>

### XSS (Cross Site Scripting)

<a href="https://en.wikipedia.org/wiki/Cross-site_scripting">Cross-site scripting (XSS)</a> این یک حمله کلاسیک دیگر است که زمانی اتفاق می افتد که مهاجم (attacker) قادر است تکه های کوچکی از کد را به صفحات مشاهده شده توسط افراد دیگر, تزریق کند. این کد ، معمولاً به زبان جاوا اسکریپت است و در صورت ذخیره در پایگاه داده ، بازیابی شده و برای سایر کاربران نمایش داده می شود .
  
  برای مثال : فرمی که برای نوشتن بررسی (نقد) کتاب استفاده می شود را در نظر بگیرید . چه می شود اگر به جای تایپ کردن , “این کتاب عالی بود”  کاربر یک چیزی را با جاوااسکریپ تایپ کند ؟ برای مثال , ```<script>alert('hello');</script>``` .اگر این اسکریپ در دیتابیس ذخیره میشد صفحه هر کاربری یک `alert` با عنوان `hello` به وجود می آمد . در حالی که این مثال خواص بیشتر آزار دهنده است تا خطرناک , سایتی که در مقابل حمله `XSS` آسیب پذیر است بسیار خطرناک است زیرا هر کاربر مخرب میتواند هر  جاوا اسکرییپتی را در صفحه قرار دهد , از جمله کد جاوااسکریپتی که میتواند اطلاعات کاربران ناشناس رو هم بدزدد . 
  
 برای جلوگیری از حمله `XSS` قالب های جنگو به صورت خودکار <a href="https://docs.djangoproject.com/en/3.1/ref/templates/language/#automatic-html-escaping">automatically escape</a> از کاراکتر های خاصی که به طور بالقوه خطرناک هستند از جمله : براکت ها `(< و >)` , سینگل کوت `(single quotes) ' ` , دابل کوت `(double quotes) " ` و علامت `&` دوری می کند . مواردی وجود دارد که ممکن است بخواهید به صورت خودکار <a href="https://docs.djangoproject.com/en/3.1/ref/templates/builtins/#std:templatetag-autoescape">autoescape off</a>  کنید اما باید با احتیاط زیاد انجام شود .
  
   این <a href="https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.md">OWASP’s XSS Cheat Sheet</a> برای مطالعه بیشتر توصیه می شود .


    
 ### Cross-Site Request Forgery (CSRF)
  
این <a href="https://en.wikipedia.org/wiki/Cross-site_request_forgery">Cross-Site Request Forgery (CSRF)</a> سومین نوع عمده حمله است اما عموما نسبت به تزریق sql (SQL Injection) یا حمله XSS کمتر شناخته شده است . این حمله اساسا از اعتماد سایت به مرورگر کاربر استفاده می کند .
  
زمانی که کاربر وارد یک سایت می شود , اجازه دهید آن را یک سایت بانکی برای اهداف تصاویر سازی بنامیم , سرور `session token` را برای آن کاربر ارسال می کند . هدر های  HTTP در آینده شامل همه ی request ها و احراز هویت های کاربر می شود . اما اگر یک بازیگر مخرب (هکر) به نحوی به `session token` دسترسی پیدا کند چه اتفاقی می افتد ؟
  
برای مثال , کاربری را در نظر بگیرید که در یک تب مرورگر به بانک خود وارد می شود . سپس آنها در یک تب دیگر ایمیل شان را باز می کنند و روی یک email link که از طرف یک بازیگر مخرب (هکر) است کلیک می کنند . این لینک قانونی به نظر می رسد ,
اما در واقع به بانک کاربر اشاره می کند که هنوز در آن login است ! بنابرابن به جای ترک کردن کامنت وبلاگ در این سایت جعلی , در پشت صحنه , از اطلاعات کاربری برای انتقال پول از حساب آنها به حساب هکر ها استفاده می شود .
  
در عمل روش های زیادی برای به دست آوردن اعتبار کاربر از طریق حمله CSRF وجود دارد , نه فقط لینک ها,
حتی form های پنهان , برچسب های مخصوص عکس , و حتی request های AJAX .
  
جنگو <a href="https://docs.djangoproject.com/en/3.1/ref/csrf/#how-it-works">CSRF protection</a> با قرار دادن secret key رندوم به عنوان کوکی از طریق <a href="https://docs.djangoproject.com/en/3.1/ref/middleware/#django.middleware.csrf.CsrfViewMiddleware">CSRF
Middleware</a> و در فرم ها از طریق تمپلیت تگ (template tag) <a href="https://docs.djangoproject.com/en/3.1/ref/templates/builtins/#csrf-token">csrf_token</a> محافظت می کند . سایت تیم سوم به کوکی های کاربر دسترسی نخواهد داشت بنابراین هرگونه مغایرت بین دو کلید باعث ارور می شود .
  
جنگو امکان سفارشی سازی را مثل همیشه می دهد : شما میتوانید middleware CSRF رای غیر فعال کنید و از تمپلیت تگ (template tag) <a href="https://docs.djangoproject.com/en/3.1/ref/csrf/#django.views.decorators.csrf.csrf_protect">()csrf_protect</a> در view های خاص استفاده بکنید . با این حال این مرحله را با نهایت احتیاط انجام دهید .
  
این OWASP <a href="https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.md">CSRF Cheat Sheet</a> نگاه جامعی به موضوع ارائه می دهد. تغریبا همه ی سایت های اصلی در مقاطعی از زمان قربانی حملات CSRF شده اند . 
  
یک قانون کلی خوب این است که هر گاه در سایت خود یک فرمی دارید , فکر کنید که آیا به تک csrf_token نیاز دارید . بیشتر مواقع به آن نیاز دارید !


### Clickjacking Protection (مقابله با کلیک دزدی)
<a href="https://en.wikipedia.org/wiki/Clickjacking">Clickjacking</a> حمله دیگری است که در آن یک سایت مخرب کاربر را فریب می دهد تا روی یک frame مخفی شده کلیک کند . یک frame داخلی,که به عنوان `iframe` شناخته می شود , معمولا برای جاسازی یک سایت در داخل یکی دیگر استفاده می شود . برای مثال , اگر میخواهید Google Map یا ویدیوی Yuotube را در سایت خود قرار دهید iframe شامل tag است که آن سایت را در سایت شما قرار می دهد. این بسیار راحت است.
  
اما این یک خطر امنیتی دارد که می تواند یک frame را از دید کاربر مخفی کند . در نظر بگیرید که یک کاربر قبلا به حساب کاربری اش در آمازون login شده است و سپس از یک سایت مخرب بازدید می کند که به نظر می رسید عکس بچه گربه باشد . کاربر برای مشاهده بچه گربه های بیشتر بر روی سایت مخرب گفته شده کلیک می کند , اما در واقع آنها روی یک iframe از محصول آمازون که ناخودآگاه خریداری شده کلیک می کنند . این تنها یک نمونه از clickjacking است .
  
برای جلوگیری از این (حمله) جنگو با یک پیش فرض همراه است <a href="https://docs.djangoproject.com/en/3.1/ref/clickjacking/#clickjacking-prevention">clickjacking middleware</a> که <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options">X-FrameOptions HTTP header</a> را تنظیم می کند , که نشان می دهد که یک منبع مجاز به load یک frame یا iframe است یا خیر. در صورت تمایل می توانید این محافظ را خاموش کنید , یا آن را در سطح نمایش تنظیم کنید . با این حال این کار را با احتیاط و <a href="https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Clickjacking_Defense_Cheat_Sheet.md">research(تحقیق بالا)</a> انجام دهید .
  

</div>
  
