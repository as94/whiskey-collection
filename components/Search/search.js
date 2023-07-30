import { registerBlockTitle } from '../BlockTitle/blockTitle.js';
import { initializeWhiskey } from '../../services/loadWhiskey.js';
import {
  getCountries,
  getBrands,
  getBudgetRanges,
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

const generateBrandListItems = () => {
  let result = '';
  const brands = getBrands();
  for (const brand of brands) {
    result += `<li>${brand}</li>`;
  }
  return result;
};

const generateBudgetListItems = () => {
  let result = '';
  const budgetRanges = getBudgetRanges();
  for (const budgetRange of budgetRanges) {
    result += `<li>${budgetRange}</li>`;
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
        <div class="dropdown-container">
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
        <div class="dropdown-container">
          <div class="selected-item brand">
            <span id="selected-brand" class="body-medium">Any</span>
            <div class="dropdown-controls">
              <div class="clean"></div>
              <div class="open"></div>
            </div>
          </div>
          <ul class="dropdown-options brand">
            ${generateBrandListItems()}
          </ul>
        </div>
      </div>
      <div class="filter-block">
        <label class="body-semibold-extra">
          What budget?
        </label>
        <div class="dropdown-container">
          <div class="selected-item budget">
            <span id="selected-budget" class="body-medium">Any</span>
            <div class="dropdown-controls">
              <div class="clean"></div>
              <div class="open"></div>
            </div>
          </div>
          <ul class="dropdown-options budget">
            ${generateBudgetListItems()}
          </ul>
        </div>
      </div>
    </div>
    <div class="search-line">
      <img class="search-icon" src="icons/search.svg" />
      <input id="search" type="text" placeholder="Search whiskey" class="body-medium" />
      <div class="search-clean"></div>
    </div>

    <button class="find-btn body-semibold">Find</button>
  </div>
</div>
`;
};

await initializeWhiskey();

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

  $('.find-btn').click(function () {
    handleClick();
  });
});

$('#searchBlock').html(search());

registerBlockTitle('search-block-title');
