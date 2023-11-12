const blockTitle = async (firstRow, secondRow) => {
  const response = await fetch('./components/BlockTitle/blockTitle.html');
  const htmlContent = await response.text();
  return htmlContent
    .replace('${firstRow}', firstRow)
    .replace('${secondRow}', secondRow);
};

export const registerBlockTitle = async id => {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  const firstRow = element.getAttribute('firstRow');
  const secondRow = element.getAttribute('secondRow');

  element.innerHTML = await blockTitle(firstRow, secondRow);
};
