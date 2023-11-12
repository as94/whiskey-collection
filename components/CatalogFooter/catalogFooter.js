const response = await fetch('./components/CatalogFooter/catalogFooter.html');
const htmlContent = await response.text();

const element = document.getElementById('catalogFooter');
if (element) {
  document.getElementById('catalogFooter').innerHTML = htmlContent;

  element.dispatchEvent(new CustomEvent('catalogFooterRenderComplete'));
}
