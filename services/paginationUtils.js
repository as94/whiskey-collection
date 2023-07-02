import { getWhiskeyByCategory, getWhiskeyBy } from './state.js';
import {
  getBrand,
  getCategory,
  getCountry,
  getPriceRange,
  getRoute,
  getSearchText,
} from '../services/urlSearchParams.js';
import {
  catalogByCategory,
  catalogBySearchResults,
} from '../services/routePaths.js';

export const whiskeyItemsPerPage = 9;
export const visiblePagesCount = 4;

export const getWhiskeyItemsCount = () => {
  let whiskeyItems = [];
  const route = getRoute();
  if (route === catalogByCategory) {
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
  return whiskeyItems.length;
};

export const getTotalPagesCount = () => {
  const whiskeyItemsCount = getWhiskeyItemsCount();
  return Math.ceil(whiskeyItemsCount / whiskeyItemsPerPage);
};

export const getPagesCount = () => {
  const totalPagesCount = getTotalPagesCount();
  return totalPagesCount < visiblePagesCount
    ? totalPagesCount
    : visiblePagesCount;
};
