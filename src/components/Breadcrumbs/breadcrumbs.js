import {
  getRoute,
  getProductName,
  getCategory,
  getPostTitleKey,
} from '../../services/urlSearchParams.js';
import {
  blogPostList,
  blogPost,
  productCard,
  catalogByCategories,
  catalogBySearchResults,
} from '../../services/routePaths.js';
import { initializeWhiskey } from '../../services/loadWhiskey.js';
import { getPost } from '../../services/post-context.js';
import { getWhiskeyByName } from '../../services/state.js';
import breadcrumbsContent from './breadcrumbs.html';
import chevronRightContent from './chevron-right.html';
import './breadcrumbs.css';

await initializeWhiskey();

const getItems = (items, category) => {
  let resultItems = [`<a class="item body-semibold" href="/">${items[0]}</a>`];
  if (items.length === 2) {
    resultItems.push(chevronRightContent);
    resultItems.push(`<a class="item body-semibold">${items[1]}</a>`);
  }

  if (items.length === 3) {
    resultItems.push(chevronRightContent);
    if (category) {
      resultItems.push(
        `<a class="item body-semibold" href="/catalog-by-categories?category=${category}">${items[1]}</a>`
      );
    }
    resultItems.push(chevronRightContent);
    resultItems.push(`<a class="item body-semibold">${items[2]}</a>`);
  }

  return resultItems.join('');
};

const breadcrumbs = () => {
  const items = [];
  const route = getRoute();
  let productName = '';
  let category = '';

  if (route === catalogBySearchResults) {
    items.push('Back');
  } else {
    items.push('Home');
  }

  if (route === catalogByCategories) {
    category = getCategory();
    items.push(category);
  } else if (route === productCard) {
    productName = getProductName();
    if (productName) {
      const whiskeyByName = getWhiskeyByName();
      if (whiskeyByName[productName]) {
        category = whiskeyByName[productName].Categories;
        items.push(category);
      }

      items.push(productName);
    }
  } else if (route === blogPostList) {
    items.push('Blog');
  } else if (route === blogPost) {
    items.push('Blog');
    const postTileKey = getPostTitleKey();
    const post = getPost(postTileKey);
    items.push(post.article.title);
  }

  return breadcrumbsContent.replace('${items}', getItems(items, category));
};

const element = document.getElementById('breadcrumbs');
if (element) {
  document.getElementById('breadcrumbs').innerHTML = breadcrumbs();
}
