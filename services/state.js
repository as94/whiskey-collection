import { groupBy, toDictionary } from './utils.js';

const emptyFilter = 'Any';

const state = {
  whiskey: [],
  whiskeyByCategory: {},
  whiskeyByName: {},
  whiskeyByBrand: {},
  mainCategories: [],
  countries: [],
  brands: [],
  budgetRanges: [],
};

export const setWhiskey = whiskey => {
  state.whiskey = whiskey;
  initWhiskeyByCategory(whiskey);
  initWhiskeyByName(whiskey);
  initWhiskeyByBrand(whiskey);
  initCountries(whiskey);
  initBrands(whiskey);
  initBudgetRanges();
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

const initWhiskeyByName = whiskey => {
  state.whiskeyByName = toDictionary(whiskey, 'Name');
};

const initWhiskeyByBrand = whiskey => {
  state.whiskeyByBrand = groupBy(whiskey, 'Brand');
};

const initCountries = whiskey => {
  const groupedByCountryWhiskey = groupBy(whiskey, 'Country');
  const countries = Object.keys(groupedByCountryWhiskey).sort((a, b) =>
    a.localeCompare(b)
  );
  state.countries = countries;
};

const initBudgetRanges = () => {
  state.budgetRanges = [
    '$0 - $30',
    '$30 - $60',
    '$60 - $90',
    '$90 - $120',
    '$120 - $150',
    '$150 - $2000',
  ];
};

const initBrands = whiskey => {
  const groupedByBrandWhiskey = groupBy(whiskey, 'Brand');
  const brands = Object.keys(groupedByBrandWhiskey).sort((a, b) =>
    a.localeCompare(b)
  );
  state.brands = brands;
};

export const getWhiskey = () => state.whiskey;
export const getWhiskeyBy = (country, brand, priceRange, searchText) => {
  let result = state.whiskey;

  if (country && country !== emptyFilter) {
    result = result.filter(x => x.Country === country);
  }

  if (brand && brand !== emptyFilter) {
    result = result.filter(x => x.Brand === brand);
  }

  if (priceRange && priceRange !== emptyFilter) {
    const numbers = priceRange.match(/\d+/g);
    const min = numbers[0];
    const max = numbers[1];
    result = result.filter(x => {
      const price = parseFloat(x.Price.slice(1));
      return price >= min && price < max;
    });
  }

  if (searchText && searchText !== '') {
    result = result.filter(x =>
      x.Name.toLowerCase()
        .replace(/["'’]/g, '')
        .includes(searchText.toLowerCase().replace(/["'’]/g, ''))
    );
  }

  return result;
};
export const getWhiskeyByCategory = () => state.whiskeyByCategory;
export const getWhiskeyByName = () => state.whiskeyByName;
export const getWhiskeyByBrand = () => state.whiskeyByBrand;
export const getMainCategories = () => state.mainCategories;
export const getCountries = () => state.countries;
export const getBrands = () => state.brands;
export const getBudgetRanges = () => state.budgetRanges;
