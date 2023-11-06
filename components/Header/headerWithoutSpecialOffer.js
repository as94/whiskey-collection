const header = `
<link rel="stylesheet" href="./components/Header/header.css" />
<div class="main-header" data-no-select>
  <a href="/" class="header-logo">
    <img src="./components/Header/logo-dark-text.svg" title="Whiskey collection logo" alt="Glass of whiskey" />
  </a>
</div>`;

const element = document.getElementById('mainHeader');
if (element) {
  element.innerHTML = header;
}
