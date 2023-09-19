import { registerBlockTitle } from '../BlockTitle/blockTitle.js';
import { initializeWhiskey } from '../../services/loadWhiskey.js';
import {
  getCountries,
  getBrandsByCountry,
  getBudgetsByBrand,
} from '../../services/state.js';
import { goToCatalogBySearchResults } from '../../services/urlSearchParams.js';

const generateCountryListItems = () => {
  let result = '';
  const countries = getCountries();
  for (const country of countries) {
    result += `<li>${country}</li>`;
  }
  return result;
};

const search = () => {
  return `
<link rel="stylesheet" href="./components/Search/search.css" />
<div class="search-block">
  <div id="search-block-title" firstRow="I want to" secondRow="Find"></div>
  <div class="search-parameters">
    <div class="filters">
      <div class="filter-block">
        <label class="body-semibold-extra">
          What country?
        </label>
        <div class="dropdown-container" data-no-select>
          <div class="selected-item country">
            <span id="selected-country" class="body-medium">Any</span>
            <div class="dropdown-controls">
              <div class="clean"></div>
              <div class="open"></div>
            </div>
          </div>
          <ul class="dropdown-options country">
            ${generateCountryListItems()}
          </ul>
        </div>
      </div>
      <div class="filter-block">
        <label class="body-semibold-extra">
          What brand?
        </label>
        <div class="dropdown-container" data-no-select>
          <div class="selected-item brand disabled">
            <span id="selected-brand" class="body-medium">Any</span>
            <div class="dropdown-controls">
              <div class="clean"></div>
              <div class="open"></div>
            </div>
          </div>
          <ul class="dropdown-options brand">
          </ul>
        </div>
      </div>
      <div class="filter-block">
        <label class="body-semibold-extra">
          What budget?
        </label>
        <div class="dropdown-container" data-no-select>
          <div class="selected-item budget disabled">
            <span id="selected-budget" class="body-medium">Any</span>
            <div class="dropdown-controls">
              <div class="clean"></div>
              <div class="open"></div>
            </div>
          </div>
          <ul class="dropdown-options budget">
          </ul>
        </div>
      </div>
    </div>
    <div class="search-line">
      <img class="search-icon" src="icons/search.svg" />
      <input id="search" type="text" placeholder="Search whiskey" class="body-medium" />
      <div class="search-clean"></div>
    </div>

    <button class="find-btn body-semibold" data-no-select>Find</button>
  </div>
</div>
`;
};

await initializeWhiskey();

var element = document.getElementById('searchBlock');
if (element) {
  element.innerHTML = search();
}

registerBlockTitle('search-block-title');

const root = '.filter-block .dropdown-container';

const fillBrands = () => {
  const oldList = document.querySelector(`${root} .dropdown-options.brand`);
  const parent = oldList.parentNode;

  const newList = document.createElement('ul');
  newList.classList.add('dropdown-options', 'brand');

  const country = document.querySelector('#selected-country').textContent;
  const brands = getBrandsByCountry(country);
  if (!brands) {
    return;
  }
  for (const brand of brands) {
    const li = document.createElement('li');
    li.textContent = brand;
    newList.appendChild(li);
  }

  parent.replaceChild(newList, oldList);
};

const fillBudgets = () => {
  const oldList = document.querySelector(`${root} .dropdown-options.budget`);
  const parent = oldList.parentNode;

  const newList = document.createElement('ul');
  newList.classList.add('dropdown-options', 'budget');

  const brand = document.querySelector('#selected-brand').textContent;
  const budgets = getBudgetsByBrand(brand);
  if (!budgets) {
    return;
  }

  for (const budget of budgets) {
    const li = document.createElement('li');
    li.textContent = budget;
    newList.appendChild(li);
  }

  parent.replaceChild(newList, oldList);
};

const clearBlock = blockName => {
  const oldList = document.querySelector(
    `${root} .dropdown-options.${blockName}`
  );
  const parent = oldList.parentNode;
  const newList = document.createElement('ul');
  newList.classList.add('dropdown-options', blockName);
  parent.replaceChild(newList, oldList);

  const oldDiv = document.querySelector(`${root} .selected-item.${blockName}`);
  const parentDiv = oldDiv.parentNode;
  const newDiv = document.createElement('div');
  newDiv.classList.add('selected-item', blockName, 'disabled');
  const span = document.createElement('span');
  span.id = `selected-${blockName}`;
  span.classList.add('body-medium');
  span.innerHTML = 'Any';
  newDiv.appendChild(span);

  const dropdownControls = document.createElement('div');
  dropdownControls.classList.add('dropdown-controls');
  const clean = document.createElement('div');
  clean.classList.add('clean');
  const open = document.createElement('div');
  open.classList.add('open');
  dropdownControls.appendChild(clean);
  dropdownControls.appendChild(open);
  newDiv.appendChild(dropdownControls);

  parentDiv.replaceChild(newDiv, oldDiv);
};

const addEventListeners = filter => {
  const selectedFilter = document.querySelector(
    `${root} .selected-item.${filter}`
  );

  const cleanButton = selectedFilter.querySelector('.clean');
  const options = document.querySelectorAll(
    `${root} .dropdown-options.${filter} > li`
  );
  const selectedText = document.querySelector(`#selected-${filter}`);

  const selectedFilterClickHandler = function () {
    const isDisabled = this.classList.contains('disabled');
    if (isDisabled) {
      return;
    }
    this.classList.toggle('active');
    const dropdownOptions = document.querySelector(
      `${root} .dropdown-options.${filter}`
    );
    dropdownOptions.classList.toggle('show');
  };

  const cleanButtonClickHandler = function (event) {
    event.stopPropagation();
    options.forEach(option => option.classList.remove('selected'));
    document
      .querySelectorAll(`${root} .selected-item`)
      .forEach(item => item.classList.remove('active'));
    document
      .querySelectorAll(`${root} .dropdown-options`)
      .forEach(option => option.classList.remove('show'));
    selectedText.textContent = 'Any';

    if (filter === 'country') {
      clearBlock('brand');

      var searchInput = document.getElementById('search');
      if (searchInput) {
        searchInput.disabled = false;
      }
    }

    if (filter === 'country' || filter === 'brand') {
      clearBlock('budget');
    }
  };

  const optionClickHandler = function () {
    const selectedOption = this.textContent;
    selectedText.textContent = selectedOption;
    options.forEach(opt => opt.classList.remove('selected'));
    this.classList.add('selected');
    document
      .querySelectorAll(`${root} .dropdown-options`)
      .forEach(option => option.classList.remove('show'));
    document
      .querySelectorAll(`${root} .selected-item`)
      .forEach(item => item.classList.remove('active'));
    if (filter === 'country') {
      const brandFilter = document.querySelector(
        `${root} .selected-item.brand`
      );

      if (!brandFilter.classList.contains('disabled')) {
        addEventListeners('brand');
      }

      fillBrands();

      brandFilter.classList.remove('disabled');
      document.getElementById('selected-brand').textContent = 'Any';

      addEventListeners('brand');

      clearBlock('budget');

      var searchInput = document.getElementById('search');
      if (searchInput) {
        searchInput.disabled = true;
      }
    }

    if (filter === 'brand') {
      const budgetFilter = document.querySelector(
        `${root} .selected-item.budget`
      );

      if (!budgetFilter.classList.contains('disabled')) {
        addEventListeners('budget');
      }

      fillBudgets();

      budgetFilter.classList.remove('disabled');
      document.getElementById('selected-budget').textContent = 'Any';

      addEventListeners('budget');
    }
  };

  selectedFilter.addEventListener('click', selectedFilterClickHandler);
  cleanButton.addEventListener('click', cleanButtonClickHandler);

  options.forEach(option => {
    option.addEventListener('click', optionClickHandler);
  });
};

addEventListeners('country');

document.addEventListener('click', event => {
  const target = event.target;
  if (!target.closest(root)) {
    document
      .querySelectorAll(`${root} .dropdown-options`)
      .forEach(option => option.classList.remove('show'));
    document
      .querySelectorAll(`${root} .selected-item`)
      .forEach(item => item.classList.remove('active'));
  }
});

document
  .querySelector('.search-line .search-clean')
  .addEventListener('click', function () {
    document.querySelector('#search').value = '';
    document
      .querySelector(`${root} .selected-item.country`)
      .classList.remove('disabled');
  });

function handleClick() {
  const country = document.querySelector('#selected-country').textContent;
  const brand = document.querySelector('#selected-brand').textContent;
  const budget = document.querySelector('#selected-budget').textContent;
  const searchText = document.querySelector('#search').value;

  goToCatalogBySearchResults(country, brand, budget, searchText);
}

document
  .querySelector('#search')
  .addEventListener('keypress', function (event) {
    if (event.which === 13) {
      event.preventDefault();
      handleClick();
    }
  });

document.querySelector('#search').addEventListener('keyup', function (event) {
  const text = event.target.value;
  if (text) {
    document
      .querySelector(`${root} .selected-item.country`)
      .classList.add('disabled');
  } else {
    document
      .querySelector(`${root} .selected-item.country`)
      .classList.remove('disabled');
  }
});

document.querySelector('.find-btn').addEventListener('click', function () {
  handleClick();
});
