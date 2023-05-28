const searchInput = `
<link rel="stylesheet" href="./components/SearchInput/searchInput.css" />
<div class="search-block">
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
  </div>
</div>
`;

$(document).ready(function () {
  const filters = ['country', 'brand', 'budget'];

  const root = '.filter-block .dropdown-container';

  for (const filter of filters) {
    $(`${root} .selected-item.${filter}`).click(function () {
      $(this).toggleClass('active');
      $(`${root} .dropdown-options.${filter}`).toggleClass('show');
    });

    $(`${root} .dropdown-options.${filter} > li`).click(function () {
      var selectedOption = $(this).text();
      $(`#selected-${filter}`).text(selectedOption);
      $(`${root} .dropdown-options.${filter} > li`).removeClass('selected');
      $(this).addClass('selected');
      $(`${root} .dropdown-options`).removeClass('show');
      $(`${root} .selected-item`).removeClass('active');
    });
  }

  $(document).click(function (event) {
    var target = $(event.target);
    if (!target.closest(root).length) {
      $(`${root} .dropdown-options`).removeClass('show');
      $(`${root} .selected-item`).removeClass('active');
    }
  });
});

$('#searchInput').html(searchInput);
