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
  getProductCardLink,
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
      result += `<a class="card" data-no-select href="${getProductCardLink(
        whiskey.Name
      )}">
      <div class="whiskey-image">
        <img
          class="background-image"
          src="images/product-card-backgrounds/dark-green.webp"
        />
        <img class="foreground-image" src="${whiskey.ImageLink}" title="${
        whiskey.Name
      }" alt="${whiskey.Description}" />
      </div>
      <div class="whiskey-name body-semibold-large">
        ${whiskey.Name}
      </div>
      <div class="whiskey-characteristics body-regular-large">
        <span class="price">${whiskey.Price}</span>
        <div class="rating">
          <img class="star-icon" src="icons/star.svg" />
          <span>${whiskey.Rating} (${whiskey.RateCount})</span>
        </div>
      </div>
    </a>`;
    } else {
      result += `<a class="card" data-no-select href="${getProductCardLink(
        whiskey.Name
      )}">
      <div class="whiskey-image">
        <img
          class="background-image"
          src="images/product-card-backgrounds/light-green.webp"
        />
        <img class="foreground-image" src="${whiskey.ImageLink}" title="${
        whiskey.Name
      }" alt="${whiskey.Description}" />
      </div>
      <div class="whiskey-name body-semibold-large">
        ${whiskey.Name}
      </div>
      <div class="whiskey-characteristics body-regular-large">
        <span class="price">${whiskey.Price}</span>
        <div class="rating">
          <img class="star-icon" src="icons/star.svg" />
          <span>${whiskey.Rating} (${whiskey.RateCount})</span>
        </div>
      </div>
    </a>`;
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

  return result;
};

const whiskeyItems = getWhiskeyItems();

const element = document.getElementById('catalog');
if (element) {
  element.innerHTML = catalog(whiskeyItems);
}
