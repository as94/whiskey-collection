export const lowPercentile = 25;
export const mediumPercentile = 50;
export const highPercentile = 75;

export const getPercentile = (values, percentile) => {
  values.sort((a, b) => a - b);
  const index = Math.ceil((percentile / 100) * values.length);

  const result = values[index - 1];
  return result;
};
