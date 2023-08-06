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
  const firstRow = $(`#${id}`).attr('firstRow');
  const secondRow = $(`#${id}`).attr('secondRow');

  $(`#${id}`).html(blockTitle(firstRow, secondRow));
};
