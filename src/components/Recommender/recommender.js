import recommenderContent from './recommender.html';
import './recommender.css';
import { getWhiskeyRecommendation } from '../../services/recommendation.js';
import {
  googleSignIn,
  signOut,
  handleSignInResult,
} from '../../services/firebase.js';
import { getParameters } from './parameters.js';
import {
  setWithExpiry,
  getWithExpiry,
  twoWeeksExpiration,
  remove,
} from '../../services/localStorage';

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
        <input type="radio" id="abv-${abv}" name="abv" value="${abv}" ${
            existingUserPreferences?.abv === abv ? 'checked' : ''
          } />
        <label for="abv">${abv}</label><br />`
        )
        .join('')
    )
    .replace(
      '${priceRanges}',
      priceRanges
        .map(
          priceRange => `
        <input type="radio" id="priceRange-${
          priceRange.id
        }" name="priceRange" value="${priceRange.id}" ${
            parseInt(existingUserPreferences?.priceRangeId) === priceRange.id
              ? 'checked'
              : ''
          } />
        <label for="priceRange">$${priceRange.min} - $${
            priceRange.max
          }</label><br />`
        )
        .join('')
    )
    .replace(
      '${countries}',
      countries
        .map(
          country => `
        <input type="radio" id="countries-${country}" name="country" value="${country}" ${
            existingUserPreferences?.country === country ? 'checked' : ''
          } />
        <label for="country">${country}</label><br />`
        )
        .join('')
    )
    .replace(
      '${tastingNotes}',
      Object.keys(whiskeyTastingNotes)
        .map(
          tastingNote => `
        <input type="radio" id="tastingNote-${tastingNote}" name="tastingNote" value="${tastingNote}" ${
            existingUserPreferences?.tastingNotes === tastingNote
              ? 'checked'
              : ''
          }>
        <label for="tastingNote">${tastingNote}</label><br>`
        )
        .join('')
    )
    .replace(
      '${experienceLevels}',
      experienceLevels
        .map(
          experienceLevel => `
        <input type="radio" id="experienceLevel-${experienceLevel}" name="experienceLevel" value="${experienceLevel}" ${
            existingUserPreferences?.experienceLevel === experienceLevel
              ? 'checked'
              : ''
          } />
        <label for="experienceLevel">${experienceLevel}</label><br />`
        )
        .join('')
    )
    .replace(
      '${signOut}',
      getWithExpiry('userName')
        ? '<input id="signOut" type="button" value="Sign Out" />'
        : ''
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
  await handleSignInResult();

  const existingUserPreferences = getWithExpiry('userPreferences');

  element.innerHTML = showParameters(existingUserPreferences);

  const isAuthenticated = getWithExpiry('userName');
  if (isAuthenticated && existingUserPreferences) {
    const whiskeyItemsResult = getWhiskeyRecommendation(
      existingUserPreferences,
      abvThresholds,
      priceRanges,
      whiskeyTastingNotes
    );

    showResults(whiskeyItemsResult);
  }

  const recommenderBtn = document.getElementById('recommenderBtn');
  recommenderBtn.addEventListener('click', function () {
    const userPreferences = getUserPreferences();

    if (isAuthenticated) {
      const whiskeyItemsResult = getWhiskeyRecommendation(
        userPreferences,
        abvThresholds,
        priceRanges,
        whiskeyTastingNotes
      );

      showResults(whiskeyItemsResult);
      remove('userPreferences');
    } else {
      setWithExpiry('userPreferences', userPreferences, twoWeeksExpiration);
      googleSignIn();
    }
  });

  const signOutBtn = document.getElementById('signOut');
  if (signOutBtn) {
    signOutBtn.addEventListener('click', function () {
      signOut();
    });
  }
}
