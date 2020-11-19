/*
✓ 1.Создание и рендер разметки по массиву данных и предоставленному шаблону.
  2.Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
  3.Открытие модального окна по клику на элементе галереи.
  4.Подмена значения атрибута src элемента img.lightbox__image.
  5.Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
  6.Очистка значения атрибута src элемента img.lightbox__image. 
    Это необходимо для того, чтобы при следующем открытии модального окна, 
    пока грузится изображение, мы не видели предыдущее.
*/

import galleryImg from './gallery-items.js';

const refernces = {
  jsGallery: document.querySelector('.js-gallery'),
};

console.log(refernces);

const renderGallery = refernces.jsGallery.insertAdjacentHTML(
  'beforeend',
  galleryImg
    .map(
      ({ preview }, { description }) => `<li class='gallery__item'>
  <a
    class='gallery__link'
    href='#'
  >
    <img
      class='gallery__image'
      src='${preview}'
      data-source= '#'
      alt='${description}'
    />
  </a>
</li>`,
    )
    .join(''),
);
