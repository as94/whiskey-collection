import { groupBy } from './utils.js';

const state = {
  whiskey: [],
  whiskeyByCategory: {},
  mainCategories: [],
};

export const setWhiskey = whiskey => {
  state.whiskey = whiskey;

  const groupedWhiskey = groupBy(whiskey, 'Categories');
  state.whiskeyByCategory = groupedWhiskey;

  let whiskeyByCategory = groupedWhiskey;
  whiskeyByCategory = Object.fromEntries(
    Object.entries(whiskeyByCategory).filter(([, items]) => items.length > 1)
  );

  const categories = Object.keys(whiskeyByCategory).sort((a, b) =>
    a.localeCompare(b)
  );
  state.mainCategories = categories;
};

export const getWhiskey = () => state.whiskey;
export const getWhiskeyByCategory = () => state.whiskeyByCategory;
export const getMainCategories = () => state.mainCategories;
