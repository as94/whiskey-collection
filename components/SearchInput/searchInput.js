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
        <label class="body-text-20">
          What country?
        </label>
        <div class="dropdown-container">
          <div class="selected-item country">
            <span id="selected-country" class="body-text-16">${country}</span>
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
        <label class="body-text-20">
          What brand?
        </label>
        <div class="dropdown-container">
          <div class="selected-item brand">
            <span id="selected-brand" class="body-text-16">${brand}</span>
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
        <label class="body-text-20">
          What budget?
        </label>
        <div class="dropdown-container">
          <div class="selected-item budget">
            <span id="selected-budget" class="body-text-16">${priceRange}</span>
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
      <img class="search-icon" src="icons/search.svg" />
      <input id="search" type="text" placeholder="Search whiskey" class="body-text-16" value="${searchText}" />
      <div class="search-clean"></div>
    </div>

    <button class="find-again-btn body-text-18">Find again</button>
  </div>
</div>
`;
};

$(document).ready(function () {
  const filters = ['country', 'brand', 'budget'];

  const root = '.filter-block .dropdown-container';

  for (const filter of filters) {
    $(`${root} .selected-item.${filter} .open`).click(function () {
      $(this).toggleClass('active');
      $(`${root} .dropdown-options.${filter}`).toggleClass('show');
    });

    $(`${root} .selected-item.${filter} .clean`).click(function () {
      $(`${root} .dropdown-options.${filter} > li`).removeClass('selected');
      $(`${root} .selected-item`).removeClass('active');
      $(`${root} .dropdown-options`).removeClass('show');
      $(`#selected-${filter}`).text('Any');
    });

    $(`${root} .dropdown-options.${filter} > li`).click(function () {
      const selectedOption = $(this).text();
      $(`#selected-${filter}`).text(selectedOption);
      $(`${root} .dropdown-options.${filter} > li`).removeClass('selected');
      $(this).addClass('selected');
      $(`${root} .dropdown-options`).removeClass('show');
      $(`${root} .selected-item`).removeClass('active');
    });
  }

  $(document).click(event => {
    const target = $(event.target);
    if (!target.closest(root).length) {
      $(`${root} .dropdown-options`).removeClass('show');
      $(`${root} .selected-item`).removeClass('active');
    }
  });

  $('.search-line .search-clean').click(function () {
    $('#search').val('');
  });

  const handleClick = () => {
    const country = $('#selected-country').text();
    const brand = $('#selected-brand').text();
    const budget = $('#selected-budget').text();
    const searchText = $('#search').val();

    goToCatalogBySearchResults(country, brand, budget, searchText);
  };

  $('#search').keypress(function (event) {
    if (event.which === 13) {
      event.preventDefault();
      handleClick();
    }
  });

  $('.find-again-btn').click(function () {
    handleClick();
  });
});

$('#searchInput').html(searchInput());
