import { getWhiskeyByCategory } from '../../services/state.js';
import { getCategory, getPage } from '../../services/urlSearchParams.js';
import { whiskeyLoaded } from '../../services/customEvents.js';
import { whiskeyItemsPerPage } from '../../services/paginationSettings.js';

const generateCatalogRows = () => {
  const category = getCategory();
  const whiskeyByCategory = getWhiskeyByCategory();
  const page = getPage();
  const whiskeyItems = whiskeyByCategory[category]
    .sort((a, b) => a.Name.localeCompare(b.Name))
    .slice((page - 1) * whiskeyItemsPerPage, whiskeyItemsPerPage * page);
  const count = whiskeyItems.length;
  let result = '';
  for (let index = 0; index < count; index++) {
    const whiskey = whiskeyItems[index];
    if (index % 2 === 0) {
      result += `<div class="card">
      <div class="whiskey-image">
        <img
          class="background-image"
          src="images/product-card-backgrounds/dark-green.png"
        />
        <img class="foreground-image" src="${whiskey.ImageLink}" />
      </div>
      <div class="whiskey-name body-text-18">
        ${whiskey.Name}
      </div>
      <div class="whiskey-characteristics body-text-18">${whiskey.ABV}</div>
    </div>`;
    } else {
      result += `<div class="card">
      <div class="whiskey-image">
        <img
          class="background-image"
          src="images/product-card-backgrounds/light-green.png"
        />
        <img class="foreground-image" src="${whiskey.ImageLink}" />
      </div>
      <div class="whiskey-name body-text-18">
        ${whiskey.Name}
      </div>
      <div class="whiskey-characteristics body-text-18">${whiskey.ABV}</div>
    </div>`;
    }
  }

  // TODO: rewrite, fill empty space with dummy pictures
  // if (count % 3 !== 0) {
  //   result += `<div class="card">
  //     <img src="images/atmosphere-1.jpg" />
  //   </div>`;
  // }

  return result;
};

export const catalog = () => `
<link rel="stylesheet" href="./components/Catalog/catalog.css" />
<div class="catalog">
  ${generateCatalogRows()}
</div>
`;

$(document).ready(() => {
  $('.card').click(() => {
    window.location.href = 'productCard.html';
  });
});

window.addEventListener(whiskeyLoaded, () => {
  $('#catalog').html(catalog());
});
