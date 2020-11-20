/*
✓ 1.Создание и рендер разметки по массиву данных и предоставленному шаблону.
✓ 2.Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
✓ 3.Открытие модального окна по клику на элементе галереи.
✓ 4.Подмена значения атрибута src элемента img.lightbox__image.
✓ 5.Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
✓? 6.Очистка значения атрибута src элемента img.lightbox__image. 
 Это необходимо для того, чтобы при следующем открытии модального окна, 
  пока грузится изображение, мы не видели предыдущее.
*/

import galleryImg from './gallery-items.js';

const refernces = {
  jsGallery: document.querySelector('.js-gallery'),
  jsLightBox: document.querySelector('.lightbox'),
  jsLightBoxButton: document.querySelector(
    '.lightbox button[data-action="close-lightbox"]',
  ),
  modalImg: document.querySelector('.lightbox__image'),
};

// console.log(refernces);

// 1.Создание и рендер разметки по массиву данных и предоставленному шаблону.

const renderGallery = refernces.jsGallery.insertAdjacentHTML(
  'beforeend',
  galleryImg
    .map(
      ({ preview, description, original }) => `<li class='gallery__item'>
  <a
    class='gallery__link'
    href='${original}'
  >
    <img
      class='gallery__image'
      src='${preview}'
      data-source='${original}'
      alt='${description}'
    />
  </a>
</li>`,
    )
    .join(''),
);

// ========================================================================

// 2.Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.

refernces.jsGallery.addEventListener('click', galleryClick);
refernces.jsLightBoxButton.addEventListener('click', closingModal);

// 3.Открытие модального окна по клику на элементе галереи.
function galleryClick(e) {
  e.preventDefault();
  const target = e.target;
  if (target.nodeName !== 'IMG') {
    return;
  }
  // 4.Подмена значения атрибута src элемента img.lightbox__image.
  refernces.modalImg.setAttribute('src', e.target.dataset.source);
  refernces.modalImg.setAttribute('alt', e.target.alt);
  console.log(e.target.dataset.source);
  openModal();
}

// 5.Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// 6.Очистка значения атрибута src элемента img.lightbox__image.

function closingModal() {
  refernces.jsLightBox.classList.toggle('is-open');
  refernces.modalImg.setAttribute('src', '#');
  refernces.modalImg.setAttribute('alt', '#');
}

function openModal() {
  refernces.jsLightBox.classList.toggle('is-open');
}
