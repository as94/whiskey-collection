import {
  getRoute,
  getProductName,
  getCategory,
} from '../../services/urlSearchParams.js';
import { main } from '../../services/routePaths.js';

const getItems = items => {
  let resultItems = [`<a class="item body-semibold" href="/">${items[0]}</a>`];
  if (items.length === 2) {
    resultItems.push(
      '<div class="chevron"><img src="icons/chevron-right.svg" /></div>'
    );
    resultItems.push(`<a class="item body-semibold">${items[1]}</a>`);
  }

  if (items.length === 3) {
    resultItems.push(
      '<div class="chevron"><img src="icons/chevron-right.svg" /></div>'
    );
    resultItems.push(
      `<a class="item body-semibold" href="${document.referrer}">${items[1]}</a>`
    );
    resultItems.push(
      '<div class="chevron"><img src="icons/chevron-right.svg" /></div>'
    );
    resultItems.push(`<a class="item body-semibold">${items[2]}</a>`);
  }

  return resultItems.join('');
};

const breadcrumbs = () => {
  const items = ['Home'];
  const route = getRoute();
  if (route !== main) {
    items.push(getCategory() ?? 'Search Results');
    const productName = getProductName();
    if (productName) {
      items.push(productName);
    }
  }

  return `
<link rel="stylesheet" href="./components/Breadcrumbs/breadcrumbs.css" />
<div class="breadcrumbs" data-no-select>
    ${getItems(items)}
</div>
`;
};

const element = document.getElementById('breadcrumbs');
if (element) {
  document.getElementById('breadcrumbs').innerHTML = breadcrumbs();
}
