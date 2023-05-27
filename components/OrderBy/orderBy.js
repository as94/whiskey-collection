const orderBy = `
<link rel="stylesheet" href="./components/OrderBy/orderBy.css" />
<div>
  <div class="dropdown-container">
    <div class="selected-item sorting-field">
      <span id="selected-sorting-field" class="body-text-16">
        Name (A-Z)
      </span>
      <img src="icons/chevron.svg" />
    </div>
    <ul class="dropdown-options sorting-field">
      <li class="selected">Name (A-Z)</li>
      <li>Name (Z-A)</li>
      <li>Price (Low-High)</li>
      <li>Price (High-Low)</li>
      <li>Popular</li>
    </ul>
  </div>
</div>
`;

$(document).ready(function () {
  const root = '.order-by .dropdown-container';
  $(`${root} .selected-item.sorting-field`).click(function () {
    $(this).toggleClass('active');
    $(`${root} .dropdown-options.sorting-field`).toggleClass('show');
  });

  $(`${root} .dropdown-options.sorting-field > li`).click(function () {
    var selectedOption = $(this).text();
    $(`#selected-sorting-field`).text(selectedOption);
    $(`${root} .dropdown-options.sorting-field > li`).removeClass('selected');
    $(this).addClass('selected');
    $(`${root} .dropdown-options`).removeClass('show');
    $(`${root} .selected-item`).removeClass('active');
  });

  $(document).click(function (event) {
    var target = $(event.target);
    if (!target.closest(root).length) {
      $(`${root} .dropdown-options`).removeClass('show');
      $(`${root} .selected-item`).removeClass('active');
    }
  });
});

$('#orderBy').html(orderBy);
