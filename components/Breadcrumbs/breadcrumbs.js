import {
  getRoute,
  getProductName,
  getCategory,
} from '../../services/urlSearchParams.js';
import { main } from '../../services/routePaths.js';

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
<div class="breadcrumbs">
    ${getItems(items)}
</div>
`;
};

$('#breadcrumbs').html(breadcrumbs());
