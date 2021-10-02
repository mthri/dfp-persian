<div dir='rtl' align='right'>

### XSS (Cross Site Scripting)

<a href="https://en.wikipedia.org/wiki/Cross-site_scripting">Cross-site scripting (XSS)</a> این یک حمله کلاسیک دیگر است که زمانی اتفاق می افتد که مهاجم (attacker) قادر است تکه های کوچکی از کد را به صفحات مشاهده شده توسط افراد دیگر, تزریق کند. این کد ، معمولاً به زبان جاوا اسکریپت است و در صورت ذخیره در پایگاه داده ، بازیابی شده و برای سایر کاربران نمایش داده می شود .
  
  برای مثال : فرمی که برای نوشتن بررسی (نقد) کتاب استفاده می شود را در نظر بگیرید . چه می شود اگر به جای تایپ کردن , “این کتاب عالی بود”  کاربر یک چیزی را با جاوااسکریپ تایپ کند ؟ برای مثال , ```<script>alert('hello');</script>``` .اگر این اسکریپ در دیتابیس ذخیره میشد صفحه هر کاربری یک `alert` با عنوان `hello` به وجود می آمد . در حالی که این مثال خواص بیشتر آزار دهنده است تا خطرناک , سایتی که در مقابل حمله `XSS` آسیب پذیر است بسیار خطرناک است زیرا هر کاربر مخرب میتواند هر  جاوا اسکرییپتی را در صفحه قرار دهد , از جمله کد جاوااسکریپتی که میتواند اطلاعات کاربران ناشناس رو هم بدزدد . 
  
 برای جلوگیری از حمله `XSS` قالب های جنگو به صورت خودکار <a href="https://docs.djangoproject.com/en/3.1/ref/templates/language/#automatic-html-escaping">automatically escape</a> از کاراکتر های خاصی که به طور بالقوه خطرناک هستند از جمله : براکت ها `(< و >)` , سینگل کوت `(single quotes) ' ` , دابل کوت `(double quotes) " ` و علامت `&` دوری می کند . مواردی وجود دارد که ممکن است بخواهید به صورت خودکار <a href="https://docs.djangoproject.com/en/3.1/ref/templates/builtins/#std:templatetag-autoescape">autoescape off</a>  کنید اما باید با احتیاط زیاد انجام شود .
  
   این <a href="https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.md">OWASP’s XSS Cheat Sheet</a> برای مطالعه بیشتر توصیه می شود .

</div>