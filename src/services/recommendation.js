import { getWhiskey } from '../services/state.js';

const userPreferences = {
  flavor: 'Sweet',
  abv: 'High',
  price_range: '$20-$50',
  experience_level: 'Intermediate',
  brand: 'Brand A',
  category: 'Bourbon',
  tasting_notes: 'Caramel, Vanilla',
};

export const getWhiskeyRecommendation = () => {
  const whiskeyItems = getWhiskey();
  return whiskeyItems[0];
};
