import { groupBy } from './utils.js';

const state = {
  whiskey: [],
  whiskeyByCategory: {},
  mainCategories: [],
  countries: [],
  brands: [],
};

export const setWhiskey = whiskey => {
  state.whiskey = whiskey;
  initWhiskeyByCategory(whiskey);
  initCountries(whiskey);
  initBrands(whiskey);
};

const initWhiskeyByCategory = whiskey => {
  const groupedByCategoryWhiskey = groupBy(whiskey, 'Categories');
  state.whiskeyByCategory = groupedByCategoryWhiskey;

  let whiskeyByCategory = groupedByCategoryWhiskey;
  whiskeyByCategory = Object.fromEntries(
    Object.entries(whiskeyByCategory).filter(([, items]) => items.length > 1)
  );

  const categories = Object.keys(whiskeyByCategory).sort((a, b) =>
    a.localeCompare(b)
  );
  state.mainCategories = categories;
};

const initCountries = whiskey => {
  const groupedByCountryWhiskey = groupBy(whiskey, 'Country');
  const countries = Object.keys(groupedByCountryWhiskey).sort((a, b) =>
    a.localeCompare(b)
  );
  state.countries = countries;
};

const initBrands = whiskey => {
  const groupedByBrandWhiskey = groupBy(whiskey, 'Brand');
  const brands = Object.keys(groupedByBrandWhiskey).sort((a, b) =>
    a.localeCompare(b)
  );
  state.brands = brands;
};

export const getWhiskey = () => state.whiskey;
export const getWhiskeyByCategory = () => state.whiskeyByCategory;
export const getMainCategories = () => state.mainCategories;
export const getCountries = () => state.countries;
export const getBrands = () => state.brands;
