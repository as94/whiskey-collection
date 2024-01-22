import { getWhiskey } from '../services/state.js';
import {
  lowPercentile,
  mediumPercentile,
  highPercentile,
  getPercentile,
} from '../services/percentiles.js';

export const getWhiskeyRecommendation = userPreferences => {
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

  const calculateMatchPriceScore = (attributeData, userPreference) => {
    if (
      !attributeData ||
      attributeData === '' ||
      !userPreference ||
      userPreference === ''
    ) {
      return 0;
    }

    const attributeValue = parseFloat(attributeData.replace('$', ''));
    const [rangeStart, rangeEnd] = userPreference;

    if (rangeStart < attributeValue && attributeValue < rangeEnd) {
      return 1;
    } else if (attributeValue === rangeStart || attributeValue === rangeEnd) {
      return 0.5;
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

  for (const whiskeyItem of whiskeyItems) {
    const matchScoreFlavor = calculateMatchScore(
      whiskeyItem.TastingNotes,
      userPreferences.tasting_notes
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
      userPreferences.price_range
    );

    console.log(whiskeyItem.Name, matchScorePrice);

    // let totalMatchScore =
    //   matchScoreFlavor +
    //   matchScoreABV +
    //   matchScorePrice +
    //   matchScoreBrand +
    //   matchScoreCategory;

    // // Adjust match score based on user's experience level using a multiplier
    // const experienceLevelMultiplier = {
    //   Novice: 0.9,
    //   Intermediate: 1,
    //   Expert: 1.1,
    // };
    // totalMatchScore *=
    //   experienceLevelMultiplier[userPreferences.experience_level] || 1;

    // // Set a base threshold for recommendation (you can adjust this based on your preferences)
    // const baseRecommendationThreshold = 3;

    // // Adjust the threshold based on the user's experience level
    // const experienceLevelThresholds = {
    //   Novice: baseRecommendationThreshold - 1,
    //   Intermediate: baseRecommendationThreshold,
    //   Expert: baseRecommendationThreshold + 1,
    // };

    // // Check if the total match score meets the adjusted threshold
    // if (
    //   totalMatchScore >=
    //   (experienceLevelThresholds[userPreferences.experience_level] ||
    //     baseRecommendationThreshold)
    // ) {
    //   console.log(
    //     `Recommend: ${whiskeyItem.Name} - Match Score: ${totalMatchScore}`
    //   );
    // } else {
    //   console.log(
    //     `Do Not Recommend: ${whiskeyItem.Name} - Match Score: ${totalMatchScore}`
    //   );
    // }
  }

  console.log('whiskeyItems', whiskeyItems);

  return whiskeyItems[0];
};
