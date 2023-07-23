const blockTitle = (firstRow, secondRow) => `
<link rel="stylesheet" href="./components/BlockTitle/blockTitle.css" />
<div class="block-title">
  <h3 class="first-row h2 line-before">
    <span>${firstRow}</span>
  </h3>
  <h3 class="second-row h2 line-after">${secondRow}</h3>
</div>
`;

export const registerBlockTitle = id => {
  const firstRow = $(`#${id}`).attr('firstRow');
  const secondRow = $(`#${id}`).attr('secondRow');

  $(`#${id}`).html(blockTitle(firstRow, secondRow));
};
