import { getWhiskeyByCategory, getWhiskeyBy } from '../../services/state.js';
import {
  getCategory,
  getPage,
  getOrderBy,
  getBrand,
  getCountry,
  getPriceRange,
  getRoute,
  getSearchText,
  goToProductCard,
} from '../../services/urlSearchParams.js';
import { initializeWhiskey } from '../../services/loadWhiskey.js';
import { whiskeyItemsPerPage } from '../../services/paginationUtils.js';
import {
  nameAsc,
  nameDesc,
  priceAsc,
  priceDesc,
  popularDesc,
} from '../../services/orderBySettings.js';
import {
  catalogByCategories,
  catalogBySearchResults,
} from '../../services/routePaths.js';

await initializeWhiskey();

const getWhiskeyItems = () => {
  let whiskeyItems = [];
  const route = getRoute();
  if (route === catalogByCategories) {
    const category = getCategory();
    if (category) {
      const whiskeyByCategory = getWhiskeyByCategory();
      whiskeyItems = whiskeyByCategory[category];
    }
  }

  if (route === catalogBySearchResults) {
    const country = getCountry();
    const brand = getBrand();
    const priceRange = getPriceRange();
    const searchText = getSearchText();

    whiskeyItems = getWhiskeyBy(country, brand, priceRange, searchText);
  }

  const page = getPage();
  const orderBy = getOrderBy();
  whiskeyItems = whiskeyItems
    .sort((a, b) => {
      switch (orderBy) {
        case nameAsc:
          return a.Name.localeCompare(b.Name);
        case nameDesc:
          return b.Name.localeCompare(a.Name);
        case priceAsc:
          return parseFloat(a.Price.slice(1)) - parseFloat(b.Price.slice(1));
        case priceDesc:
          return parseFloat(b.Price.slice(1)) - parseFloat(a.Price.slice(1));
        case popularDesc:
          const weightA = a.Rating * Math.log10(a.RateCount + 1);
          const weightB = b.Rating * Math.log10(b.RateCount + 1);

          const difference = weightB - weightA;

          if (Number(difference.toFixed(2)) !== 0) {
            return difference;
          }

          return a.Name.localeCompare(b.Name);
      }
    })
    .slice((page - 1) * whiskeyItemsPerPage, whiskeyItemsPerPage * page);

  return whiskeyItems;
};

const generateCatalogRows = whiskeyItems => {
  let result = '';
  for (let index = 0; index < whiskeyItems.length; index++) {
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
      <div class="whiskey-name body-semibold-18">
        ${whiskey.Name}
      </div>
      <div class="whiskey-characteristics body-regular-18">${
        whiskey.ABV ? `${whiskey.ABV} / ${whiskey.Price}` : `${whiskey.Price}`
      }</div>
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
      <div class="whiskey-name body-semibold-18">
        ${whiskey.Name}
      </div>
      <div class="whiskey-characteristics body-regular-18">${
        whiskey.ABV ? `${whiskey.ABV} / ${whiskey.Price}` : `${whiskey.Price}`
      }</div>
    </div>`;
    }
  }

  if (whiskeyItems.length % 3 === 2) {
    result += `<div class="empty-block"></div>`;
  }

  return result;
};

export const catalog = whiskeyItems => {
  const result = `
<link rel="stylesheet" href="./components/Catalog/catalog.css" />
<div class="catalog">
  ${generateCatalogRows(whiskeyItems)}
</div>
`;

  $(document).ready(function () {
    $('.card').click(function () {
      const productName = $(this).find('.whiskey-name').text().trim();
      goToProductCard(productName);
    });
  });

  return result;
};

const whiskeyItems = getWhiskeyItems();
$('#catalog').html(catalog(whiskeyItems));
