import {
  getMainCategories,
  getWhiskeyByCategory,
} from '../../services/state.js';
import { getRandomItem } from '../../services/utils.js';
import { whiskeyLoaded } from '../../services/customEvents.js';
import { changeCategory } from '../../services/urlSearchParams.js';
import { whiskeyCategoryDescriptions } from '../../services/whiskeyCategoryDescriptions.js';

const getCatalogItems = () => {
  let result = '';
  const categories = getMainCategories();
  const whiskeyByCategory = getWhiskeyByCategory();
  for (let index = 0; index < categories.length; index++) {
    const category = categories[index];
    const whiskey = getRandomItem(whiskeyByCategory[category]);

    result += `<div class="card" data-whiskey-category="${category}">
        <div class="category-name h-3">${category}</div>
        <div class="category-link-container">
        <a class="category-link body-text-14">
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
        <p class="category-description body-text-16">
        ${whiskeyCategoryDescriptions[category]}
        </p>
    </div>`;
  }

  return result;
};

$(document).on('click', '.card', function () {
  const category = $(this).data('whiskey-category');
  changeCategory(category);
});

const catalog = () => `
<link rel="stylesheet" href="./components/WorldWhiskeyCatalog/worldWhiskeyCatalog.css" />
<div class="catalog">
  ${getCatalogItems()}
</div>
`;

window.addEventListener(whiskeyLoaded, () => {
  $('#world-whiskey-catalog').html(catalog());
});
