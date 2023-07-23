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
    <h3 class="h3-bold-32 product-card-header">${productName}</h3>
    <div class="line"></div>
    <div class="characteristic-list">
      ${
        product.Country &&
        `<div class="characteristic">
            <span class="body-semibold-16">Country: </span>
            <span class="body-medium-16">${product.Country}</span>
        </div>`
      }

      ${
        product.Brand &&
        `<div class="characteristic">
            <span class="body-semibold-16">Brand: </span>
            <span class="body-medium-16">${product.Brand}</span>
        </div>`
      }

      ${
        product.Categories &&
        `<div class="characteristic">
            <span class="body-semibold-16">Category: </span>
            <span class="body-medium-16">${product.Categories}</span>
        </div>`
      }

      ${
        product.TastingNotes &&
        `<div class="characteristic">
            <span class="body-semibold-16">Tasting Notes: </span>
            <span class="body-medium-16">${product.TastingNotes}</span>
        </div>`
      }

      ${
        product.YearsAged &&
        `<div class="characteristic">
            <span class="body-semibold-16">Age: </span>
            <span class="body-medium-16">${product.YearsAged}</span>
        </div>`
      }

      ${
        product.ABV &&
        `<div class="characteristic">
            <span class="body-semibold-16">ABV: </span>
            <span class="body-medium-16">${product.ABV}</span>
        </div>`
      }

      ${
        product.Volume &&
        `<div class="characteristic">
            <span class="body-semibold-16">Volume: </span>
            <span class="body-medium-16">${product.Volume}</span>
        </div>`
      }

      ${
        product.Price &&
        `<div class="characteristic">
            <span class="body-semibold-16">Average price: </span>
            <span class="body-medium-16">${product.Price}</span>
        </div>`
      }
    </div>

    ${
      product.Description &&
      `<div class="line"></div>
    <p class="description body-medium-16">${product.Description}</p>`
    }
  </div>
</div>
`;
};

$('#productCard').html(productCard());
