const maxItemsCount = 4;
const itemsCount = 30;
const anchor = '#catalog-result';

const getPages = currentPageNumber => {
  let result = '';

  const start = (currentPageNumber - 1) * maxItemsCount + 1;
  let end = currentPageNumber * maxItemsCount;
  end = end > itemsCount ? itemsCount : end;

  for (let id = start; id <= end; id++) {
    result += `<div id='page-${id}' class="page body-text-20">${id}</div>`;
  }
  return result;
};

const pagination = (itemsCount, currentPageNumber, currentPage) => {
  let withoutGoFirst = false;
  if (currentPageNumber === 1) {
    withoutGoFirst = true;
  }

  let withoutGoBack = false;
  if (currentPage === 1) {
    withoutGoBack = true;
  }

  let withoutGoLast = false;
  if (currentPageNumber === Math.ceil(itemsCount / maxItemsCount)) {
    withoutGoLast = true;
  }

  let withoutGoForward = false;
  if (currentPage === itemsCount) {
    withoutGoForward = true;
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

const changePage = page => {
  var params = new URLSearchParams(window.location.search);
  params.set('page', page);
  var newUrl = window.location.pathname + '?' + params.toString() + anchor;
  window.location.href = newUrl;
};

const getPage = () => {
  var params = new URLSearchParams(window.location.search);
  const page = params.get('page');
  if (page) {
    return Number(page);
  }
  return 1;
};

$(document).ready(function () {
  $('.pagination-block .page').click(function () {
    changePage(Number($(this).attr('id').replace('page-', '')));
  });

  $('.pagination-block .arrow.go-back').click(function () {
    const page = getPage();
    changePage(page - 1);
  });

  $('.pagination-block .arrow.go-forward').click(function () {
    const page = getPage();
    changePage(page + 1);
  });

  $('.pagination-block .arrow.go-first').click(function () {
    changePage(1);
  });

  $('.pagination-block .arrow.go-last').click(function () {
    changePage(itemsCount);
  });
});

const renderPagination = () => {
  const page = getPage();
  const currentPageNumber = Math.floor((page - 1) / maxItemsCount) + 1;
  $('#pagination').html(pagination(itemsCount, currentPageNumber, page));
  $(`#page-${page}`).addClass('active');
};

renderPagination();
