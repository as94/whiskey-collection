import {
  getRoute,
  getProductName,
  getCategory,
  getPostTitleKey,
} from '../../services/urlSearchParams.js';
import { blogPostList, blogPost, main } from '../../services/routePaths.js';
import { getPost } from '../../services/post-context.js';
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

const breadcrumbs = () => {
  const items = ['Home'];
  const route = getRoute();
  if (route === blogPostList) {
    items.push('Blog');
  } else if (route === blogPost) {
    items.push('Blog');
    const postTileKey = getPostTitleKey();
    const post = getPost(postTileKey);
    items.push(post.article.title);
  } else {
    const category = getCategory();
    if (category) {
      items.push(category);
    } else {
      items.push('Search Results');
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
  document.getElementById('breadcrumbs').innerHTML = breadcrumbs();
}
