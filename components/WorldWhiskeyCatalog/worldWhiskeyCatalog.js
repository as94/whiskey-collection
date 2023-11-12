import {
  getMainCategories,
  getWhiskeyByCategory,
} from '../../services/state.js';
import { getRandomItem } from '../../services/utils.js';
import { initializeWhiskey } from '../../services/loadWhiskey.js';
import { getCatalogByCategoriesLink } from '../../services/urlSearchParams.js';
import { whiskeyCategoryDescriptions } from '../../services/whiskeyCategoryDescriptions.js';

await initializeWhiskey();

const response = await fetch(
  './components/WorldWhiskeyCatalog/worldWhiskeyCatalog.html'
);
const htmlContent = await response.text();

const cardResponse = await fetch(
  './components/WorldWhiskeyCatalog/worldWhiskeyCard.html'
);
const cardHtmlContent = await cardResponse.text();

const getCatalogItems = () => {
  let result = '';
  const categories = getMainCategories();
  const whiskeyByCategory = getWhiskeyByCategory();
  for (let index = 0; index < categories.length; index++) {
    const category = categories[index];
    const whiskey = getRandomItem(whiskeyByCategory[category]);

    result += cardHtmlContent
      .replace('${category}', category)
      .replace(
        '${catalogByCategoriesLink}',
        getCatalogByCategoriesLink(category)
      )
      .replace('${category}', category)
      .replace(
        '${categoryBackground}',
        index % 2 === 0
          ? 'assets/images/product-card-backgrounds/dark-green.webp'
          : 'assets/images/product-card-backgrounds/light-green.webp'
      )
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

const catalog = () => htmlContent.replace('${catalogItems}', getCatalogItems());

const element = document.getElementById('world-whiskey-catalog');
if (element) {
  element.innerHTML = catalog();
}
