import { nameAsc } from './orderBySettings.js';

export const changeCategory = category => {
  const params = new URLSearchParams(window.location.search);
  params.set('category', category);
  const newUrl = 'catalog.html' + '?' + params.toString();
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

export const changeSearchResults = (country, brand, priceRange, searchText) => {
  const params = new URLSearchParams(window.location.search);
  params.set('country', country);
  params.set('brand', brand);
  params.set('priceRange', priceRange);
  if (searchText) {
    params.set('searchText', searchText);
  }
  params.set('page', 1);
  const newUrl = 'searchResults.html' + '?' + params.toString();
  window.location.href = newUrl;
};
