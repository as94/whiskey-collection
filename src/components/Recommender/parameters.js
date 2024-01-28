import { initializeWhiskey } from '../../services/loadWhiskey.js';
import { getWhiskey, getCountries } from '../../services/state.js';
import {
  lowPercentile,
  mediumPercentile,
  highPercentile,
  getPercentile,
} from '../../services/percentiles.js';

const abvs = ['Low', 'Medium', 'High'];
const experienceLevels = ['Novice', 'Intermediate', 'Expert'];

const whiskeyTastingNotes = {
  'Fruit Notes': [
    'Apple',
    'Baked apple',
    'Banana',
    'Berry',
    'Cherry',
    'Citrus',
    'Coconut',
    'Dark fruit',
    'Dried fruit',
    'Orange',
    'Pear',
    'Raisins',
    'Red fruit',
    'Stone fruit',
    'Tropical',
    'Tropical fruit',
  ],
  'Spice and Herb Notes': [
    'Anise',
    'Cinnamon',
    'Mint',
    'Nutmeg',
    'Pepper',
    'Spicy',
  ],
  'Sweet Notes': [
    'Balanced',
    'Butter',
    'Caramel',
    'Creamy',
    'Grainy sweetness',
    'Honey',
    'Malty',
    'Rich',
    'Round',
    'Salty',
    'Sweet',
    'Toasty',
    'Vanilla',
  ],
  'Floral and Herbal Notes': [
    'Floral',
    'Fresh',
    'Herbal',
    'Rose petal',
    'Vegetal',
    'Yeasty',
  ],
  'Wood and Smoke Notes': [
    'Bold',
    'Woody',
    'Hints of dry smoke',
    'Leather',
    'Oak',
    'Smoky',
  ],
  'Complex and Miscellaneous Notes': [
    'Biscuit',
    'Bright',
    'Flavored',
    'Harmonious',
    'Lingering',
    'Roasted',
    'Smooth',
  ],
};

export const getParameters = async () => {
  await initializeWhiskey();

  const countries = getCountries().filter(
    country => country !== 'United Kingdom'
  );

  const whiskeyItems = getWhiskey();

  const abvValues = whiskeyItems
    .filter(whiskey => whiskey.ABV)
    .map(whiskey => parseFloat(whiskey.ABV.replace('%', '')));
  const abvLowThreshold =
    Math.round(getPercentile(abvValues, lowPercentile) * 100) / 100;
  const abvMediumThreshold =
    Math.round(getPercentile(abvValues, mediumPercentile) * 100) / 100;
  const abvHighThreshold =
    Math.round(getPercentile(abvValues, highPercentile) * 100) / 100;

  const abvThresholds = [abvLowThreshold, abvMediumThreshold, abvHighThreshold];

  const priceValues = whiskeyItems
    .filter(whiskey => whiskey.Price)
    .map(whiskey => parseFloat(whiskey.Price.replace('$', '')));
  const priceLowTreshold =
    Math.round(getPercentile(priceValues, lowPercentile) * 100) / 100;
  const priceMediumTreshold =
    Math.round(getPercentile(priceValues, mediumPercentile) * 100) / 100;
  const priceHighTreshold =
    Math.round(getPercentile(priceValues, highPercentile) * 100) / 100;

  const priceRanges = [
    { id: 1, min: 0, max: priceLowTreshold },
    { id: 2, min: priceLowTreshold, max: priceMediumTreshold },
    { id: 3, min: priceMediumTreshold, max: priceHighTreshold },
    { id: 4, min: priceHighTreshold, max: priceValues[priceValues.length - 1] },
  ];

  return {
    abvs,
    priceRanges,
    countries,
    whiskeyTastingNotes,
    experienceLevels,
    abvThresholds,
  };
};
