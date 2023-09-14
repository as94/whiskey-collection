import {
  getMainCategories,
  getWhiskeyByCategory,
} from '../../services/state.js';
import { getRandomItem } from '../../services/utils.js';
import { initializeWhiskey } from '../../services/loadWhiskey.js';
import { getCatalogByCategoriesLink } from '../../services/urlSearchParams.js';

const nextSlide = () => {
  const currentSlide = document.querySelector('.active');

  if (currentSlide) {
    currentSlide.classList.remove('active');

    let nextSlide = currentSlide.nextElementSibling;

    if (!nextSlide) {
      nextSlide = document.querySelector('.slider__slide:first-child');
    }

    if (nextSlide) {
      nextSlide.classList.add('active');

      const sliderWrapper = document.getElementById('sliderWrapper');
      const height = document.querySelector('.slider__slide').offsetHeight;
      const index = nextSlide.getAttribute('data-index') - 1;

      if (sliderWrapper && !isNaN(height) && !isNaN(index)) {
        sliderWrapper.style.transform = `translateY(-${height * index}px)`;
      }
    }
  }
};

const setFirstSlideActive = () => {
  const firstSlide = document.querySelector('.slider__slide:first-child');

  if (firstSlide) {
    firstSlide.classList.add('active');
  }
};

const getSliderImages = topRatedWhiskey => {
  let result = '';

  for (let index = 0; index < topRatedWhiskey.length; index++) {
    const item = topRatedWhiskey[index];
    result += `<div class="slider__slide" data-index="${index + 1}">
        <img src="${item.ImageLink}" title="${item.Name}" alt="${
      item.Description
    }" />
    </div>`;
  }

  return result;
};

const thumbnail = (category, country, topRatedWhiskey) => `
<link rel="stylesheet" href="./components/Thumbnail/thumbnail.css" />
<div class="thumbnail">
  <div class="column offer">
    <h3 class="usp-text h3">
      We have collected the most popular whiskey here. You can use it free and
      begin with
    </h3>
  </div>
  <div class="column middle">
    <div class="usp-product">
      <h2 class="first-row h2">${category}</h2>
      <h1 class="second-row h1">${country.toUpperCase()}</h1>
      <h1 class="third-row h1">WHISKEY</h1>
      <div class="fourth-row">
        <a class="catalog-btn body-semibold" data-no-select href="${getCatalogByCategoriesLink(
          category
        )}">Discover more</a>
      </div>
    </div>
  </div>
  <div class="column slider">
    <div class="slider__wrapper" id="sliderWrapper">
      ${getSliderImages(topRatedWhiskey)}
    </div>
  </div>
</div>`;

await initializeWhiskey();

const categories = getMainCategories();
const category = getRandomItem(categories);
const whiskeyByCategory = getWhiskeyByCategory();
const whiskey = whiskeyByCategory[category];
const top5RatedWhiskey = whiskey
  .slice()
  .sort((a, b) => {
    const weightA = a.Rating * Math.log10(a.RateCount + 1);
    const weightB = b.Rating * Math.log10(b.RateCount + 1);

    const difference = weightB - weightA;

    if (Number(difference.toFixed(2)) !== 0) {
      return difference;
    }

    return a.Name.localeCompare(b.Name);
  })
  .slice(0, 5);

var thumbnailElement = document.getElementById('thumbnail');
if (thumbnailElement) {
  thumbnailElement.innerHTML = thumbnail(
    category,
    whiskey[0].Country,
    top5RatedWhiskey
  );
}

setFirstSlideActive();
setInterval(nextSlide, 5000);
