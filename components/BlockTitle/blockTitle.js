const blockTitle = (firstRow, secondRow) => `
<link rel="stylesheet" href="./components/BlockTitle/blockTitle.css" />
<div class="block-title">
  <div class="first-row">
    <h2 class="h2">${firstRow}</h2>
    <div class="empty-block"></div>
  </div>

  <div class="second-row">
    <div class="empty-block"></div>
    <h2 class="h2">${secondRow}</h2>
  </div>
</div>
`;

export const registerBlockTitle = id => {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  const firstRow = element.getAttribute('firstRow');
  const secondRow = element.getAttribute('secondRow');

  element.innerHTML = blockTitle(firstRow, secondRow);
};
