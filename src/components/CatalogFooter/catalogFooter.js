import catalogFooterContent from './catalogFooter.html';

const element = document.getElementById('catalogFooter');
if (element) {
  document.getElementById('catalogFooter').innerHTML = catalogFooterContent;

  element.dispatchEvent(new CustomEvent('catalogFooterRenderComplete'));
}
