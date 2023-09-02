import { getMainCategories } from '../../services/state.js';
import { initializeWhiskey } from '../../services/loadWhiskey.js';
import { goToCatalogByCategories } from '../../services/urlSearchParams.js';

await initializeWhiskey();

const getCategories = () => {
  let result = '';
  const categories = getMainCategories();

  for (let index = 0; index < categories.length; index++) {
    const category = categories[index];
    result += `<div class="footer-menu-item body-semibold">
      <div class="footer-link">${category}</div>
    </div>`;
  }

  return result;
};

const footer = () => {
  return `
  <link rel="stylesheet" href="./components/Footer/footer.css" />
  <div class="main-footer" data-no-select>
    <a href="/" class="footer-logo">
      <img src="./components/Footer/logo-light-text.svg" title="Whiskey collection logo" alt="Glass of whiskey" />
    </a>
    <div class="footer-menu">
      ${getCategories()}
    </div>
  </div>
  `;
};

$(document).on('click', '.footer-link', function () {
  const category = $(this).text();

  goToCatalogByCategories(category);
});

$('#mainFooter').html(footer());
