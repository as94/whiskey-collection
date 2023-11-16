import { getCategory } from '../../services/urlSearchParams.js';
import { whiskeyCategoryDescriptions } from '../../services/whiskeyCategoryDescriptions.js';
import categoryDescriptionContent from './categoryDescription.html';
import './categoryDescription.css';

const categoryDescription = () => {
  const category = getCategory();

  return categoryDescriptionContent
    .replace('${imageLink}', whiskeyCategoryDescriptions[category].ImageLink)
    .replace('${category}', category)
    .replace('${category}', category)
    .replace('${category}', category)
    .replace(
      '${description}',
      whiskeyCategoryDescriptions[category].Description
    );
};

const element = document.getElementById('category-description');
if (element) {
  element.innerHTML = categoryDescription();
}
