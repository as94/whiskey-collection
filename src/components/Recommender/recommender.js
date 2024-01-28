import recommenderContent from './recommender.html';
import './recommender.css';
import { getWhiskeyRecommendation } from '../../services/recommendation.js';
import { initializeWhiskey } from '../../services/loadWhiskey.js';
import { getWhiskey, getCountries } from '../../services/state.js';
import {
  lowPercentile,
  mediumPercentile,
  highPercentile,
  getPercentile,
} from '../../services/percentiles.js';
import { signIn, signOut } from '../../services/firebaseGoogle';
import { getWithExpiry } from '../../services/localStorage.js';

await initializeWhiskey();

const abvs = ['Low', 'Medium', 'High'];
let priceRanges = [];
const countries = getCountries().filter(
  country => country !== 'United Kingdom'
);
const experienceLevels = ['Novice', 'Intermediate', 'Expert'];

const whiskeyTastingNotes = {
  'Fruit Notes': [
    'Apple',
    'Baked apple',
    'Banana',
    'Berry',
    'Cherry',
    'Citrus',
    'Coconut',
    'Dark fruit',
    'Dried fruit',
    'Orange',
    'Pear',
    'Raisins',
    'Red fruit',
    'Stone fruit',
    'Tropical',
    'Tropical fruit',
  ],
  'Spice and Herb Notes': [
    'Anise',
    'Cinnamon',
    'Mint',
    'Nutmeg',
    'Pepper',
    'Spicy',
  ],
  'Sweet Notes': [
    'Balanced',
    'Butter',
    'Caramel',
    'Creamy',
    'Grainy sweetness',
    'Honey',
    'Malty',
    'Rich',
    'Round',
    'Salty',
    'Sweet',
    'Toasty',
    'Vanilla',
  ],
  'Floral and Herbal Notes': [
    'Floral',
    'Fresh',
    'Herbal',
    'Rose petal',
    'Vegetal',
    'Yeasty',
  ],
  'Wood and Smoke Notes': [
    'Bold',
    'Woody',
    'Hints of dry smoke',
    'Leather',
    'Oak',
    'Smoky',
  ],
  'Complex and Miscellaneous Notes': [
    'Biscuit',
    'Bright',
    'Flavored',
    'Harmonious',
    'Lingering',
    'Roasted',
    'Smooth',
  ],
};

const element = document.getElementById('recommender');
if (element) {
  const whiskeyItems = getWhiskey();

  const abvValues = whiskeyItems
    .filter(whiskey => whiskey.ABV)
    .map(whiskey => parseFloat(whiskey.ABV.replace('%', '')));
  const abvLowThreshold =
    Math.round(getPercentile(abvValues, lowPercentile) * 100) / 100;
  const abvMediumThreshold =
    Math.round(getPercentile(abvValues, mediumPercentile) * 100) / 100;
  const abvHighThreshold =
    Math.round(getPercentile(abvValues, highPercentile) * 100) / 100;

  const abvThresholds = [abvLowThreshold, abvMediumThreshold, abvHighThreshold];

  const priceValues = whiskeyItems
    .filter(whiskey => whiskey.Price)
    .map(whiskey => parseFloat(whiskey.Price.replace('$', '')));
  const priceLowTreshold =
    Math.round(getPercentile(priceValues, lowPercentile) * 100) / 100;
  const priceMediumTreshold =
    Math.round(getPercentile(priceValues, mediumPercentile) * 100) / 100;
  const priceHighTreshold =
    Math.round(getPercentile(priceValues, highPercentile) * 100) / 100;

  priceRanges = [
    { id: 1, min: 0, max: priceLowTreshold },
    { id: 2, min: priceLowTreshold, max: priceMediumTreshold },
    { id: 3, min: priceMediumTreshold, max: priceHighTreshold },
    { id: 4, min: priceHighTreshold, max: priceValues[priceValues.length - 1] },
  ];

  element.innerHTML = recommenderContent
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

  const recommenderBtn = document.getElementById('recommenderBtn');
  recommenderBtn.addEventListener('click', function () {
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

    const userPreferences = {
      abv: abv,
      priceRangeId: priceRange,
      country: country,
      tastingNotes: whiskeyTastingNotes[tastingNote].join(', '),
      experienceLevel: experienceLevel ?? 'Novice',
    };

    const whiskeyItemsResult = getWhiskeyRecommendation(
      userPreferences,
      abvThresholds,
      priceRanges
    );

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
