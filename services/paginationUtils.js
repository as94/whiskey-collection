import { getWhiskeyByCategory } from './state.js';
import { getCategory } from '../../services/urlSearchParams.js';

export const whiskeyItemsPerPage = 9;
export const visiblePagesCount = 4;

export const getWhiskeyItemsCount = () => {
  const category = getCategory();
  const whiskeyByCategory = getWhiskeyByCategory();
  const whiskeyItems = whiskeyByCategory[category];
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
