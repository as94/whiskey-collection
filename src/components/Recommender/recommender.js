import recommenderContent from './recommender.html';
import './recommender.css';
import { getWhiskeyRecommendation } from '../../services/recommendation.js';
import { googleSignIn } from '../../services/firebase.js';
import { getParameters } from './parameters.js';
import { getWithExpiry } from '../../services/localStorage';
import { authCallbackAction } from '../Header/header.js';
import '../Catalog/catalog.css';
import { generateCatalogRows } from '../Catalog/catalog.js';

const nextQuestion = id => {
  const currentElement = document.getElementById(`slider-${id}`);
  const nextElement = document.getElementById(`slider-${id + 1}`);

  if (currentElement && nextElement) {
    currentElement.classList.add('slide-left-continue-animation');

    setTimeout(() => {
      nextElement.classList.remove('hidden');
      currentElement.classList.add('hidden');
      currentElement.classList.remove('slide-left-continue-animation');
      nextElement.classList.add('slide-right-continue-animation');

      setTimeout(() => {
        nextElement.classList.remove('slide-right-continue-animation');
      }, 500);
    }, 400);
  }
};

const prevQuestion = id => {
  const prevElement = document.getElementById(`slider-${id - 1}`);
  const currentElement = document.getElementById(`slider-${id}`);

  if (currentElement && prevElement) {
    currentElement.classList.add('slide-left-back-animation');
    setTimeout(() => {
      prevElement.classList.remove('hidden');
      currentElement.classList.add('hidden');
      currentElement.classList.remove('slide-left-back-animation');
      prevElement.classList.add('slide-right-back-animation');

      setTimeout(() => {
        prevElement.classList.remove('slide-right-back-animation');
      }, 500);
    }, 400);
  }
};

const {
  abvs,
  priceRanges,
  countries,
  whiskeyTastingNotes,
  experienceLevels,
  abvThresholds,
} = await getParameters();

const showParameters = () => {
  return recommenderContent
    .replace(
      '${abvs}',
      abvs
        .map(
          abv => `
        <label class="answer" for="abv-${abv}"> <input type="radio" id="abv-${abv}" name="abv" value="${abv}" /><span>${abv}</span></label>`
        )
        .join('')
    )
    .replace(
      '${priceRanges}',
      priceRanges
        .map(
          priceRange => `
        <label class="answer" for="priceRange-${priceRange.id}"> <input type="radio" id="priceRange-${priceRange.id}" name="priceRange" value="${priceRange.id}"  /> <span>$${priceRange.min} - $${priceRange.max}</span></label>`
        )
        .join('')
    )
    .replace(
      '${countries}',
      countries
        .map(
          country => `
        <label class="answer" for="countries-${country}"><input type="radio" id="countries-${country}" name="country" value="${country}" /><span>${country}</span></label>`
        )
        .join('')
    )
    .replace(
      '${tastingNotes}',
      Object.keys(whiskeyTastingNotes)
        .map(
          tastingNote => `
        <label class="answer" for="tastingNote-${tastingNote}">  <input type="radio" id="tastingNote-${tastingNote}" name="tastingNote" value="${tastingNote}"><span>${tastingNote}</span></label>`
        )
        .join('')
    )
    .replace(
      '${experienceLevels}',
      experienceLevels
        .map(
          experienceLevel => `
        <label class="answer" for="experienceLevel-${experienceLevel}">  <input type="radio" id="experienceLevel-${experienceLevel}" name="experienceLevel" value="${experienceLevel}" /><span>${experienceLevel}</span></label>`
        )
        .join('')
    );
};

const getUserPreferences = () => {
  const abv = document.querySelector('input[name="abv"]:checked')?.value;
  const priceRange = document.querySelector(
    'input[name="priceRange"]:checked'
  )?.value;

  const country = document.querySelector(
    'input[name="country"]:checked'
  )?.value;

  const tastingNote = document.querySelector(
    'input[name="tastingNote"]:checked'
  )?.value;

  const experienceLevel = document.querySelector(
    'input[name="experienceLevel"]:checked'
  )?.value;

  return {
    abv: abv,
    priceRangeId: priceRange,
    country: country,
    tastingNotes: tastingNote,
    experienceLevel: experienceLevel,
  };
};

const showResults = whiskeyItemsResult => {
  const recommendationResultElement = document.getElementById(
    'recommendationResult'
  );

  if (recommendationResultElement) {
    const whiskeyItems = whiskeyItemsResult.map(x => x.whiskeyItem);

    recommendationResultElement.innerHTML = generateCatalogRows(whiskeyItems);
  }
};

const element = document.getElementById('recommender');
if (element) {
  element.innerHTML = showParameters();

  const recommenderBtn = document.getElementById('recommenderBtn');
  if (recommenderBtn) {
    let isAuthenticated = getWithExpiry('userName');

    if (isAuthenticated) {
      recommenderBtn.textContent = 'Learn results';
    } else {
      const textBefore = document.createElement('span');
      textBefore.textContent = 'Continue with';
      const img = document.createElement('img');
      img.src = '../../assets/icons/google.svg';
      img.title = 'Google icon';
      img.alt = 'Google icon';
      const textAfter = document.createElement('span');
      textAfter.textContent = 'to learn results';

      recommenderBtn.appendChild(textBefore);
      recommenderBtn.appendChild(img);
      recommenderBtn.appendChild(textAfter);
    }

    recommenderBtn.addEventListener('click', function () {
      const userPreferences = getUserPreferences();

      isAuthenticated = getWithExpiry('userName');
      if (isAuthenticated) {
        const whiskeyItemsResult = getWhiskeyRecommendation(
          userPreferences,
          abvThresholds,
          priceRanges,
          whiskeyTastingNotes
        );

        showResults(whiskeyItemsResult);
      } else {
        googleSignIn(() => {
          authCallbackAction();
          const whiskeyItemsResult = getWhiskeyRecommendation(
            userPreferences,
            abvThresholds,
            priceRanges,
            whiskeyTastingNotes
          );

          showResults(whiskeyItemsResult);
        });
      }
    });
  }

  for (let id = 1; id <= 5; id++) {
    const continueBtn = document.querySelector(`#slider-${id} .continue-btn`);
    if (continueBtn) {
      continueBtn.addEventListener('click', function (e) {
        e.preventDefault();
        nextQuestion(id);
      });
    }

    const backBtn = document.querySelector(`#slider-${id} .back-btn`);
    if (backBtn) {
      backBtn.addEventListener('click', function (e) {
        e.preventDefault();
        prevQuestion(id);
      });
    }
  }
}
