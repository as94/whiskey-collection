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

const createBreadcrumbLink = (text, href = '') =>
  href
    ? `<a class="item body-semibold" href="${href}">${text}</a>`
    : `<a class="item body-semibold"">${text}</a>`;

const convertToHtmlItems = items =>
  items
    .map(item => createBreadcrumbLink(item.text, item.href))
    .join(chevronRightContent);

const breadcrumbs = () => {
  const route = getRoute();
  let items = [];

  if (route === catalogBySearchResults) {
    items = [{ text: 'Back', href: '/' }];
  } else {
    items = [{ text: 'Home', href: '/' }];
  }

  if (route === catalogByCategories) {
    const category = getCategory();
    items.push({ text: category });
  } else if (route === productCard) {
    const productName = getProductName();
    if (productName) {
      const whiskeyByName = getWhiskeyByName();
      const product = whiskeyByName[productName];
      if (product) {
        const category = product.Categories;
        items.push(
          {
            text: category,
            href: `/catalog-by-categories?category=${category}`,
          },
          { text: productName }
        );
      }
    }
  } else if (route === blogPostList) {
    items.push({ text: 'Blog' });
  } else if (route === blogPost) {
    items.push({ text: 'Blog', href: '/blog-post-list' });
    const postTitleKey = getPostTitleKey();
    const post = getPost(postTitleKey);
    if (post && post.article) {
      items.push({ text: post.article.title });
    }
  }

  return breadcrumbsContent.replace('${items}', convertToHtmlItems(items));
};

const element = document.getElementById('breadcrumbs');
if (element) {
  document.getElementById('breadcrumbs').innerHTML = breadcrumbs();
}
