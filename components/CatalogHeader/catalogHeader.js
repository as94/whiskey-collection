import { initializeWhiskey } from '../../services/loadWhiskey.js';
import { getWhiskeyItemsCount } from '../../services/paginationUtils.js';
import { getPage } from '../../services/urlSearchParams.js';
import { whiskeyItemsPerPage } from '../../services/paginationUtils.js';

await initializeWhiskey();

const catalogHeader = () => {
  return `
  <link rel="stylesheet" href="./components/CatalogHeader/catalogHeader.css" />
  <div class="catalog-header">
    <div id="catalog-result" class="result-label body-medium-large">
      Showing: 0 out of 0
    </div>
    <div id="orderBy" class="order-by" data-no-select></div>
  </div>`;
};

const element = document.getElementById('catalogHeader');
if (element) {
  element.innerHTML = catalogHeader();
}

const whiskeyItemsCount = getWhiskeyItemsCount();
const page = getPage();
const start = (page - 1) * whiskeyItemsPerPage + 1;
let end = whiskeyItemsPerPage * page;
end = end > whiskeyItemsCount ? whiskeyItemsCount : end;
let range = `${start}-${end}`;
if (start === end) {
  range = end;
}

const catalogResult = document.getElementById('catalog-result');

if (catalogResult) {
  catalogResult.textContent = `Showing: ${range} out of ${whiskeyItemsCount}`;
}
