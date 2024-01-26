import { getWhiskey } from '../services/state.js';
import {
  lowPercentile,
  mediumPercentile,
  highPercentile,
  getPercentile,
} from '../services/percentiles.js';

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const getWhiskeyRecommendation = (userPreferences, priceRanges) => {
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

  const calculateMatchABVScore = (attributeData, userPreference) => {
    if (
      !attributeData ||
      attributeData === '' ||
      !userPreference ||
      userPreference === ''
    ) {
      return 0;
    }

    const attributeValue = parseFloat(attributeData.replace('%', ''));

    switch (userPreference) {
      case 'High':
        if (attributeValue >= abvHighThreshold) {
          return 1;
        } else if (
          abvMediumThreshold <= attributeValue &&
          attributeValue < abvHighThreshold
        ) {
          return 0.5;
        } else if (
          abvLowThreshold <= attributeValue &&
          attributeValue < abvMediumThreshold
        ) {
          return 0.2;
        }

        break;

      case 'Medium':
        if (
          abvLowThreshold < attributeValue &&
          attributeValue < abvHighThreshold
        ) {
          return 1;
        } else if (
          attributeValue === abvLowThreshold ||
          attributeValue === abvHighThreshold
        ) {
          return 0.2;
        }

        break;

      case 'Low':
        if (attributeValue < abvLowThreshold) {
          return 1;
        } else if (
          abvLowThreshold <= attributeValue &&
          attributeValue < abvMediumThreshold
        ) {
          return 0.5;
        } else if (
          abvMediumThreshold <= attributeValue &&
          attributeValue < abvHighThreshold
        ) {
          return 0.2;
        }

        break;
    }

    return 0;
  };

  const calculateMatchPriceScore = (
    attributeData,
    priceRangeId,
    priceRanges
  ) => {
    if (!attributeData || attributeData === '') {
      return 0;
    }

    const attributeValue = parseFloat(attributeData.replace('$', ''));

    for (const priceRange of priceRanges) {
      const distance = Math.abs(priceRange.id - priceRangeId);

      if (
        priceRange.min <= attributeValue &&
        attributeValue <= priceRange.max
      ) {
        return Number((1 - distance * 0.3).toFixed(2));
      }
    }

    return 0;
  };

  const calculateMatchScore = (attributeData, userPreference) => {
    if (
      !attributeData ||
      attributeData === '' ||
      !userPreference ||
      userPreference === ''
    ) {
      return 0;
    }

    const attributeValues = new Set(attributeData.toLowerCase().split(', '));
    const userPreferenceValues = new Set(
      userPreference.toLowerCase().split(', ')
    );

    const commonValues = Array.from(attributeValues).filter(value =>
      userPreferenceValues.has(value)
    );
    const matchScore = commonValues.length / userPreferenceValues.size;
    return matchScore;
  };

  const calculateTotalMatchScore = (whiskeyItem, userPreferences) => {
    const matchScoreFlavor = calculateMatchScore(
      whiskeyItem.TastingNotes,
      userPreferences.tastingNotes
    );

    const matchScoreABV = calculateMatchABVScore(
      whiskeyItem.ABV,
      userPreferences.abv
    );

    const matchScoreCategory = calculateMatchScore(
      whiskeyItem.Categories.replace(' Review', ''),
      userPreferences.category
    );

    const matchScoreCountry = calculateMatchScore(
      whiskeyItem.Country,
      userPreferences.country
    );

    const matchScorePrice = calculateMatchPriceScore(
      whiskeyItem.Price,
      userPreferences.priceRangeId,
      priceRanges
    );

    let totalMatchScore =
      matchScoreFlavor +
      matchScoreABV +
      matchScoreCategory +
      matchScoreCountry +
      matchScorePrice;

    return totalMatchScore;
  };

  const scoredWhiskeys = whiskeyItems.map(whiskeyItem => ({
    whiskeyItem,
    score: calculateTotalMatchScore(whiskeyItem, userPreferences),
  }));

  scoredWhiskeys.sort((a, b) => b.score - a.score);

  const resultsCountBeforeShufflingByExperienceLevel = {
    Novice: 3,
    Intermediate: 5,
    Expert: 10,
  };

  const resultsCountBeforeShuffling =
    resultsCountBeforeShufflingByExperienceLevel[
      userPreferences.experienceLevel
    ];

  const selectedWhiskeys = scoredWhiskeys.slice(0, resultsCountBeforeShuffling);
  shuffleArray(selectedWhiskeys);

  const resultsCountAfterShufflingByExperienceLevel = {
    Novice: 1,
    Intermediate: 3,
    Expert: 5,
  };

  const resultsCountAfterShuffling =
    resultsCountAfterShufflingByExperienceLevel[
      userPreferences.experienceLevel
    ];

  return selectedWhiskeys.slice(0, resultsCountAfterShuffling);
};
