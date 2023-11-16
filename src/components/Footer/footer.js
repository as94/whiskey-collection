import footerContent from './footer.html';
import './footer.css';

const element = document.getElementById('mainFooter');
if (element) {
  element.innerHTML = footerContent.replace(
    '${year}',
    new Date().getFullYear()
  );
}
