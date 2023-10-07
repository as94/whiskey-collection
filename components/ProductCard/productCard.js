import { initializeWhiskey } from '../../services/loadWhiskey.js';
import { getWhiskeyByName } from '../../services/state.js';
import { getProductName } from '../../services/urlSearchParams.js';
import { emptyElement } from '../../services/emptyElement.js';

const wineSearcherUrl = 'https://www.wine-searcher.com';

await initializeWhiskey();

const productCard = () => {
  const productName = getProductName();
  if (!productName) {
    return emptyElement;
  }
  const whiskeyByName = getWhiskeyByName();
  const product = whiskeyByName[productName];
  if (!product) {
    return emptyElement;
  }
  return `
<link rel="stylesheet" href="./components/ProductCard/productCard.css" />
<div class="product-card">
  <h2 class="h2 product-card-header">${productName}</h2>
  <div class="product-card-body">
    <div class="left-side">
      <div class="whiskey-image">
        <img
          class="background-image"
          src="images/product-card-backgrounds/main.webp"
        />
        <img
          class="foreground-image"
          src="${product.ImageLink}"
          title="${product.Name}"
          alt="${product.Description}"
        />
      </div>
    </div>
    <div class="right-side">
      <div class="characteristic-list">
        ${
          product.Country &&
          `<div class="characteristic">
              <span class="body-semibold">Country: </span>
              <span class="body-medium">${product.Country}</span>
          </div>`
        }

        ${
          product.Brand &&
          `<div class="characteristic">
              <span class="body-semibold">Brand: </span>
              <span class="body-medium">${product.Brand}</span>
          </div>`
        }

        ${
          product.Categories &&
          `<div class="characteristic">
              <span class="body-semibold">Category: </span>
              <span class="body-medium">${product.Categories}</span>
          </div>`
        }

        ${
          product.TastingNotes &&
          `<div class="characteristic">
              <span class="body-semibold">Tasting Notes: </span>
              <span class="body-medium">${product.TastingNotes}</span>
          </div>`
        }

        ${
          product.YearsAged &&
          `<div class="characteristic">
              <span class="body-semibold">Age: </span>
              <span class="body-medium">${product.YearsAged}</span>
          </div>`
        }

        ${
          product.ABV &&
          `<div class="characteristic">
              <span class="body-semibold">ABV: </span>
              <span class="body-medium">${product.ABV}</span>
          </div>`
        }

        ${
          product.Volume &&
          `<div class="characteristic">
              <span class="body-semibold">Volume: </span>
              <span class="body-medium">${product.Volume}</span>
          </div>`
        }

        ${
          product.Price &&
          `<div class="characteristic">
              <span class="body-semibold">Average price: </span>
              <span class="body-medium">${product.Price}</span>
          </div>`
        }

        ${
          product.Rating &&
          `<div class="characteristic">
              <span class="body-semibold">Rating: </span>
              <span class="body-medium">${product.Rating}</span>
          </div>`
        }

        ${
          product.RateCount &&
          `<div class="characteristic">
              <span class="body-semibold">Reviews: </span>
              <span class="body-medium">${product.RateCount}</span>
          </div>`
        }
      </div>

      <a class="find-outside-btn body-semibold" data-no-select href="${wineSearcherUrl}/find/${
    product.Name
  }?referring_site=WhiskeyCollection">Find on Wine-Searcher</a>
    </div>
  </div>

  ${
    product.Description &&
    `<p class="description body-medium">${product.Description}</p>`
  }
</div>
`;
};

// 'https://www.wine-searcher.com/find/evan williams 1783 small batch bourbon?referring_site=WhiskeyCollection';

const element = document.getElementById('productCard');
if (element) {
  element.innerHTML = productCard();
}
