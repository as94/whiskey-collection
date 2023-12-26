import { getCategory } from '../../services/urlSearchParams.js';
import { whiskeyCategoryDescriptions } from '../../services/whiskeyCategoryDescriptions.js';
import { getWhiskeyByCategory } from '../../services/state.js';
import { initializeWhiskey } from '../../services/loadWhiskey.js';
import { popularity } from '../../services/sortWhiskeyBy.js';
import categoryDescriptionContent from './categoryDescription.html';
import './categoryDescription.css';

await initializeWhiskey();

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

  const category = getCategory();
  document.title = category;

  var descriptionMetaTag = document.querySelector('meta[name="description"]');
  if (descriptionMetaTag) {
    descriptionMetaTag.setAttribute(
      'content',
      whiskeyCategoryDescriptions[category].Description
    );
  }

  const whiskeyByCategory = getWhiskeyByCategory();
  const keywords = whiskeyByCategory[category]
    .sort(popularity)
    .slice(0, 10)
    .map(whiskey => whiskey.Name)
    .join(', ');
  var keywordsMetaTag = document.querySelector('meta[name="keywords"]');
  if (keywordsMetaTag) {
    keywordsMetaTag.setAttribute('content', keywords);
  }
}
