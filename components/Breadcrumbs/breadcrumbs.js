const getItems = items => {
  let result = '';
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    result +=
      index === items.length - 1
        ? `<span class="item body-text-16">${item}</span>`
        : `
    <span class="item body-text-16">${item}</span>
    <img class="chevron" src="icons/chevron-right.svg" />
`;
  }
  return result;
};

export const breadcrumbs = items => `
<link rel="stylesheet" href="./components/Breadcrumbs/breadcrumbs.css" />
<div class="breadcrumbs">
    ${getItems(items)}
</div>
`;
