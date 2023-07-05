import { initializeWhiskey } from '../../services/loadWhiskey.js';
import { getWhiskeyByName } from '../../services/state.js';
import { getProductName } from '../../services/urlSearchParams.js';
import { emptyElement } from '../../services/emptyElement.js';

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
  <div class="left-side">
    <div class="whiskey-image">
      <img
        class="background-image"
        src="images/product-card-backgrounds/main.png"
      />
      <img
        class="foreground-image"
        src="${product.ImageLink}"
      />
    </div>
  </div>
  <div class="right-side">
    <div class="h-3 product-card-header">${productName}</div>
    <div class="characteristic-list">
      ${
        product.Country &&
        `<div class="characteristic">
            <span class="body-text-18">Country: </span>
            <span class="body-text-18">${product.Country}</span>
        </div>`
      }

      ${
        product.Brand &&
        `<div class="characteristic">
            <span class="body-text-18">Brand: </span>
            <span class="body-text-18">${product.Brand}</span>
        </div>`
      }

      ${
        product.Categories &&
        `<div class="characteristic">
            <span class="body-text-18">Category: </span>
            <span class="body-text-18">${product.Categories}</span>
        </div>`
      }

      ${
        product.TastingNotes &&
        `<div class="characteristic">
            <span class="body-text-18">Tasting Notes: </span>
            <span class="body-text-18">${product.TastingNotes}</span>
        </div>`
      }

      ${
        product.YearsAged &&
        `<div class="characteristic">
            <span class="body-text-18">Age: </span>
            <span class="body-text-18">${product.YearsAged}</span>
        </div>`
      }

      ${
        product.ABV &&
        `<div class="characteristic">
            <span class="body-text-18">ABV: </span>
            <span class="body-text-18">${product.ABV}</span>
        </div>`
      }

      ${
        product.Volume &&
        `<div class="characteristic">
            <span class="body-text-18">Volume: </span>
            <span class="body-text-18">${product.Volume}</span>
        </div>`
      }

      ${
        product.Price &&
        `<div class="characteristic">
            <span class="body-text-18">Average price: </span>
            <span class="body-text-18">${product.Price}</span>
        </div>`
      }
    </div>

    ${
      product.Description &&
      `<div class="line"></div>
    <div class="description body-text-16">${product.Description}</div>`
    }
  </div>
</div>
`;
};

$('#productCard').html(productCard());
