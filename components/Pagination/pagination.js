import { visiblePagesCount } from '../../services/paginationUtils.js';
import { changePage, getPage } from '../../services/urlSearchParams.js';
import { initializeWhiskey } from '../../services/loadWhiskey.js';
import {
  getPagesCount,
  getTotalPagesCount,
} from '../../services/paginationUtils.js';

await initializeWhiskey();

const getPages = currentPageNumber => {
  const pagesCount = getPagesCount();
  const totalPagesCount = getTotalPagesCount();
  const start = (currentPageNumber - 1) * pagesCount + 1;
  let end = currentPageNumber * pagesCount;
  end = end > totalPagesCount ? totalPagesCount : end;

  let result = '';
  for (let id = start; id <= end; id++) {
    result += `<div id='page-${id}' class="page body-semibold-20">${id}</div>`;
  }
  return result;
};

const pagination = (totalPagesCount, currentPageNumber, currentPage) => {
  let withoutGoFirst = false;
  if (currentPageNumber === 1) {
    withoutGoFirst = true;
  }

  let withoutGoBack = false;
  if (currentPage === 1) {
    withoutGoBack = true;
  }

  let withoutGoForward = false;
  if (currentPage === totalPagesCount) {
    withoutGoForward = true;
  }

  let withoutGoLast = false;
  if (currentPageNumber === Math.ceil(totalPagesCount / visiblePagesCount)) {
    withoutGoLast = true;
  }

  return `
  <link rel="stylesheet" href="./components/Pagination/pagination.css" />
  <div class="pagination-block">
    ${
      withoutGoFirst
        ? `<div class="empty-block left"></div>`
        : `<div class="arrow go-first">
    <img src="/icons/chevron-double-left.svg" />
  </div>`
    }
    ${
      withoutGoBack
        ? `<div class="empty-block"></div>`
        : `<div class="arrow go-back">
    <img src="/icons/chevron-left.svg" />
  </div>`
    }
    ${getPages(currentPageNumber)}
    ${
      withoutGoForward
        ? `<div class="empty-block right"></div>`
        : `<div class="arrow go-forward">
    <img src="/icons/chevron-right.svg" />
  </div>`
    }
    ${
      withoutGoLast
        ? `<div class="empty-block"></div>`
        : `<div class="arrow go-last">
    <img src="/icons/chevron-double-right.svg" />
  </div>`
    }
  `;
};

const page = getPage();
const totalPagesCount = getTotalPagesCount();
const pagesCount = getPagesCount();

$(document).ready(function () {
  $('.pagination-block .page').click(function () {
    changePage(Number($(this).attr('id').replace('page-', '')));
  });

  $('.pagination-block .arrow.go-back').click(function () {
    changePage(page - 1);
  });

  $('.pagination-block .arrow.go-forward').click(function () {
    changePage(page + 1);
  });

  $('.pagination-block .arrow.go-first').click(function () {
    changePage(1);
  });

  $('.pagination-block .arrow.go-last').click(function () {
    changePage(totalPagesCount);
  });
});

if (totalPagesCount > 1) {
  const currentPageNumber = Math.floor((page - 1) / pagesCount) + 1;
  $('#pagination').html(pagination(totalPagesCount, currentPageNumber, page));
  $(`#page-${page}`).addClass('active');
}
