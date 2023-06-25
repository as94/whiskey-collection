import {
  getMainCategories,
  getWhiskeyByCategory,
} from '../../services/state.js';
import { getRandomItem } from '../../services/utils.js';
import { initializeWhiskey } from '../../services/loadWhiskey.js';
import { changeCategory } from '../../services/urlSearchParams.js';

const nextSlide = () => {
  const currentSlide = $('.active');

  currentSlide.removeClass('active');

  let nextSlide = currentSlide.next();

  if (!nextSlide.length) {
    nextSlide = $('.slider__slide:first-child');
  }

  nextSlide.addClass('active');

  const sliderWrapper = $('#sliderWrapper');
  const height = $('.slider__slide').first().outerHeight();
  sliderWrapper.css(
    'transform',
    `translateY(-${height * (nextSlide.data('index') - 1)}px)`
  );
};

const setFirstSlideActive = () => {
  const firstSlide = $('.slider__slide:first-child');
  firstSlide.addClass('active');
};

const getSliderImages = topRatedWhiskey => {
  let result = '';

  for (let index = 0; index < topRatedWhiskey.length; index++) {
    const item = topRatedWhiskey[index];
    result += `<div class="slider__slide" data-index="${index + 1}">
        <img src="${item.ImageLink}" />
    </div>`;
  }

  return result;
};

const thumbnail = (category, country, topRatedWhiskey) => `
<link rel="stylesheet" href="./components/Thumbnail/thumbnail.css" />
<div class="thumbnail">
  <div class="column">
    <div class="usp-text h-4">
      We have collected the most popular whiskey here. You can use it free and
      begin with
    </div>
  </div>
  <div class="column middle">
    <div class="usp-product">
      <div class="first-row h-2">${category}</div>
      <div class="second-row h-1">${country.toUpperCase()}</div>
      <div class="third-row h-1">WHISKEY</div>
      <div class="fourth-row">
        <button class="catalog-btn body-text-14">Discover more</button>
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

$(document).on('click', '.catalog-btn', function () {
  changeCategory(category);
});

$('#thumbnail').html(thumbnail(category, whiskey[0].Country, top5RatedWhiskey));
setFirstSlideActive();
setInterval(nextSlide, 5000);
