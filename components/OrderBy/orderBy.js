import { initializeWhiskey } from '../../services/loadWhiskey.js';
import { getOrderByLink, getOrderBy } from '../../services/urlSearchParams.js';
import {
  nameAsc,
  nameDesc,
  priceAsc,
  priceDesc,
  popularDesc,
  allOrderBySettings,
} from '../../services/orderBySettings.js';

await initializeWhiskey();

const response = await fetch('./components/OrderBy/orderBy.html');
const htmlContent = await response.text();

const orderByItems = [
  'Name (A-Z)',
  'Name (Z-A)',
  'Price (Low-High)',
  'Price (High-Low)',
  'Popular',
];

const orderBy = async () => {
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
      list += `<li class="selected"><a href="${getOrderByLink(
        allOrderBySettings[index]
      )}"><div>${item}</div></a></li>`;
    } else {
      list += `<li><a href="${getOrderByLink(
        allOrderBySettings[index]
      )}"><div>${item}</div></a></li>`;
    }
  }

  return htmlContent.replace('${selected}', selected).replace('${list}', list);
};

var orderByElement = document.getElementById('orderBy');
if (orderByElement) {
  orderByElement.innerHTML = await orderBy();
}

const root = '.order-by .dropdown-container';

const selectedField = document.querySelector(
  `${root} .selected-item.sorting-field`
);
if (selectedField) {
  selectedField.addEventListener('click', function () {
    this.classList.toggle('active');
    const dropdownOptions = document.querySelector(
      `${root} .dropdown-options.sorting-field`
    );
    if (dropdownOptions) {
      dropdownOptions.classList.toggle('show');
    }
  });
}

const optionItems = document.querySelectorAll(
  `${root} .dropdown-options.sorting-field > li`
);
optionItems.forEach(function (item) {
  item.addEventListener('click', function () {
    optionItems.forEach(function (li) {
      li.classList.remove('selected');
    });
    this.classList.add('selected');
    const dropdownOptions = document.querySelector(`${root} .dropdown-options`);
    if (dropdownOptions) {
      dropdownOptions.classList.remove('show');
    }
    const selectedItem = document.querySelector(`${root} .selected-item`);
    if (selectedItem) {
      selectedItem.classList.remove('active');
    }
  });
});

document.addEventListener('click', function (event) {
  const target = event.target;
  const dropdownContainer = document.querySelector(root);
  if (dropdownContainer && !dropdownContainer.contains(target)) {
    const dropdownOptions = document.querySelector(`${root} .dropdown-options`);
    if (dropdownOptions) {
      dropdownOptions.classList.remove('show');
    }
    const selectedItem = document.querySelector(`${root} .selected-item`);
    if (selectedItem) {
      selectedItem.classList.remove('active');
    }
  }
});
