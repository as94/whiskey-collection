import { initializeWhiskey } from '../../services/loadWhiskey.js';
import {
  getCountries,
  getBrandsByCountry,
  getBudgetsByBrand,
} from '../../services/state.js';
import {
  getCountry,
  getBrand,
  getPriceRange,
  getSearchText,
  goToCatalogBySearchResults,
} from '../../services/urlSearchParams.js';
import searchInputContent from './searchInput.html';
import './searchInput.css';

await initializeWhiskey();

const generateCountryListItems = selectedCountry => {
  let result = '';
  const countries = getCountries();
  for (const country of countries) {
    if (selectedCountry && selectedCountry === country) {
      result += `<li class="selected">${country}</li>`;
    } else {
      result += `<li>${country}</li>`;
    }
  }
  return result;
};

const generateBrandListItems = country => {
  let result = '';
  const brands = getBrandsByCountry(country);
  if (!brands) {
    return;
  }
  for (const brand of brands) {
    result += `<li>${brand}</li>`;
  }
  return result;
};

const generateBudgetListItems = brand => {
  let result = '';
  const budgets = getBudgetsByBrand(brand);
  if (!budgets) {
    return;
  }
  for (const budget of budgets) {
    result += `<li>${budget}</li>`;
  }
  return result;
};

const searchInput = (country, brand, priceRange, searchText) => {
  const disableCountry = searchText ? 'disabled' : '';
  const disableBrand = searchText || country === 'Any' ? 'disabled' : '';
  const disableBudget = searchText || brand === 'Any' ? 'disabled' : '';
  const disableSearch = searchText || country === 'Any' ? '' : 'disabled';

  return searchInputContent
    .replace('${disableCountry}', disableCountry)
    .replace('${country}', country)
    .replace('${countryListItems}', generateCountryListItems(country))
    .replace('${disableBrand}', disableBrand)
    .replace('${brand}', brand)
    .replace('${brandListItems}', generateBrandListItems(country))
    .replace('${disableBudget}', disableBudget)
    .replace('${priceRange}', priceRange)
    .replace('${budgetListItems}', generateBudgetListItems(brand))
    .replace('${searchText}', searchText)
    .replace('${disableSearch}', disableSearch);
};

const country = getCountry();
const brand = getBrand();
const priceRange = getPriceRange();
const searchText = getSearchText();

var element = document.getElementById('searchInput');
if (element) {
  element.innerHTML = searchInput(country, brand, priceRange, searchText);
}

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

if (!searchText) {
  if (country !== 'Any') {
    addEventListeners('brand');
  }

  if (brand !== 'Any') {
    addEventListeners('budget');
  }
}

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

document
  .querySelector('.find-again-btn')
  .addEventListener('click', function () {
    handleClick();
  });
