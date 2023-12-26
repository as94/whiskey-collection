export const popularity = (a, b) => {
  const weightA = a.Rating * Math.log10(a.RateCount + 1);
  const weightB = b.Rating * Math.log10(b.RateCount + 1);

  const difference = weightB - weightA;

  if (Number(difference.toFixed(2)) !== 0) {
    return difference;
  }

  return a.Name.localeCompare(b.Name);
};
