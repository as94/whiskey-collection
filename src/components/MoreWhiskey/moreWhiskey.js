import { initializeWhiskey } from '../../services/loadWhiskey.js';
import { registerBlockTitle } from '../BlockTitle/blockTitle.js';
import { getProductName } from '../../services/urlSearchParams.js';
import { getWhiskeyByName, getWhiskeyByBrand } from '../../services/state.js';
import { emptyElement } from '../../services/emptyElement.js';
import { catalog } from '../Catalog/catalog.js';

await initializeWhiskey();

const response = await fetch('./components/MoreWhiskey/moreWhiskey.html');
const htmlContent = await response.text();

const moreWhiskey = () => {
  const productName = getProductName();
  if (!productName) {
    return emptyElement;
  }
  const whiskeyByName = getWhiskeyByName();
  const product = whiskeyByName[productName];
  if (!product) {
    return emptyElement;
  }
  const whiskeyByBrand = getWhiskeyByBrand()
    [product.Brand].filter(
      x => x.Name !== productName && x.Categories === product.Categories
    )
    .sort((a, b) => a.Name.localeCompare(b.Name));
  if (!whiskeyByBrand || whiskeyByBrand.length === 0) {
    return emptyElement;
  }

  return htmlContent
    .replace('${productCategories}', product.Categories)
    .replace('${productBrand}', product.Brand)
    .replace('${whiskeyCatalogByBrand}', catalog(whiskeyByBrand));
};

const element = document.getElementById('more-whiskey');
if (element) {
  element.innerHTML = moreWhiskey();
}

registerBlockTitle('more-block-title');
