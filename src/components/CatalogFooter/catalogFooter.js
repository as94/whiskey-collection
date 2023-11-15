import catalogFooterContent from './catalogFooter.html';
import './catalogFooter.css';

const element = document.getElementById('catalogFooter');
if (element) {
  document.getElementById('catalogFooter').innerHTML = catalogFooterContent;

  element.dispatchEvent(new CustomEvent('catalogFooterRenderComplete'));
}
