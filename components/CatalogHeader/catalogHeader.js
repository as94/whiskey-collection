import { whiskeyLoaded } from '../../services/customEvents.js';
import { getWhiskeyItemsCount } from '../../services/paginationUtils.js';
import { getPage } from '../../services/urlSearchParams.js';
import { whiskeyItemsPerPage } from '../../services/paginationUtils.js';

const catalogHeader = (start, end, whiskeyItemsCount) => {
  let range = `${start}-${end}`;
  if (start === end) {
    range = end;
  }
  return `
  <link rel="stylesheet" href="./components/CatalogHeader/catalogHeader.css" />
  <div class="catalog-header">
    <div id="catalog-result" class="result-label body-text-18">
      Showing: ${range} out of ${whiskeyItemsCount}
    </div>
    <div id="orderBy" class="order-by"></div>
  </div>`;
};

window.addEventListener(whiskeyLoaded, () => {
  const whiskeyItemsCount = getWhiskeyItemsCount();
  const page = getPage();
  const start = (page - 1) * whiskeyItemsPerPage + 1;
  const end = whiskeyItemsPerPage * page;
  $('#catalogHeader').html(
    catalogHeader(
      start,
      end > whiskeyItemsCount ? whiskeyItemsCount : end,
      whiskeyItemsCount
    )
  );
});
