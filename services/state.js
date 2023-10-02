import { groupBy, groupByWithSelect, toDictionary } from './utils.js';

const emptyFilter = 'Any';

const budgetRanges = [
  '$0 - $30',
  '$30 - $60',
  '$60 - $90',
  '$90 - $120',
  '$120 - $150',
  '$150 - $2000',
];

const state = {
  whiskey: [],
  whiskeyByCategory: {},
  whiskeyByName: {},
  whiskeyByBrand: {},
  brandsByCountry: {},
  budgetsByBrand: {},
  mainCategories: [],
  countries: [],
};

export const setWhiskey = whiskey => {
  state.whiskey = whiskey;
  initWhiskeyByCategory(whiskey);
  initWhiskeyByName(whiskey);
  initWhiskeyByBrand(whiskey);
  initBrandsByCountry(whiskey);
  initBudgetsByBrand(whiskey);
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

const initBrandsByCountry = whiskey => {
  state.brandsByCountry = groupByWithSelect(whiskey, 'Country', 'Brand');
};

const initBudgetsByBrand = whiskey => {
  const budgetsByBrand = {};
  const whiskeyByBrand = groupBy(whiskey, 'Brand');
  for (const brand of Object.keys(whiskeyByBrand)) {
    const set = new Set();
    for (const whiskey of whiskeyByBrand[brand]) {
      const price = parseFloat(whiskey.Price.slice(1));
      if (price >= 0 && price <= 30) {
        set.add(budgetRanges[0]);
      } else if (price >= 30 && price <= 60) {
        set.add(budgetRanges[1]);
      } else if (price >= 60 && price <= 90) {
        set.add(budgetRanges[2]);
      } else if (price >= 90 && price <= 120) {
        set.add(budgetRanges[3]);
      } else if (price >= 120 && price <= 150) {
        set.add(budgetRanges[4]);
      } else if (price >= 150 && price <= 2000) {
        set.add(budgetRanges[5]);
      }
    }

    const budgets = [];
    for (let i = 0; i < budgetRanges.length; i++) {
      if (set.has(budgetRanges[i])) {
        set.delete(budgetRanges[i]);
        budgets.push(budgetRanges[i]);
      }
    }

    budgetsByBrand[brand] = budgets;
  }

  state.budgetsByBrand = budgetsByBrand;
};

const initCountries = whiskey => {
  const groupedByCountryWhiskey = groupBy(whiskey, 'Country');
  const countries = Object.keys(groupedByCountryWhiskey).sort((a, b) =>
    a.localeCompare(b)
  );
  state.countries = countries;
};

const initBudgetRanges = () => {
  state.budgetRanges = budgetRanges;
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
export const getBrandsByCountry = country => state.brandsByCountry[country];
export const getBudgetsByBrand = brand => state.budgetsByBrand[brand];
