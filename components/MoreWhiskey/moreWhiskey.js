import { initializeWhiskey } from '../../services/loadWhiskey.js';
import { registerBlockTitle } from '../BlockTitle/blockTitle.js';
import { getProductName } from '../../services/urlSearchParams.js';
import { getWhiskeyByName, getWhiskeyByBrand } from '../../services/state.js';
import { emptyElement } from '../../services/emptyElement.js';
import { catalog } from '../Catalog/catalog.js';

await initializeWhiskey();

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
    [product.Brand].filter(x => x.Name !== productName)
    .sort((a, b) => a.Name.localeCompare(b.Name));
  if (!whiskeyByBrand || whiskeyByBrand.length === 0) {
    return emptyElement;
  }

  return `
<link rel="stylesheet" href="./components/MoreWhiskey/moreWhiskey.css" />
<div class="more-whiskey">
    <div id="more-block-title" firstRow="More" secondRow="${
      product.Brand
    }"></div>
</div>
${catalog(whiskeyByBrand)}
`;
};

$('#more-whiskey').html(moreWhiskey());

registerBlockTitle('more-block-title');
