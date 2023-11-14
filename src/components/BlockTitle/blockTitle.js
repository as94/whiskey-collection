import blockTitleContent from './blockTitle.html';

const blockTitle = async (firstRow, secondRow) =>
  blockTitleContent
    .replace('${firstRow}', firstRow)
    .replace('${secondRow}', secondRow);

export const registerBlockTitle = async id => {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  const firstRow = element.getAttribute('firstRow');
  const secondRow = element.getAttribute('secondRow');

  element.innerHTML = await blockTitle(firstRow, secondRow);
};
