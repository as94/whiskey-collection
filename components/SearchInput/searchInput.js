import { initializeWhiskey } from '../../services/loadWhiskey.js';
import {
  getCountries,
  getBrands,
  getBudgetRanges,
} from '../../services/state.js';
import {
  getCountry,
  getBrand,
  getPriceRange,
  getSearchText,
  goToCatalogBySearchResults,
} from '../../services/urlSearchParams.js';

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

const generateBrandListItems = selectedBrand => {
  let result = '';
  const brands = getBrands();
  for (const brand of brands) {
    if (selectedBrand && selectedBrand === brand) {
      result += `<li class="selected">${brand}</li>`;
    } else {
      result += `<li>${brand}</li>`;
    }
  }
  return result;
};

const generateBudgetListItems = selectedBudgetRange => {
  let result = '';
  const budgetRanges = getBudgetRanges();
  for (const budgetRange of budgetRanges) {
    if (selectedBudgetRange && selectedBudgetRange === budgetRange) {
      result += `<li class="selected">${budgetRange}</li>`;
    } else {
      result += `<li>${budgetRange}</li>`;
    }
  }
  return result;
};

const searchInput = () => {
  const country = getCountry();
  const brand = getBrand();
  const priceRange = getPriceRange();
  const searchText = getSearchText();
  return `
<link rel="stylesheet" href="./components/SearchInput/searchInput.css" />
<div class="search-block">
  <div class="search-parameters">
    <div class="filters">
      <div class="filter-block">
        <label class="body-semibold-extra">
          What country?
        </label>
        <div class="dropdown-container" data-no-select>
          <div class="selected-item country">
            <span id="selected-country" class="body-medium">${country}</span>
            <div class="dropdown-controls">
              <div class="clean"></div>
              <div class="open"></div>
            </div>
          </div>
          <ul class="dropdown-options country">
            ${generateCountryListItems(country)}
          </ul>
        </div>
      </div>
      <div class="filter-block">
        <label class="body-semibold-extra">
          What brand?
        </label>
        <div class="dropdown-container" data-no-select>
          <div class="selected-item brand">
            <span id="selected-brand" class="body-medium">${brand}</span>
            <div class="dropdown-controls">
              <div class="clean"></div>
              <div class="open"></div>
            </div>
          </div>
          <ul class="dropdown-options brand">
            ${generateBrandListItems(brand)}
          </ul>
        </div>
      </div>
      <div class="filter-block">
        <label class="body-semibold-extra">
          What budget?
        </label>
        <div class="dropdown-container" data-no-select>
          <div class="selected-item budget">
            <span id="selected-budget" class="body-medium">${priceRange}</span>
            <div class="dropdown-controls">
              <div class="clean"></div>
              <div class="open"></div>
            </div>
          </div>
          <ul class="dropdown-options budget">
            ${generateBudgetListItems(priceRange)}
          </ul>
        </div>
      </div>
    </div>
    <div class="search-line">
      <img class="search-icon" src="icons/search-white.svg" />
      <input id="search" type="text" placeholder="Search whiskey" class="body-medium" value="${searchText}" />
      <div class="search-clean"></div>
    </div>

    <button class="find-again-btn body-semibold" data-no-select>Find again</button>
  </div>
</div>
`;
};

var element = document.getElementById('searchInput');
if (element) {
  element.innerHTML = searchInput();
}

const filters = ['country', 'brand', 'budget'];
const root = '.filter-block .dropdown-container';

filters.forEach(filter => {
  const selectedFilter = document.querySelector(
    `${root} .selected-item.${filter}`
  );

  selectedFilter.addEventListener('click', function () {
    this.classList.toggle('active');
    const dropdownOptions = document.querySelector(
      `${root} .dropdown-options.${filter}`
    );
    dropdownOptions.classList.toggle('show');
  });

  const cleanButton = selectedFilter.querySelector('.clean');
  const options = document.querySelectorAll(
    `${root} .dropdown-options.${filter} > li`
  );
  const selectedText = document.querySelector(`#selected-${filter}`);
  cleanButton.addEventListener('click', function (event) {
    event.stopPropagation();
    options.forEach(option => option.classList.remove('selected'));
    document
      .querySelectorAll(`${root} .selected-item`)
      .forEach(item => item.classList.remove('active'));
    document
      .querySelectorAll(`${root} .dropdown-options`)
      .forEach(option => option.classList.remove('show'));
    selectedText.textContent = 'Any';
  });

  options.forEach(option => {
    option.addEventListener('click', function () {
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
    });
  });
});

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

document
  .querySelector('.find-again-btn')
  .addEventListener('click', function () {
    handleClick();
  });
