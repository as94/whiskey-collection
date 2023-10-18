import { getMainCategories } from '../../services/state.js';
import { initializeWhiskey } from '../../services/loadWhiskey.js';
import { getCatalogByCategoriesLink } from '../../services/urlSearchParams.js';

await initializeWhiskey();

const getCategories = () => {
  let result = '';
  const categories = getMainCategories();

  for (let index = 0; index < categories.length; index++) {
    const category = categories[index];
    result += `<div class="footer-menu-item body-semibold">
      <a class="footer-link" href="${getCatalogByCategoriesLink(
        category
      )}">${category}</a>
    </div>`;
  }

  return result;
};

const footer = () => {
  return `
  <link rel="stylesheet" href="./components/Footer/footer.css" />
  <div class="main-footer" data-no-select>
    <div class="footer-menu">
      <a href="/" class="footer-logo">
        <img src="./components/Footer/logo-light-text.svg" title="Whiskey collection logo" alt="Glass of whiskey" />
      </a>
      <div class="footer-menu-content">
        ${getCategories()}
      </div>
    </div>
    <div class="footer-copyright body-small">
      <p>© Whisky Collection - ${new Date().getFullYear()}. All rights reserved.</p>
    </div>
  </div>
  `;
};

const element = document.getElementById('mainFooter');
if (element) {
  element.innerHTML = footer();
}
