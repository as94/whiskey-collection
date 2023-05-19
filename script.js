'use strict';

const whiskeyCollection = document.getElementById('whiskey-collection');

const getWhiskey = async () => {
  const url =
    'https://wandering-sky-6e0a.anatoly-sorokin-personal1751.workers.dev/';

  const response = await fetch(url);

  return await response.json();
};

// const run = async () => {
//   const whiskey = await getWhiskey();

//   for (const item of whiskey) {
//     const product = document.createElement('div');
//     product.style.width = '300px';
//     product.style.border = '1px solid #ccc';
//     product.style.textAlign = 'center';

//     const img = document.createElement('img');
//     img.src = item.ImageUrl;
//     img.style.maxWidth = '100%';
//     img.style.height = '300px';
//     img.style.objectFit = 'contain';
//     img.style.display = 'inline-block';
//     img.style.margin = 'auto';

//     product.appendChild(img);

//     const name = document.createElement('p');
//     name.innerText = item.Name;
//     product.appendChild(name);

//     whiskeyCollection.appendChild(product);
//   }
// };

// run();
function nextSlide() {
  const currentSlide = document.querySelector('.slider__slide.active');

  currentSlide.classList.remove('active');

  let nextSlide = currentSlide.nextElementSibling;

  if (!nextSlide) {
    nextSlide = document.querySelector('.slider__slide:first-child');
  }

  nextSlide.classList.add('active');

  const sliderWrapper = document.getElementById('sliderWrapper');
  const height = document.querySelector('.slider__slide').clientHeight;
  sliderWrapper.style.transform = `translateY(-${
    height * (nextSlide.dataset.index - 1)
  }px)`;
}

const firstSlide = document.querySelector('.slider__slide:first-child');
firstSlide.classList.add('active');

setInterval(nextSlide, 5000);

$(document).ready(function () {
  $('.selected-country').click(function () {
    $(this).toggleClass('active');
    $('.dropdown-options').toggleClass('show');
  });

  $('.option').click(function () {
    var selectedOption = $(this).text();
    $('#selected-country').text(selectedOption);
    $('.option').removeClass('selected');
    $(this).addClass('selected');
    $('.dropdown-options').removeClass('show');
    $('.selected-country').removeClass('active');
  });

  $(document).click(function (event) {
    var target = $(event.target);
    if (!target.closest('.dropdown-container').length) {
      $('.dropdown-options').removeClass('show');
      $('.selected-country').removeClass('active');
    }
  });
});
