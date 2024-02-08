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
    'Almond',
    'Apple',
    'Apple pie',
    'Apples',
    'Apricot',
    'Baked apple',
    'Berries',
    'Berry',
    'Black currant',
    'Candied fruit',
    'Candied fruits',
    'Cherry',
    'Cranberry',
    'Dried apple',
    'Dried apricot',
    'Dried fruit',
    'Fig',
    'Figs',
    'Grape',
    'Grapefruit',
    'Melon',
    'Orange',
    'Orchard fruit',
    'Papaya',
    'Peach',
    'Pear',
    'Pineapple',
    'Plum',
    'Prune',
    'Raisins',
    'Raspberry',
    'Red fruit',
    'Ripe cantaloupe',
    'Stewed fruit',
    'Strawberry',
    'Sultana',
    'Summer fruits',
    'Stone fruit',
  ],
  'Spice and Herb Notes': [
    'Allspice',
    'Anise',
    'Baking spices',
    'Black pepper',
    'Bold rye spice',
    'Christmas spice',
    'Cinnamon',
    'Clove',
    'Coriander',
    'Ginger',
    'Green pepper',
    'Heavy spicy',
    'Herbal',
    'Hints of dry smoke',
    'Nutmeg',
    'Peppery spice',
    'Rose petals',
    'Rye grain',
    'Rye spice',
    'Salt',
    'Spearmint',
    'Spiced',
    'Spices',
    'Spicy',
    'Spicy rye',
    'Tart',
    'White pepper',
    'Zesty',
  ],
  'Sweet Notes': [
    'Brown sugar',
    'Butterscotch',
    'Butter',
    'Butter pastry',
    'Cacao',
    'Caramel',
    'Cashew',
    'Chocolate',
    'Christmas cake',
    'Creme brulee',
    'Custard',
    'Dark chocolate',
    'Dark fruit',
    'Honey',
    'Honey butter',
    'Honeydew',
    'Maraschino cherries',
    'Maple syrup',
    'Marmalade',
    'Marzipan',
    'Milk chocolate',
    'Nougat',
    'Peach candy',
    'Pecan',
    'Peanut butter pie',
    'Pineapple',
    'Pistachio',
    'Prune',
    'Salted caramel',
    'Salted chocolate',
    'Seasame',
    'Sherry',
    'Sloe gin',
    'Soda bread',
    'Soufflé',
    'Sweet baking spices',
    'Sweet cracker',
    'Toffee',
    'Vanilla',
    'Walnut',
    'Walnut oil',
    'Wine',
  ],
  'Wood and Smoke Notes': [
    'Cedar',
    'Char',
    'Charcoal',
    'Light oak',
    'Smoked apricot',
    'Smoky',
    'Smoky barrel char',
    'Toasted grain',
    'Toasted pecans',
    'Toasty',
    'Tobacco',
    'Woody',
  ],
  'Complex and Miscellaneous Notes': [
    'Balanced',
    'Brain',
    'Brioche',
    'Clean',
    'Complex',
    'Copper',
    'Corn',
    'Cornbread',
    'Cough syrup',
    'Cream',
    'Cream toast',
    'Crunchy pickle',
    'Dark',
    'Dry',
    'Eucalyptus',
    'Flavored',
    'Flora',
    'Floral',
    'Fresh',
    'Fresh bread',
    'Fresh peach',
    'Fruit cake',
    'Fruity',
    'Grass',
    'Grassy',
    'Hay',
    'Heather',
    'Iodine',
    'Kippers',
    'Lavender',
    'Leather',
    'Lemon',
    'Lemongrass',
    'Mellow',
    'Ocean spray',
    'Oil',
    'Pandan leaf',
    'Panna cotta',
    'Papaya',
    'Peach cake',
    'Meat',
    'Mint',
    'Mochaccino',
    'Robust',
    'Robust vanilla',
    'Round',
    'Rum',
    'Salty',
    'Seaweed',
    'Slightly tart',
    'Smoke',
    'Smooth',
    'Sour',
    'Stewed fruit',
    'Stewed futi',
    'Sweet',
    'Tar',
    'Toast',
    'Tobacco',
    'Velvety',
    'Yeasty',
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
    { id: 2, min: priceLowTreshold + 1, max: priceMediumTreshold },
    { id: 3, min: priceMediumTreshold + 1, max: priceHighTreshold },
    {
      id: 4,
      min: priceHighTreshold + 1,
      max: priceValues[priceValues.length - 1],
    },
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
