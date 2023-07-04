 window.addEventListener('DOMContentLoaded', function() {
  var collectionSwiper = new Swiper('.collectionSwiper', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      disabledClass: 'swiper-button-disabled',
      hiddenClass: 'swiper-button-hidden',
      prevEl: '.custom-swiper-button-prev',
      nextEl: '.custom-swiper-button-next',
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },
    grabCursor: true,
    slidesPerView: 4,
    spaceBetween: 24,
  }); 
});