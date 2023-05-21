const blockTitle = (firstRow, secondRow) => `
<link rel="stylesheet" href="./components/BlockTitle/blockTitle.css" />
<div class="block-title">
  <div class="first-row h-2 line-before">
    <span>${firstRow}</span>
  </div>
  <div class="second-row h-2 line-after">${secondRow}</div>
</div>
`;

export const registerBlockTitle = id => {
  const firstRow = $(`#${id}`).attr('firstRow');
  const secondRow = $(`#${id}`).attr('secondRow');

  $(`#${id}`).html(blockTitle(firstRow, secondRow));
};
