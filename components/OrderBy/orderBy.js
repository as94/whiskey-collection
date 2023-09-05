import { initializeWhiskey } from '../../services/loadWhiskey.js';
import { changeOrderBy, getOrderBy } from '../../services/urlSearchParams.js';
import {
  nameAsc,
  nameDesc,
  priceAsc,
  priceDesc,
  popularDesc,
  allOrderBySettings,
} from '../../services/orderBySettings.js';

const orderByItems = [
  'Name (A-Z)',
  'Name (Z-A)',
  'Price (Low-High)',
  'Price (High-Low)',
  'Popular',
];

const orderBy = () => {
  const orderBy = getOrderBy();
  let selected = '';
  switch (orderBy) {
    case nameAsc:
      selected = orderByItems[0];
      break;
    case nameDesc:
      selected = orderByItems[1];
      break;
    case priceAsc:
      selected = orderByItems[2];
      break;
    case priceDesc:
      selected = orderByItems[3];
      break;
    case popularDesc:
      selected = orderByItems[4];
      break;
  }

  let list = '';
  for (let index = 0; index < orderByItems.length; index++) {
    const item = orderByItems[index];

    if (selected === item) {
      list += `<li class="selected"><a href="${changeOrderBy(
        allOrderBySettings[index]
      )}"><div>${item}</div></a></li>`;
    } else {
      list += `<li><a href="${changeOrderBy(
        allOrderBySettings[index]
      )}"><div>${item}</div></a></li>`;
    }
  }

  return `
  <link rel="stylesheet" href="./components/OrderBy/orderBy.css" />
  <div>
    <div class="dropdown-container">
      <div class="selected-item sorting-field">
        <span id="selected-sorting-field" class="body-semibold">
          ${selected}
        </span>
        <img src="icons/chevron.svg" />
      </div>
      <ul class="dropdown-options sorting-field">
        ${list}
      </ul>
    </div>
  </div>
  `;
};

await initializeWhiskey();

$(document).ready(function () {
  const root = '.order-by .dropdown-container';
  $(`${root} .selected-item.sorting-field`).click(function () {
    $(this).toggleClass('active');
    $(`${root} .dropdown-options.sorting-field`).toggleClass('show');
  });

  $(`${root} .dropdown-options.sorting-field > li`).click(function () {
    $(`${root} .dropdown-options.sorting-field > li`).removeClass('selected');
    $(this).addClass('selected');
    $(`${root} .dropdown-options`).removeClass('show');
    $(`${root} .selected-item`).removeClass('active');
  });

  $(document).click(event => {
    const target = $(event.target);
    if (!target.closest(root).length) {
      $(`${root} .dropdown-options`).removeClass('show');
      $(`${root} .selected-item`).removeClass('active');
    }
  });
});

$('#orderBy').html(orderBy());
