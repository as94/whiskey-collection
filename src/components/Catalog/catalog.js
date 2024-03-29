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
import { popularity } from '../../services/sortWhiskeyBy.js';
import catalogContent from './catalog.html';
import cardContent from './card.html';
import './catalog.css';

await initializeWhiskey();

const getWhiskeyItems = route => {
  let whiskeyItems = [];
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
          return popularity(a, b);
      }
    })
    .slice((page - 1) * whiskeyItemsPerPage, whiskeyItemsPerPage * page);

  return whiskeyItems;
};

export const generateCatalogRows = whiskeyItems => {
  let result = '';
  for (let index = 0; index < whiskeyItems.length; index++) {
    const whiskey = whiskeyItems[index];

    result += cardContent
      .replace('${productCardLink}', getProductCardLink(whiskey.Name))
      .replace('${imageLink}', whiskey.ImageLink)
      .replace('${name}', whiskey.Name)
      .replace('${description}', whiskey.Description)
      .replace('${name}', whiskey.Name)
      .replace('${price}', whiskey.Price)
      .replace('${rating}', whiskey.Rating)
      .replace('${rateCount}', whiskey.RateCount);
  }

  if (whiskeyItems.length % 3 === 2) {
    result += `<div class="empty-block"></div>`;
  }

  return result;
};

export const catalog = whiskeyItems =>
  catalogContent.replace('${catalogRows}', generateCatalogRows(whiskeyItems));

const route = getRoute();
const whiskeyItems = getWhiskeyItems(route);

const element = document.getElementById('catalog');
if (element) {
  element.innerHTML = catalog(whiskeyItems);

  const canonicalLink = document.getElementById('canonicalLink');
  if (route === catalogByCategories) {
    const category = getCategory();
    if (category) {
      const params = new URLSearchParams();
      params.set('category', category);
      canonicalLink.href = `${window.location.protocol}//${
        window.location.host
      }/catalog-by-categories?${params.toString()}`;
    }
  }

  if (route === catalogBySearchResults) {
    const country = getCountry();
    const brand = getBrand();
    const priceRange = getPriceRange();
    const searchText = getSearchText();
    const params = new URLSearchParams();
    params.set('searchText', searchText);
    params.set('country', country);
    params.set('brand', brand);
    params.set('priceRange', priceRange);
    canonicalLink.href = `${window.location.protocol}//${
      window.location.host
    }/catalog-by-search-results?${params.toString()}`;
  }
}
