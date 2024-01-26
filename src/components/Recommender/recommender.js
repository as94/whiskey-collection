import recommenderContent from './recommender.html';
import './recommender.css';
import { getWhiskeyRecommendation } from '../../services/recommendation.js';
import { initializeWhiskey } from '../../services/loadWhiskey.js';
import { getWhiskey } from '../../services/state.js';
import {
  lowPercentile,
  mediumPercentile,
  highPercentile,
  getPercentile,
} from '../../services/percentiles.js';

const abvs = ['Low', 'Medium', 'High'];
let priceRanges = [];

await initializeWhiskey();

const element = document.getElementById('recommender');
if (element) {
  const whiskeyItems = getWhiskey();

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
    abv: 'High', // Low, Medium, High
    priceRangeId: 4,
    experienceLevel: 'Intermediate', // Novice, Intermediate, Expert
    category: 'Bourbon', // all categories
    tastingNotes: 'Caramel, Vanilla', // all tasting notes
    country: 'United States', // all countries
  };

  const whiskeyItemsResult = getWhiskeyRecommendation(
    userPreferences,
    priceRanges
  );
  element.innerHTML = recommenderContent.replace(
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
