import { initializeWhiskey } from '../../services/loadWhiskey.js';
import { getWhiskeyItemsCount } from '../../services/paginationUtils.js';
import { getPage } from '../../services/urlSearchParams.js';
import { whiskeyItemsPerPage } from '../../services/paginationUtils.js';
import catalogHeaderContent from './catalogHeader.html';
import './catalogHeader.css';
import { initializeOrderBy } from '../OrderBy/orderBy.js';

await initializeWhiskey();

const element = document.getElementById('catalogHeader');
if (element) {
  element.innerHTML = catalogHeaderContent;

  initializeOrderBy();
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
