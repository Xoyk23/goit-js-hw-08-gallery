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
      ({ preview, description, original }, i) => `<li class='gallery__item'>
  <a
    class='gallery__link'
    href='${original}'
  >
    <img
      class='gallery__image'
      src='${preview}'
      data-source='${original}'
      alt='${description}'
      data-index="${i}"
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
  refernces.modalImg.setAttribute('data-index', `${e.target.dataset.index}`);
  console.log(e.target.dataset.source);
  openModal();
}

// 5.Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// 6.Очистка значения атрибута src элемента img.lightbox__image.

function openModal() {
  refernces.jsLightBox.classList.toggle('is-open');
  window.addEventListener('keydown', closeByEsc);
  window.addEventListener('keydown', moveLeftByButton);
  window.addEventListener('keydown', moveRightByButton);
}

function closingModal() {
  refernces.jsLightBox.classList.toggle('is-open');
  refernces.modalImg.setAttribute('src', '#');
  refernces.modalImg.setAttribute('alt', '#');
  window.removeEventListener('keydown', closeByEsc);
  window.removeEventListener('keydown', moveLeftByButton);
  window.removeEventListener('keydown', moveRightByButton);
}

// закрытие по ESC

function closeByEsc(e) {
  if (
    refernces.jsLightBox.classList.contains('is-open') &&
    e.code === 'Escape'
  ) {
    closingModal();
  }
}

//переключение по кнопкам
let index;

function setImgIndex() {
  index = Number(refernces.modalImg.dataset.index);
}

function changeImgIndex() {
  refernces.modalImg.dataset.index = index;
}

function changeImg() {
  refernces.modalImg.src = galleryImg[index].original;
  refernces.modalImg.alt = galleryImg[index].description;
}

function moveRightByClick() {
  setImgIndex();
  if (index < galleryImg.length - 1) {
    index += 1;
    changeImg();
    changeImgIndex();
  }
}

function moveLeftByClick() {
  setImgIndex();
  if (index !== 0) {
    index -= 1;
    changeImg();
    changeImgIndex();
  }
}

// для переключения по клавишам
function moveRightByButton(event) {
  if (
    refernces.jsLightBox.classList.contains('is-open') &&
    event.code === 'ArrowRight'
  ) {
    moveRightByClick();
  }
}

function moveLeftByButton(event) {
  if (
    refernces.jsLightBox.classList.contains('is-open') &&
    event.code === 'ArrowLeft'
  ) {
    moveLeftByClick();
  }
}

// ====================================

// function keyPressNextPrev(event) {
//   const jsGalleryImg = document.querySelectorAll('.gallery__image');
//   let currentIndex = Number(refernces.modalImg.dataset.index);

//   if (
//     refernces.jsLightBox.classList.contains('is-open') &&
//     event.code === 'ArrowRight'
//   ) {
//     if (currentIndex === galleryImg.length - 1) {
//       currentIndex = -1;
//     }

//     refernces.modalImg.src = `${jsGalleryImg[currentIndex + 1].dataset.source}`;
//     refernces.modalImg.dataset.index = `${
//       jsGalleryImg[currentIndex + 1].dataset.index
//     }`;
//     refernces.modalImg.alt = `${jsGalleryImg[currentIndex + 1].alt}`;
//   } else if (
//     refernces.modalImg.classList.contains('is-open') &&
//     event.code === 'ArrowLeft'
//   ) {
//     if (currentIndex === 0) {
//       currentIndex = galleryImg.length;
//     }

//     refs.modalImg.src = `${jsGalleryImg[currentIndex - 1].dataset.source}`;
//     refs.modalImg.dataset.index = `${
//       jsGalleryImg[currentIndex - 1].dataset.index
//     }`;
//     refs.modalImg.alt = `${jsGalleryImg[currentIndex - 1].alt}`;
//   }
// }
