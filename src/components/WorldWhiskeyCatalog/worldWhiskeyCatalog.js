import {
  getMainCategories,
  getWhiskeyByCategory,
} from '../../services/state.js';
import { getRandomItem } from '../../services/utils.js';
import { initializeWhiskey } from '../../services/loadWhiskey.js';
import { getCatalogByCategoriesLink } from '../../services/urlSearchParams.js';
import { whiskeyCategoryDescriptions } from '../../services/whiskeyCategoryDescriptions.js';
import worldWhiskeyCatalogContent from './worldWhiskeyCatalog.html';
import worldWhiskeyCardContent from './worldWhiskeyCard.html';
import './worldWhiskeyCatalog.css';

await initializeWhiskey();

const getCatalogItems = () => {
  let result = '';
  const categories = getMainCategories();
  const whiskeyByCategory = getWhiskeyByCategory();
  for (let index = 0; index < categories.length; index++) {
    const category = categories[index];
    const whiskey = getRandomItem(whiskeyByCategory[category]);

    result += worldWhiskeyCardContent
      .replace('${category}', category)
      .replace(
        '${catalogByCategoriesLink}',
        getCatalogByCategoriesLink(category)
      )
      .replace('${category}', category)
      .replace('${whiskeyImageLink}', whiskey.ImageLink)
      .replace('${category}', category)
      .replace('${category}', category)
      .replace(
        '${description}',
        whiskeyCategoryDescriptions[category].Description.split(/\s+/)
          .map(x => x.replace(',', ''))
          .slice(0, 15)
          .join(' ') + ' ...'
      );
  }

  return result;
};

const catalog = () =>
  worldWhiskeyCatalogContent.replace('${catalogItems}', getCatalogItems());

const element = document.getElementById('world-whiskey-catalog');
if (element) {
  element.innerHTML = catalog();
}
