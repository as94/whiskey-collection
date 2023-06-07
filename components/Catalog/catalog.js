const generateCatalogRows = count => {
  let result = '';
  for (let index = 0; index < count; index++) {
    if (index % 2 === 0) {
      result += `<div class="card">
      <div class="whiskey-image">
        <img
          class="background-image"
          src="images/product-card-backgrounds/dark-green.png"
        />
        <img class="foreground-image" src="images/whiskey/aberlour.png" />
      </div>
      <div class="whiskey-name body-text-18">
        Angel’s Envy Kentucky Straight Bourbon Whiskey
      </div>
      <div class="whiskey-characteristics body-text-18">70cl/40%</div>
    </div>`;
    } else {
      result += `<div class="card">
      <div class="whiskey-image">
        <img
          class="background-image"
          src="images/product-card-backgrounds/light-green.png"
        />
        <img class="foreground-image" src="images/whiskey/glenfiddich.png" />
      </div>
      <div class="whiskey-name body-text-18">
        Angel’s Envy Kentucky Straight Bourbon Whiskey
      </div>
      <div class="whiskey-characteristics body-text-18">70cl/40%</div>
    </div>`;
    }
  }

  if (count % 3 !== 0) {
    result += `<div class="card">
    <img src="images/atmosphere-1.jpg" />
  </div>`;
  }

  return result;
};

export const catalog = count => `
<link rel="stylesheet" href="./components/Catalog/catalog.css" />
<div class="catalog">
  ${generateCatalogRows(count)}
</div>
`;

$(document).ready(() => {
  $('.card').click(() => {
    window.location.href = 'productCard.html';
  });
});

$('#catalog').html(catalog(11));
