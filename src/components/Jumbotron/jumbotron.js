import { initializeWhiskey } from '../../services/loadWhiskey.js';
import { getWhiskey } from '../../services/state.js';
import { getMostPopularWhiskeyLink } from '../../services/urlSearchParams.js';
import { popularity } from '../../services/sortWhiskeyBy.js';
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

const jumbotron = (mostPopularWhiskeyLink, topRatedWhiskey) =>
  jumbotronContent
    .replace('${mostPopularWhiskeyLink}', mostPopularWhiskeyLink)
    .replace('${sliderImages}', getSliderImages(topRatedWhiskey));

const mostPopularWhiskeyLink = getMostPopularWhiskeyLink();

const whiskey = getWhiskey();
const top10RatedWhiskey = whiskey.slice().sort(popularity).slice(0, 10);

var jumbotronElement = document.getElementById('jumbotron');
if (jumbotronElement) {
  jumbotronElement.innerHTML = jumbotron(
    mostPopularWhiskeyLink,
    top10RatedWhiskey
  );
}

setFirstSlideActive();
setInterval(nextSlide, 5000);
