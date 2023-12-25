import headerContent from './header.html';
import './header.css';

const element = document.getElementById('mainHeader');
if (element) {
  element.innerHTML = headerContent;
}
