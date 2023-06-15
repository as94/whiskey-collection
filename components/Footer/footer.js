import { getMainCategories } from '../../services/state.js';
import { whiskeyLoaded } from '../../services/customEvents.js';

const getCategories = () => {
  let result = '';
  const categories = getMainCategories();

  for (let index = 0; index < categories.length; index++) {
    const category = categories[index];
    result += `<div class="footer-menu-item body-text-16">
      <a href="/" class="footer-link">
        ${category}
      </a>
    </div>`;
  }

  return result;
};

const footer = () => {
  return `
  <link rel="stylesheet" href="./components/Footer/footer.css" />
  <div class="main-footer">
    <a href="/" class="footer-logo">
      <img src="./components/Footer/logo-light-text.svg" />
    </a>
    <div class="footer-blank"></div>
    <div class="footer-menu">
      ${getCategories()}
    </div>
  </div>
  `;
};

window.addEventListener(whiskeyLoaded, () => {
  $('#mainFooter').html(footer());
});
