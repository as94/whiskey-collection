import { registerBlockTitle } from '../BlockTitle/blockTitle.js';

const search = `
<link rel="stylesheet" href="./components/Search/search.css" />
<div class="search-block">
  <div id="search-block-title" firstRow="I want to" secondRow="Find"></div>
  <div class="search-parameters">
    <div class="filters">
      <div class="filter-block">
        <label for="country" class="body-text-20">
          What country?
        </label>
        <div class="dropdown-container">
          <div class="selected-item country">
            <span id="selected-country" class="body-text-16">
              United States
            </span>
            <img src="icons/chevron.svg" />
          </div>
          <ul class="dropdown-options country">
            <li class="selected">United States</li>
            <li>UK</li>
            <li>Japan</li>
          </ul>
        </div>
      </div>
      <div class="filter-block">
        <label for="brand" class="body-text-20">
          What brand?
        </label>
        <div class="dropdown-container">
          <div class="selected-item brand">
            <span id="selected-brand" class="body-text-16">
              Jack Daniel's
            </span>
            <img src="icons/chevron.svg" />
          </div>
          <ul class="dropdown-options brand">
            <li class="selected">Jack Daniel's</li>
            <li>Singleton</li>
            <li>Macallan</li>
          </ul>
        </div>
      </div>
      <div class="filter-block">
        <label for="budget" class="body-text-20">
          What budget?
        </label>
        <div class="dropdown-container">
          <div class="selected-item budget">
            <span id="selected-budget" class="body-text-16">
              30-60
            </span>
            <img src="icons/chevron.svg" />
          </div>
          <ul class="dropdown-options budget">
            <li class="selected">30-60</li>
            <li>60-90</li>
            <li>90-120</li>
            <li>120-150</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="search-line">
      <img class="search-icon" src="icons/search.svg" />
      <input type="text" placeholder="Search whiskey" class="body-text-16" />
    </div>

    <button class="find-btn body-text-18">Find</button>
  </div>
</div>
`;

$('#searchBlock').html(search);

registerBlockTitle('search-block-title');

$(document).ready(function () {
  const filters = ['country', 'brand', 'budget'];

  for (const filter of filters) {
    $(`.selected-item.${filter}`).click(function () {
      $(this).toggleClass('active');
      $(`.dropdown-options.${filter}`).toggleClass('show');
    });

    $(`.dropdown-options.${filter} > li`).click(function () {
      var selectedOption = $(this).text();
      $(`#selected-${filter}`).text(selectedOption);
      $(`.dropdown-options.${filter} > li`).removeClass('selected');
      $(this).addClass('selected');
      $('.dropdown-options').removeClass('show');
      $('.selected-item').removeClass('active');
    });
  }

  $(document).click(function (event) {
    var target = $(event.target);
    if (!target.closest('.dropdown-container').length) {
      $('.dropdown-options').removeClass('show');
      $('.selected-item').removeClass('active');
    }
  });
});