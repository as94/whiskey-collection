import { visiblePagesCount } from '../../services/paginationUtils.js';
import { getPageLink, getPage } from '../../services/urlSearchParams.js';
import { initializeWhiskey } from '../../services/loadWhiskey.js';
import {
  getPagesCount,
  getTotalPagesCount,
} from '../../services/paginationUtils.js';
import paginationContent from './pagination.html';
import chevronDoubleRightContent from './chevron-double-right.html';
import chevronDoubleLeftContent from './chevron-double-left.html';
import chevronRightContent from './chevron-right.html';
import chevronLeftContent from './chevron-left.html';
import './pagination.css';

await initializeWhiskey();

const getPages = currentPageNumber => {
  const pagesCount = getPagesCount();
  const totalPagesCount = getTotalPagesCount();
  const start = (currentPageNumber - 1) * pagesCount + 1;
  let end = currentPageNumber * pagesCount;
  end = end > totalPagesCount ? totalPagesCount : end;

  let result = '';
  for (let id = start; id <= end; id++) {
    result += `<a id='page-${id}' class="page body-semibold-extra" data-no-select href="${getPageLink(
      id
    )}">${id}</a>`;
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

  const page = getPage();

  const content = `${
    withoutGoFirst
      ? `<div class="empty-block left"></div>`
      : `<a class="arrow go-first" href="${getPageLink(
          1
        )}">${chevronDoubleLeftContent}</a>`
  }
  ${
    withoutGoBack
      ? `<div class="empty-block"></div>`
      : `<a class="arrow go-back" href="${getPageLink(
          page - 1
        )}">${chevronLeftContent}</a>`
  }
  ${getPages(currentPageNumber)}
  ${
    withoutGoForward
      ? `<div class="empty-block right"></div>`
      : `<a class="arrow go-forward" href="${getPageLink(
          page + 1
        )}">${chevronRightContent}</a>`
  }
  ${
    withoutGoLast
      ? `<div class="empty-block"></div>`
      : `<a class="arrow go-last" href="${getPageLink(
          totalPagesCount
        )}">${chevronDoubleRightContent}</a>`
  }`;

  return paginationContent.replace('${paginationContent}', content);
};

export const initializePagination = () => {
  const page = getPage();
  const totalPagesCount = getTotalPagesCount();
  const pagesCount = getPagesCount();

  if (totalPagesCount > 1) {
    const currentPageNumber = Math.floor((page - 1) / pagesCount) + 1;

    const paginationElement = document.getElementById('pagination');

    if (paginationElement) {
      paginationElement.innerHTML = pagination(
        totalPagesCount,
        currentPageNumber,
        page
      );
    }

    const pageElement = document.getElementById(`page-${page}`);
    if (pageElement) {
      pageElement.classList.add('active');
    }
  }
};
