import {
  getMainCategories,
  getWhiskeyByCategory,
} from '../../services/state.js';
import { getRandomItem } from '../../services/utils.js';
import { initializeWhiskey } from '../../services/loadWhiskey.js';
import { goToCatalogByCategories } from '../../services/urlSearchParams.js';
import { whiskeyCategoryDescriptions } from '../../services/whiskeyCategoryDescriptions.js';

await initializeWhiskey();

const getCatalogItems = () => {
  let result = '';
  const categories = getMainCategories();
  const whiskeyByCategory = getWhiskeyByCategory();
  for (let index = 0; index < categories.length; index++) {
    const category = categories[index];
    const whiskey = getRandomItem(whiskeyByCategory[category]);

    result += `<div class="card" data-whiskey-category="${category}">
        <h3 class="category-name h3">${category}</h3>
        <div class="category-link-container">
        <a class="category-link body-semibold">
            Discover more
        </a>
        </div>
        <div class="category-image">
        <img
            class="background-image"
            src="${
              index % 2 === 0
                ? 'images/product-card-backgrounds/dark-green.png'
                : 'images/product-card-backgrounds/light-green.png'
            }"
        />
        <img class="foreground-image" src="${whiskey.ImageLink}" />
        </div>
        <p class="category-description body-semibold">
        ${whiskeyCategoryDescriptions[category]}
        </p>
    </div>`;
  }

  return result;
};

$(document).on('click', '.card', function () {
  const category = $(this).data('whiskey-category');
  goToCatalogByCategories(category);
});

const catalog = () => `
<link rel="stylesheet" href="./components/WorldWhiskeyCatalog/worldWhiskeyCatalog.css" />
<div class="catalog">
  ${getCatalogItems()}
</div>
`;

$('#world-whiskey-catalog').html(catalog());
