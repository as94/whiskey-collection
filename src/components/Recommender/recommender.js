import recommenderContent from './recommender.html';
import './recommender.css';
import { getWhiskeyRecommendation } from '../../services/recommendation.js';
import { initializeWhiskey } from '../../services/loadWhiskey.js';

await initializeWhiskey();

const element = document.getElementById('recommender');
if (element) {
  const whiskey = getWhiskeyRecommendation();
  element.innerHTML = recommenderContent.replace(
    '${recommendationResult}',
    whiskey.Name
  );
}
