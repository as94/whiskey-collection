import recommenderContent from './recommender.html';
import './recommender.css';
import { getWhiskeyRecommendation } from '../../services/recommendation.js';
import { googleSignIn, signOut } from '../../services/firebase.js';
import { getParameters } from './parameters.js';
import {
  setWithExpiry,
  getWithExpiry,
  twoWeeksExpiration,
  remove,
} from '../../services/localStorage';

const nextQuestion = id => {
  const currentElement = document.getElementById(`question-${id}`);
  const nextElement = document.getElementById(`question-${id + 1}`);

  if (currentElement && nextElement) {
    currentElement.classList.add('slide-left-animation');

    setTimeout(() => {
      nextElement.classList.remove('hidden');
      currentElement.classList.add('hidden');
      currentElement.classList.remove('slide-left-animation');
      nextElement.classList.add('slide-right-animation');

      setTimeout(() => {
        nextElement.classList.remove('slide-right-animation');
      }, 500);
    }, 400);
  }
};

const prevQuestion = id => {
  const prevElement = document.getElementById(`question-${id - 1}`);
  const currentElement = document.getElementById(`question-${id}`);

  if (currentElement && prevElement) {
    // currentElement.classList.add('slide-right-animation');
    //   setTimeout(() => {
    //     prevElement.classList.remove('hidden');
    //     currentElement.classList.add('hidden');
    //     currentElement.classList.remove('slide-right-animation');
    //     prevElement.classList.add('slide-left-animation');
    //     setTimeout(() => {
    //       prevElement.classList.remove('slide-left-animation');
    //     }, 500);
    //   }, 400);
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

const showParameters = existingUserPreferences => {
  return recommenderContent
    .replace(
      '${abvs}',
      abvs
        .map(
          abv => `
        <label class="answer" for="abv-${abv}"> <input type="radio" id="abv-${abv}" name="abv" value="${abv}" ${
            existingUserPreferences?.abv === abv ? 'checked' : ''
          } /><span>${abv}</span></label>`
        )
        .join('')
    )
    .replace(
      '${priceRanges}',
      priceRanges
        .map(
          priceRange => `
        <label class="answer" for="priceRange-${
          priceRange.id
        }"> <input type="radio" id="priceRange-${
            priceRange.id
          }" name="priceRange" value="${priceRange.id}" ${
            parseInt(existingUserPreferences?.priceRangeId) === priceRange.id
              ? 'checked'
              : ''
          } /> <span>$${priceRange.min} - $${priceRange.max}</span></label>`
        )
        .join('')
    )
    .replace(
      '${countries}',
      countries
        .map(
          country => `
        <label class="answer" for="countries-${country}"><input type="radio" id="countries-${country}" name="country" value="${country}" ${
            existingUserPreferences?.country === country ? 'checked' : ''
          } /><span>${country}</span></label>`
        )
        .join('')
    )
    .replace(
      '${tastingNotes}',
      Object.keys(whiskeyTastingNotes)
        .map(
          tastingNote => `
        <label class="answer" for="tastingNote-${tastingNote}">  <input type="radio" id="tastingNote-${tastingNote}" name="tastingNote" value="${tastingNote}" ${
            existingUserPreferences?.tastingNotes === tastingNote
              ? 'checked'
              : ''
          }><span>${tastingNote}</span></label>`
        )
        .join('')
    )
    .replace(
      '${experienceLevels}',
      experienceLevels
        .map(
          experienceLevel => `
        <label class="answer" for="experienceLevel-${experienceLevel}">  <input type="radio" id="experienceLevel-${experienceLevel}" name="experienceLevel" value="${experienceLevel}" ${
            existingUserPreferences?.experienceLevel === experienceLevel
              ? 'checked'
              : ''
          } /><span>${experienceLevel}</span></label>`
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
    const parent = recommendationResultElement.parentNode;
    const newList = document.createElement('ul');
    newList.id = 'recommendationResult';

    for (const item of whiskeyItemsResult) {
      const li = document.createElement('li');
      li.textContent = `${item.whiskeyItem.Name.replace(' Review', '')}, ${
        item.whiskeyItem.ABV
      }, ${item.whiskeyItem.Country}, ${item.whiskeyItem.Price}, ${
        item.whiskeyItem.TastingNotes
      } - ${item.score}`;
      newList.appendChild(li);
    }

    parent.replaceChild(newList, recommendationResultElement);
  }
};

const element = document.getElementById('recommender');
if (element) {
  // TODO: rewrite
  // await handleSignInResult();

  const existingUserPreferences = getWithExpiry('userPreferences');

  element.innerHTML = showParameters(existingUserPreferences);

  // const isAuthenticated = getWithExpiry('userName');
  // if (isAuthenticated && existingUserPreferences) {
  //   const whiskeyItemsResult = getWhiskeyRecommendation(
  //     existingUserPreferences,
  //     abvThresholds,
  //     priceRanges,
  //     whiskeyTastingNotes
  //   );

  //   showResults(whiskeyItemsResult);
  // }

  // const recommenderBtn = document.getElementById('recommenderBtn');
  // recommenderBtn.addEventListener('click', function () {
  //   const userPreferences = getUserPreferences();

  //   if (isAuthenticated) {
  //     const whiskeyItemsResult = getWhiskeyRecommendation(
  //       userPreferences,
  //       abvThresholds,
  //       priceRanges,
  //       whiskeyTastingNotes
  //     );

  //     showResults(whiskeyItemsResult);
  //     remove('userPreferences');
  //   } else {
  //     setWithExpiry('userPreferences', userPreferences, twoWeeksExpiration);
  //     googleSignIn();
  //   }
  // });

  for (let id = 1; id <= 4; id++) {
    const continueBtn = document.querySelector(`#question-${id} .continue-btn`);
    if (continueBtn) {
      continueBtn.addEventListener('click', function (e) {
        e.preventDefault();
        nextQuestion(id);
      });
    }
  }

  for (let id = 1; id <= 4; id++) {
    const backBtn = document.querySelector(`#question-${id} .back-btn`);
    if (backBtn) {
      backBtn.addEventListener('click', function (e) {
        e.preventDefault();
        prevQuestion(id);
      });
    }
  }
}
