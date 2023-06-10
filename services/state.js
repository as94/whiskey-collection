import { groupBy } from './utils.js';

const state = {
  whiskey: [],
  whiskeyByCategory: {},
};

export const setWhiskey = whiskey => {
  state.whiskey = whiskey;
  state.whiskeyByCategory = groupBy(whiskey, 'Categories');
};

export const getWhiskey = () => state.whiskey;
export const getWhiskeyByCategory = () => state.whiskeyByCategory;
