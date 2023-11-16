import {
  getMainCategories,
  getWhiskeyByCategory,
} from '../../services/state.js';
import { getRandomItem } from '../../services/utils.js';
import { initializeWhiskey } from '../../services/loadWhiskey.js';
import { getCatalogByCategoriesLink } from '../../services/urlSearchParams.js';
import jumbotronContent from './jumbotron.html';
import './jumbotron.css';

await initializeWhiskey();

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

const jumbotron = (category, country, topRatedWhiskey) =>
  jumbotronContent
    .replace('${category}', category)
    .replace('${country}', country.toUpperCase())
    .replace('${catalogByCategoriesLink}', getCatalogByCategoriesLink(category))
    .replace('${sliderImages}', getSliderImages(topRatedWhiskey));

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

var jumbotronElement = document.getElementById('jumbotron');
if (jumbotronElement) {
  jumbotronElement.innerHTML = jumbotron(
    category,
    whiskey[0].Country,
    top5RatedWhiskey
  );
}

setFirstSlideActive();
setInterval(nextSlide, 5000);
