import Swiper, { Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

const mySwiper = new Swiper('.slider', {

  slidesPerView: 1,

  spaceBetween: 10,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,

  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {

    670: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    1220: {
      slidesPerView: 3,
      spaceBetween: 30,
    },

    1420: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
});

