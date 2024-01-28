import recommenderContent from './recommender.html';
import './recommender.css';
import { getWhiskeyRecommendation } from '../../services/recommendation.js';
import { signIn, signOut } from '../../services/firebaseGoogle';
import { getWithExpiry } from '../../services/localStorage.js';
import { getParameters } from './parameters.js';

const {
  abvs,
  priceRanges,
  countries,
  whiskeyTastingNotes,
  experienceLevels,
  abvThresholds,
} = await getParameters();

const showParameters = () =>
  recommenderContent
    .replace(
      '${abvs}',
      abvs
        .map(
          abv => `
        <input type="radio" id="abv-${abv}" name="abv" value="${abv}" />
        <label for="abv">${abv}</label><br />`
        )
        .join('')
    )
    .replace(
      '${priceRanges}',
      priceRanges
        .map(
          priceRange => `
        <input type="radio" id="priceRange-${priceRange.id}" name="priceRange" value="${priceRange.id}" />
        <label for="priceRange">$${priceRange.min} - $${priceRange.max}</label><br />`
        )
        .join('')
    )
    .replace(
      '${countries}',
      countries
        .map(
          country => `
        <input type="radio" id="countries-${country}" name="country" value="${country}" />
        <label for="country">${country}</label><br />`
        )
        .join('')
    )
    .replace(
      '${tastingNotes}',
      Object.keys(whiskeyTastingNotes)
        .map(
          tastingNote => `
        <input type="radio" id="tastingNote-${tastingNote}" name="tastingNote" value="${tastingNote}">
        <label for="tastingNote">${tastingNote}</label><br>`
        )
        .join('')
    )
    .replace(
      '${experienceLevels}',
      experienceLevels
        .map(
          experienceLevel => `
        <input type="radio" id="experienceLevel-${experienceLevel}" name="experienceLevel" value="${experienceLevel}" />
        <label for="experienceLevel">${experienceLevel}</label><br />`
        )
        .join('')
    )
    .replace(
      '${signInWithGoogle}',
      getWithExpiry('token')
        ? '<input id="signOut" type="button" value="Sign Out" />'
        : '<input id="signInWithGoogle" type="button" value="Sign In With Google" />'
    );

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
    tastingNotes: whiskeyTastingNotes[tastingNote].join(', '),
    experienceLevel: experienceLevel ?? 'Novice',
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
  element.innerHTML = showParameters();

  const recommenderBtn = document.getElementById('recommenderBtn');
  recommenderBtn.addEventListener('click', function () {
    const userPreferences = getUserPreferences();
    const whiskeyItemsResult = getWhiskeyRecommendation(
      userPreferences,
      abvThresholds,
      priceRanges
    );

    showResults(whiskeyItemsResult);
  });

  const signInWithGoogleBtn = document.getElementById('signInWithGoogle');
  if (signInWithGoogleBtn) {
    signInWithGoogleBtn.addEventListener('click', function () {
      signIn();
    });
  }

  const signOutBtn = document.getElementById('signOut');
  if (signOutBtn) {
    signOutBtn.addEventListener('click', function () {
      signOut();
    });
  }
}
