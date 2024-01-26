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

await initializeWhiskey();

const abvs = ['Low', 'Medium', 'High'];
let priceRanges = [];
const countries = getCountries();
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

  const userPreferences = {
    abv: 'High',
    priceRangeId: 4,
    country: 'United States',
    tastingNotes: 'Caramel, Vanilla',
    experienceLevel: 'Intermediate',
  };

  const whiskeyItemsResult = getWhiskeyRecommendation(
    userPreferences,
    abvThresholds,
    priceRanges
  );

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
        <input type="radio" id="priceRange-${priceRange.id}" name="priceRange" value="$${priceRange.min} - $${priceRange.max}" />
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
      '${recommendationResult}',
      whiskeyItemsResult
        .map(
          item =>
            `<li>${item.whiskeyItem.Name.replace(' Review', '')} - ${
              item.score
            }</li>`
        )
        .join('')
    );
}
