import {
  getRoute,
  getProductName,
  getCategory,
  goBack,
  goToMain,
} from '../../services/urlSearchParams.js';
import {
  main,
  productCard,
  catalogByCategories,
  catalogBySearchResults,
} from '../../services/routePaths.js';

const getItems = items => {
  let result = '';
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    result += `<span class="item body-semibold" index=${index}>${item}</span>`;
    if (index !== items.length - 1) {
      result += `<div class="chevron"><img src="icons/chevron-right.svg" /></div>`;
    }
  }
  if (items.length === 2) {
    result += `<div class="chevron"></div>`;
    result += `<span class="item body-semibold" index="2"></span>`;
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
<div class="breadcrumbs" data-no-select>
    ${getItems(items)}
</div>
`;
};

document.addEventListener('click', function (event) {
  if (event.target && event.target.matches('.breadcrumbs .item')) {
    const route = getRoute();
    const index = parseInt(event.target.getAttribute('index'));
    if (route === productCard) {
      if (index === 1) {
        goBack();
      } else if (index === 0) {
        goToMain();
      }
    } else if (
      route === catalogByCategories ||
      route === catalogBySearchResults
    ) {
      goToMain();
    }
  }
});

$('#breadcrumbs').html(breadcrumbs());
