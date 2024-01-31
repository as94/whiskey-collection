import { getWhiskey } from '../services/state.js';

const calculateMatchABVScore = (
  attributeData,
  userPreferenceAbv,
  abvThresholds
) => {
  if (
    !attributeData ||
    attributeData === '' ||
    !userPreferenceAbv ||
    userPreferenceAbv === ''
  ) {
    return 0;
  }

  const [abvLowThreshold, abvMediumThreshold, abvHighThreshold] = abvThresholds;

  const attributeValue = parseFloat(attributeData.replace('%', ''));

  switch (userPreferenceAbv) {
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
  userPreferencePriceRangeId,
  priceRanges
) => {
  if (!attributeData || attributeData === '') {
    return 0;
  }

  if (!userPreferencePriceRangeId || userPreferencePriceRangeId === 0) {
    return 0;
  }

  const attributeValue = parseFloat(attributeData.replace('$', ''));

  for (const priceRange of priceRanges) {
    const distance = Math.abs(priceRange.id - userPreferencePriceRangeId);

    if (priceRange.min <= attributeValue && attributeValue <= priceRange.max) {
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

const calculateTotalMatchScore = (
  whiskeyItem,
  userPreferences,
  abvThresholds,
  priceRanges,
  whiskeyTastingNotes
) => {
  const matchScoreABV = calculateMatchABVScore(
    whiskeyItem.ABV,
    userPreferences.abv,
    abvThresholds
  );

  const matchScorePrice = calculateMatchPriceScore(
    whiskeyItem.Price,
    userPreferences.priceRangeId,
    priceRanges
  );

  const matchScoreFlavor = calculateMatchScore(
    whiskeyItem.TastingNotes,
    userPreferences.tastingNotes
      ? whiskeyTastingNotes[userPreferences.tastingNotes].join(', ')
      : undefined
  );

  let totalMatchScore = matchScoreFlavor + matchScoreABV + matchScorePrice;

  return Number(totalMatchScore.toFixed(2));
};

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const getWhiskeyRecommendation = (
  userPreferences,
  abvThresholds,
  priceRanges,
  whiskeyTastingNotes
) => {
  const whiskeyItems = getWhiskey();

  const scoredWhiskeys = whiskeyItems.map(whiskeyItem => ({
    whiskeyItem,
    score: calculateTotalMatchScore(
      whiskeyItem,
      userPreferences,
      abvThresholds,
      priceRanges,
      whiskeyTastingNotes
    ),
  }));

  if (
    scoredWhiskeys.filter(x => x.score === 0).length === scoredWhiskeys.length
  ) {
    shuffleArray(scoredWhiskeys);
  } else {
    scoredWhiskeys.sort((a, b) => b.score - a.score);
  }

  const filteredByCountryScoredWhiskeys = userPreferences.country
    ? scoredWhiskeys.filter(
        whiskey => whiskey.whiskeyItem.Country === userPreferences.country
      )
    : scoredWhiskeys;

  const resultsCountBeforeShufflingByExperienceLevel = {
    Novice: 3,
    Intermediate: 5,
    Expert: 10,
  };

  const userExperienceLevel = userPreferences.experienceLevel ?? 'Novice';

  const resultsCountBeforeShuffling =
    resultsCountBeforeShufflingByExperienceLevel[userExperienceLevel];

  const selectedWhiskeys = filteredByCountryScoredWhiskeys.slice(
    0,
    resultsCountBeforeShuffling
  );
  shuffleArray(selectedWhiskeys);

  const resultsCountAfterShufflingByExperienceLevel = {
    Novice: 1,
    Intermediate: 3,
    Expert: 5,
  };

  const resultsCountAfterShuffling =
    resultsCountAfterShufflingByExperienceLevel[userExperienceLevel];

  return selectedWhiskeys.slice(0, resultsCountAfterShuffling);
};
