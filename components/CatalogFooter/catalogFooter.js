const response = await fetch('./components/CatalogFooter/catalogFooter.html');
const htmlContent = await response.text();

const element = document.getElementById('catalogFooter');
console.log('catalogFooter', element);
if (element) {
  document.getElementById('catalogFooter').innerHTML = htmlContent;
  console.log('catalogFooter rendered');
}
