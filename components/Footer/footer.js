const footer = () => {
  return `
  <link rel="stylesheet" href="./components/Footer/footer.css" />
  <div class="main-footer" data-no-select>
    <div class="footer-menu">
      <a href="/" class="footer-logo">
        <img src="./components/Footer/logo-light-text.svg" title="Whiskey collection logo" alt="Glass of whiskey" />
      </a>
      <div class="footer-menu-content">
        <div class="footer-menu-item body-semibold">
          <a class="footer-link" href="terms-and-conditions">Terms & Conditions</a>
        </div>
        <div class="footer-menu-item body-semibold">
          <a class="footer-link" href="/">Categories</a>
        </div>
        <div class="footer-menu-item body-semibold">
          <a class="footer-link" href="privacy-policy">Privacy Policy</a>
        </div>
      </div>
      <div class="footer-social-medias">
        <p class="keep-in-touch body-semibold">Keep in touch</p>
        <div class="footer-social-medias-icons">
          <a href="https://www.facebook.com/profile.php?id=100080213686208"><img src="./components/Footer/facebook.svg" title="Facebook logo" alt="Facebook" /></a>
          <a href="https://www.instagram.com/_whiskey.collection_"><img src="./components/Footer/instagram.svg" title="Instagram logo" alt="Instagram" /></a>
        </div>
        <div>
        </div>
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
