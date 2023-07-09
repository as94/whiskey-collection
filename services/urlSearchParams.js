import { nameAsc } from './orderBySettings.js';
import {
  catalogByCategories,
  catalogBySearchResults,
  productCard,
  main,
} from './routePaths.js';

export const getRoute = () => {
  const path = window.location.pathname.slice(1);
  if (path === catalogByCategories) {
    return catalogByCategories;
  }
  if (path === catalogBySearchResults) {
    return catalogBySearchResults;
  }
  if (path === productCard) {
    return productCard;
  }
  return main;
};

const clearParams = params => {
  const keys = [];
  for (const key of params.keys()) {
    keys.push(key);
  }
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    params.delete(key);
  }
};

export const changeCategory = category => {
  const params = new URLSearchParams(window.location.search);
  clearParams(params);
  params.set('category', category);
  const newUrl = catalogByCategories + '?' + params.toString();
  window.location.href = newUrl;
};

export const changeSearchResults = (country, brand, priceRange, searchText) => {
  const params = new URLSearchParams(window.location.search);
  clearParams(params);
  params.set('country', country);
  params.set('brand', brand);
  params.set('priceRange', priceRange);
  params.set('searchText', searchText);
  params.set('page', 1);
  const newUrl = catalogBySearchResults + '?' + params.toString();
  window.location.href = newUrl;
};

export const getCategory = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('category');
};

export const changePage = page => {
  const params = new URLSearchParams(window.location.search);
  params.set('page', page);
  const newUrl =
    window.location.pathname + '?' + params.toString() + '#catalog-result';
  window.location.href = newUrl;
};

export const getPage = () => {
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page');
  if (page) {
    return Number(page);
  }
  return 1;
};

export const getOrderBy = () => {
  const params = new URLSearchParams(window.location.search);
  const orderBy = params.get('orderBy');
  if (orderBy) {
    return orderBy;
  }
  return nameAsc;
};

export const changeOrderBy = orderBy => {
  const params = new URLSearchParams(window.location.search);
  params.set('orderBy', orderBy);
  params.set('page', 1);
  const newUrl =
    window.location.pathname + '?' + params.toString() + '#catalog-result';
  window.location.href = newUrl;
};

export const getCountry = () => {
  const params = new URLSearchParams(window.location.search);
  const country = params.get('country');
  if (country) {
    return country;
  }
  return 'Any';
};

export const getBrand = () => {
  const params = new URLSearchParams(window.location.search);
  const brand = params.get('brand');
  if (brand) {
    return brand;
  }
  return 'Any';
};

export const getPriceRange = () => {
  const params = new URLSearchParams(window.location.search);
  const priceRange = params.get('priceRange');
  if (priceRange) {
    return priceRange;
  }
  return 'Any';
};

export const getSearchText = () => {
  const params = new URLSearchParams(window.location.search);
  const searchText = params.get('searchText');
  if (searchText) {
    return searchText;
  }
  return '';
};

export const changeProductCard = productName => {
  const params = new URLSearchParams(window.location.search);
  params.set('productName', productName);
  const newUrl = productCard + '?' + params.toString();
  window.location.href = newUrl;
};

export const getProductName = () => {
  const params = new URLSearchParams(window.location.search);
  const productName = params.get('productName');
  return productName;
};
