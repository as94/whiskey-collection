import donateContent from './donate.html';
import './donate.css';

const element = document.getElementById('donate');
if (element) {
  element.innerHTML = donateContent;
}
