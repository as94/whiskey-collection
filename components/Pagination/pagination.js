const pagination = `
<link rel="stylesheet" href="./components/Pagination/pagination.css" />
<div class="pagination-block">
  <a href="/" class="page go-first">
    <img src="/icons/chevron-double-left.svg" />
  </a>
  <a href="/" class="page go-back">
    <img src="/icons/chevron-left.svg" />
  </a>
  <a href="/" class="page active body-text-20">
    2
  </a>
  <a href="/" class="page body-text-20">
    3
  </a>
  <a href="/" class="page body-text-20">
    4
  </a>
  <a href="/" class="page body-text-20">
    5
  </a>
  <a href="/" class="page go-forward">
    <img src="/icons/chevron-right.svg" />
  </a>
  <a href="/" class="page go-last">
    <img src="/icons/chevron-double-right.svg" />
  </a>
</div>
`;

$('#pagination').html(pagination);
