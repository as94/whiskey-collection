import {
  getRoute,
  getProductName,
  getCategory,
} from '../../services/urlSearchParams.js';
import { blogPostList, main } from '../../services/routePaths.js';
import breadcrumbsContent from './breadcrumbs.html';
import chevronRightContent from './chevron-right.html';
import './breadcrumbs.css';

const getItems = items => {
  let resultItems = [`<a class="item body-semibold" href="/">${items[0]}</a>`];
  if (items.length === 2) {
    resultItems.push(chevronRightContent);
    resultItems.push(`<a class="item body-semibold">${items[1]}</a>`);
  }

  if (items.length === 3) {
    resultItems.push(chevronRightContent);
    resultItems.push(
      `<a class="item body-semibold" href="${document.referrer}">${items[1]}</a>`
    );
    resultItems.push(chevronRightContent);
    resultItems.push(`<a class="item body-semibold">${items[2]}</a>`);
  }

  return resultItems.join('');
};

const breadcrumbs = async () => {
  const items = ['Home'];
  const route = getRoute();
  if (route !== main) {
    if (route === blogPostList) {
      items.push('Blog');
    } else {
      items.push(getCategory() ?? 'Search Results');
    }

    const productName = getProductName();
    if (productName) {
      items.push(productName);
    }
  }

  return breadcrumbsContent.replace('${items}', getItems(items));
};

const element = document.getElementById('breadcrumbs');
if (element) {
  document.getElementById('breadcrumbs').innerHTML = await breadcrumbs();
}
