window.addEventListener('DOMContentLoaded', function() {
  var swiperThumbs = new Swiper(".thumbnailsSwiper", { 
      spaceBetween: 8,
      slidesPerView: 4, 
      freeMode: true,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      direction: 'vertical',
      slideToClickedSlide: true,
      grabCursor: true,
      centeredSlides: true, 
      touchRatio: 0.2,
    });
  var swiperMain = new Swiper('.mainSwiper', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      disabledClass: 'swiper-button-disabled',
      hiddenClass: 'swiper-button-hidden',
      prevEl: '.custom-swiper-button-prev',
      nextEl: '.custom-swiper-button-next',
    },
    grabCursor: true,
    breakpoints: {
    920: {
        pagination: false,
        },
    300: {
       pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        },
      } 
    }
  }); 
  swiperMain.controller.control = swiperThumbs; 
  swiperThumbs.controller.control = swiperMain; 
});