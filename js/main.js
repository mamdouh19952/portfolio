 
 document.addEventListener("DOMContentLoaded", () => {

  // 2) نسجل البلوجن
  gsap.registerPlugin(ScrollTrigger);

  // 3) نجيب كل progress-bar
  const bars = document.querySelectorAll(".progress-bar");

  bars.forEach(bar => {
    // 4) نقرأ ال target من الـ data attribute
    const target = Number(bar.getAttribute("data-target")) || 0;

    // 5) كائن بسيط هنعد عليه (gsap يتعامل مع قيم JS)
    const countObj = { value: 0 };

    // 6) إعدادات الـ scrollTrigger نستخدمها في الـ timeline
    const triggerConfig = {
      trigger: bar,          // العنصر اللي لما يظهر يشغل الانيميشن
      start: "top 90%",      // لما top العنصر يوصل 80% من ارتفاع الشاشة
      once: true             // يشغل مرة واحدة وبعدين يثبت (ما يرجعش بالعكس)
      // لو عايز يرجع عند الscroll لأعلى شيل once واضبط toggleActions
    };

    // 7) نبني timeline بحيث الحركة والعداد يحصلوا مع بعض
    const tl = gsap.timeline({
      scrollTrigger: triggerConfig
    });

    // 8) أولاً: نملأ خط البار (عرض)
    tl.to(bar, {
      width: target + "%",   // يودي العرض لــ target%
      duration: .5,           // مدة الأنيميشن بالثواني (تقدر تغيرها)
      ease: "ease.out"
    }, 0); // الـ 0 هنا معناه يبدأ في نفس وقت أي tween تاني في timeline

    // 9) بنفس الوقت نعد الرقم من 0 -> target
    tl.to(countObj, {
      value: target,
      duration: .5,               // نفس مدة ملء البار
      ease: "ease.inout",
      onUpdate: () => {
        // نعرض القيمة داخل الـ bar كنص (نستخدم Math.floor للعرض كعدد صحيح)
        bar.textContent = Math.floor(countObj.value) + "%";
      },
      onComplete: () => {
        // لما يخلص نحدّث aria-valuenow للقيمة النهائية (جيد للأكسسسيبيليتي)
        bar.setAttribute("aria-valuenow", target);
        bar.textContent = target + "%";
      }
    }, 0);

  }); // end foreach

 
 function animateCounter(counter) {
    const target = +counter.getAttribute("data-target");
    const speed = 200; // كل ما الرقم أصغر السرعة أسرع
    const increment = target / speed;

    const update = () => {
      const current = +counter.innerText;
      if (current < target) {
        counter.innerText = Math.ceil(current + increment);
        setTimeout(update, 20);
      } else {
        counter.innerText = target;
      }
    };

    update();
  }

  // نراقب السكشن
  const section = document.querySelector("#Clients");
  const counters = document.querySelectorAll(".count");

  let started = false; // عشان يشتغل مرة واحدة بس

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
      counters.forEach(counter => animateCounter(counter));
      started = true;
    }
  }, { threshold: 0.5 }); // يبدأ لما نص السكشن يظهر

  observer.observe(section);


// GSAP Animation for Images
  gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".animate-img").forEach(img => {
  gsap.from(img, {
    scrollTrigger: {
      trigger: img,
      start: "top 80%",   // يبدأ لما يوصل 80% من الشاشة
      toggleActions: "play none none reverse"
    },
    y: 100,         // يبدأ نازل لتحت 100px
    opacity: 0,     // يبدأ مخفي
    duration: 1,
    ease: "power3.out"
  });
});

});

// navbar background change on scroll

 $(window).on("scroll", function() {
        // ارتفاع قسم About
        const navBar = $('#main-nav');
        const navHeight = navBar.outerHeight(true);
        const secTop = $("#About").offset().top - navHeight; 
        const scrollTop = $(window).scrollTop();
        console.log(scrollTop, secTop);
    
        // إذا تجاوز التمرير قسم About
        if (scrollTop >= secTop) {
      navBar.removeClass('bg-body-tertiary')

navBar.css({
                "background-color": "rgba(255, 255, 255, 0.6)", // لون خلفية شبه شفاف
                "transition": "background-color 0.5s ease"
            });

        } else {

                               navBar.addClass('bg-body-tertiary ');

                            

            // في أعلى الصفحة: يعود للشفافية
        }  
    });

// side setting box
$("#setting").on("click", function(){
    $(".open").css("left","0px");
            $(".links-side").animate({top:0},500)

});
$(".close").on("click", function(){
    $(".open").css("left","-200px");
                $(".links-side").animate({top:1000},500)

});
$(".open li").on("click", function(){
    $(".open").css("left","-200px");
});

$(".open").on("mouseleave", function() {
  closeTimer = setTimeout(() => {
    $(".open").css("left", "-200px");
  }, 4000); // بعد 7 ثواني
});
$(".open").on("mouseenter", function() {
  clearTimeout(closeTimer);
});



$("textarea").on("keyup", function() {

  // myLength = this.value.length    ;
  let myLength = $(this).val().length;
  console.log(myLength);
  $("p.text-area").text(` ${50 - myLength} characters remaining`);
  if (myLength > 50) {
    $("p.text-area").css("color", "red");
    $("textarea").prop("readonly", true);
    $("p.text-area").text("your available character finished");
  }
})  


// jQuery for smooth scrolling on nav links