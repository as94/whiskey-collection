import { getCategory } from '../../services/urlSearchParams.js';
import { whiskeyCategoryDescriptions } from '../../services/whiskeyCategoryDescriptions.js';

const response = await fetch(
  './components/CategoryDescription/categoryDescription.html'
);
const htmlContent = await response.text();

const categoryDescription = () => {
  const category = getCategory();

  return htmlContent
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
