import {
  getMainCategories,
  getWhiskeyByCategory,
} from '../../services/state.js';
import { getRandomItem } from '../../services/utils.js';
import { initializeWhiskey } from '../../services/loadWhiskey.js';
import { getCatalogByCategoriesLink } from '../../services/urlSearchParams.js';
import { whiskeyCategoryDescriptions } from '../../services/whiskeyCategoryDescriptions.js';

await initializeWhiskey();

const getCatalogItems = () => {
  let result = '';
  const categories = getMainCategories();
  const whiskeyByCategory = getWhiskeyByCategory();
  for (let index = 0; index < categories.length; index++) {
    const category = categories[index];
    const whiskey = getRandomItem(whiskeyByCategory[category]);

    result += `<a class="card" data-whiskey-category="${category}" data-no-select href="${getCatalogByCategoriesLink(
      category
    )}">
        <h3 class="category-name h3">${category}</h3>
        <div class="category-link-container">
        <div class="category-link body-semibold"">
            Discover more
        </div>
        </div>
        <div class="category-image">
        <img
            class="background-image"
            src="${
              index % 2 === 0
                ? 'images/product-card-backgrounds/dark-green.webp'
                : 'images/product-card-backgrounds/light-green.webp'
            }"
        />
        <img class="foreground-image" src="${
          whiskey.ImageLink
        }" title="${category}" alt="${category}" />
        </div>
        <p class="category-description body-semibold">
          ${
            whiskeyCategoryDescriptions[category].Description.split(/\s+/)
              .map(x => x.replace(',', ''))
              .slice(0, 15)
              .join(' ') + ' ...'
          }
        </p>
    </a>`;
  }

  return result;
};

const catalog = () => `
<link rel="stylesheet" href="./components/WorldWhiskeyCatalog/worldWhiskeyCatalog.css" />
<div class="catalog">
  ${getCatalogItems()}
</div>
`;

const element = document.getElementById('world-whiskey-catalog');
if (element) {
  element.innerHTML = catalog();
}
