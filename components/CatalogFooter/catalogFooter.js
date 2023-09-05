const catalogFooter = `
<link rel="stylesheet" href="./components/CatalogFooter/catalogFooter.css" />
<div class="catalog-footer">
  <div id="pagination" class="pagination"></div>
</div>
`;

const element = document.getElementById('catalogFooter');
if (element) {
  document.getElementById('catalogFooter').innerHTML = catalogFooter;
}
