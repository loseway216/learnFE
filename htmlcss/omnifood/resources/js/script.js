$(document).ready(function () {
  // trigger when the top of that element hits the top of the viewport
  // trigger when the element is 60px from the top
  $(".js-section-features").waypoint(
    function (direction) {
      if (direction === "down") {
        $("nav").addClass("sticky");
      } else {
        $("nav").removeClass("sticky");
      }
    },
    { offset: "60px" }
  );

  //点击按钮，页面滚到购买计划
  $(".js-scroll-to-plans").click(function () {
    $("html,body").animate(
      {
        scrollTop: $(".js-section-plans").offset().top,
      },
      1000
    );
  });

  //点击按钮，页面滚到了解更多
  $(".js-scroll-to-start").click(function () {
    $("html,body").animate(
      {
        scrollTop: $(".js-section-features").offset().top,
      },
      1000
    );
  });

  //features 动画，渐现
  $(".js-wp-1").waypoint(
    function (direction) {
      $(".js-wp-1").addClass("animated fadeIn");
    },
    { offset: "50%" }
  );

  //app-screen,动画，从下方出现
  $(".js-wp-2").waypoint(
    function (direction) {
      $(".js-wp-2").addClass("animated fadeInUp");
    },
    { offset: "50%" }
  );

  //cities,动画，渐现
  $(".js-wp-3").waypoint(
    function (direction) {
      $(".js-wp-3").addClass("animated fadeIn");
    },
    { offset: "50%" }
  );
  //plans,动画，脉搏
  $(".js-wp-4").waypoint(
    function (direction) {
      $(".js-wp-4").addClass("animated pulse");
    },
    { offset: "50%" }
  );

  //mobile navigation
  $(".js-mobile-nav").click(function () {
    var nav = $(".js-main-nav");
    var icon = $(".js-mobile-nav i");
    //滑动切换
    nav.slideToggle(200);
    //点开变成叉
    if (icon.hasClass("ion-navicon-round")) {
      icon.addClass("ion-close-round");
      icon.removeClass("ion-navicon-round");
    } else {
      icon.removeClass("ion-close-round");
      icon.addClass("ion-navicon-round");
    }
  });

  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $("html, body").animate(
            {
              scrollTop: target.offset().top,
            },
            1000,
            function () {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) {
                // Checking if the target was focused
                return false;
              } else {
                $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }
            }
          );
        }
      }
    });
});
