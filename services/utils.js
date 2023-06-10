export const groupBy = (data, groupField) => {
  return data.reduce((groups, item) => {
    const groupValue = item[groupField];
    if (!groups[groupValue]) {
      groups[groupValue] = [];
    }
    groups[groupValue].push(item);
    return groups;
  }, {});
};

export const getRandomItem = items => {
  if (items.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
};
