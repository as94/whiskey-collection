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

  const userPreferences = {
    flavor: 'Sweet',
    abv: 'High',
    price_range: [0, priceLowTreshold],
    experience_level: 'Intermediate',
    category: 'Bourbon',
    tasting_notes: 'Caramel, Vanilla',
    country: 'United States',
  };

  const whiskey = getWhiskeyRecommendation(userPreferences);
  element.innerHTML = recommenderContent.replace(
    '${recommendationResult}',
    whiskey.Name
  );
}
