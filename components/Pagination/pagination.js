const maxItemsCount = 4;
const itemsCount = 30;

let globalCurrentPage = 1;

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
  var newUrl = window.location.pathname + '?' + params.toString();
  window.history.pushState(null, '', newUrl);

  console.log('page', getPage());
};

const getPage = () => {
  var params = new URLSearchParams(window.location.search);
  return params.get('page');
};

const renderPagination = (oldPage, newPage, currentPageNumber) => {
  $('#pagination').html(pagination(itemsCount, currentPageNumber, newPage));
  if (oldPage) {
    $(`#page-${oldPage}`).removeClass('active');
  }
  $(`#page-${newPage}`).addClass('active');
};

$(document).on('click', '.pagination-block .page', function () {
  const oldPage = globalCurrentPage;
  const newPage = Number($(this).attr('id').replace('page-', ''));
  renderPagination(
    oldPage,
    newPage,
    Math.floor((newPage - 1) / maxItemsCount) + 1
  );
  globalCurrentPage = newPage;
  changePage(globalCurrentPage);
});

$(document).on('click', '.pagination-block .arrow.go-back', function () {
  const oldPage = globalCurrentPage;
  const newPage = globalCurrentPage - 1;
  renderPagination(
    oldPage,
    newPage,
    Math.floor((newPage - 1) / maxItemsCount) + 1
  );
  globalCurrentPage = newPage;
  changePage(globalCurrentPage);
});

$(document).on('click', '.pagination-block .arrow.go-forward', function () {
  const oldPage = globalCurrentPage;
  const newPage = globalCurrentPage + 1;
  renderPagination(
    oldPage,
    newPage,
    Math.floor((newPage - 1) / maxItemsCount) + 1
  );
  globalCurrentPage = newPage;
  changePage(globalCurrentPage);
});

$(document).on('click', '.pagination-block .arrow.go-last', function () {
  const oldPage = globalCurrentPage;
  const newPage = itemsCount;
  const pageNumber = Math.ceil(itemsCount / maxItemsCount);
  renderPagination(oldPage, newPage, pageNumber);
  globalCurrentPage = newPage;
});

$(document).on('click', '.pagination-block .arrow.go-first', function () {
  const oldPage = globalCurrentPage;
  const newPage = 1;
  const pageNumber = 1;
  renderPagination(oldPage, newPage, pageNumber);
  globalCurrentPage = newPage;
  changePage(globalCurrentPage);
});

renderPagination(null, 1, 1);
