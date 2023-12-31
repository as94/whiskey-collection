import { initializeWhiskey } from '../../services/loadWhiskey.js';
import { getWhiskeyByName } from '../../services/state.js';
import { getProductName } from '../../services/urlSearchParams.js';
import { emptyElement } from '../../services/emptyElement.js';
import productCardContent from './productCard.html';
import './productCard.css';

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

  const hiddenCountry = product.Country ? '' : 'hidden';
  const hiddenBrand = product.Brand ? '' : 'hidden';
  const hiddenCategories = product.Categories ? '' : 'hidden';
  const hiddenTastingNotes = product.TastingNotes ? '' : 'hidden';
  const hiddenYearsAge = product.YearsAged ? '' : 'hidden';
  const hiddenABV = product.ABV ? '' : 'hidden';
  const hiddenVolume = product.Volume ? '' : 'hidden';
  const hiddenPrice = product.Price ? '' : 'hidden';
  const hiddenRating = product.Rating ? '' : 'hidden';
  const hiddenRateCount = product.RateCount ? '' : 'hidden';
  const hiddenDescription = product.Description ? '' : 'hidden';

  return productCardContent
    .replace('${productName}', productName)
    .replace('${productImageLink}', product.ImageLink)
    .replace('${productName}', product.Name)
    .replace('${productDescription}', product.Description)
    .replace('${hiddenCountry}', hiddenCountry)
    .replace('${productCountry}', product.Country)
    .replace('${hiddenBrand}', hiddenBrand)
    .replace('${productBrand}', product.Brand)
    .replace('${hiddenCategories}', hiddenCategories)
    .replace('${productCategories}', product.Categories)
    .replace('${hiddenTastingNotes}', hiddenTastingNotes)
    .replace('${productTastingNotes}', product.TastingNotes)
    .replace('${hiddenYearsAge}', hiddenYearsAge)
    .replace('${productYearsAged}', product.YearsAged)
    .replace('${hiddenABV}', hiddenABV)
    .replace('${productABV}', product.ABV)
    .replace('${hiddenVolume}', hiddenVolume)
    .replace('${productVolume}', product.Volume)
    .replace('${hiddenPrice}', hiddenPrice)
    .replace('${productPrice}', product.Price)
    .replace('${hiddenRating}', hiddenRating)
    .replace('${productRating}', product.Rating)
    .replace('${hiddenRateCount}', hiddenRateCount)
    .replace('${productRateCount}', product.RateCount)
    .replace(
      '${wineSearcherLink}',
      `${wineSearcherUrl}/find/${product.Name}?referring_site=WhiskeyCollection`
    )
    .replace('${hiddenDescription}', hiddenDescription)
    .replace('${productDescription}', product.Description);
};

const element = document.getElementById('productCard');
if (element) {
  element.innerHTML = productCard();

  const productName = getProductName();
  if (productName) {
    document.title = productName;

    const canonicalLink = document.getElementById('canonicalLink');
    if (canonicalLink) {
      const params = new URLSearchParams();
      params.set('productName', productName);
      canonicalLink.href = `${window.location.protocol}//${
        window.location.host
      }/product-card?${params.toString()}`;
    }

    const whiskeyByName = getWhiskeyByName();
    const product = whiskeyByName[productName];
    if (product) {
      var descriptionMetaTag = document.querySelector(
        'meta[name="description"]'
      );
      if (descriptionMetaTag) {
        descriptionMetaTag.setAttribute(
          'content',
          product.Description.split(/(?<=\.|\?|\!)\s/)
            .slice(0, 2)
            .join(' ')
        );
      }

      var keywordsMetaTag = document.querySelector('meta[name="keywords"]');
      if (keywordsMetaTag) {
        let keywords = '';
        if (product.Country) {
          keywords += product.Country;
        }
        if (product.Brand) {
          keywords += `, ${product.Brand}`;
        }
        if (product.Categories) {
          keywords += `, ${product.Categories}`;
        }
        if (product.TastingNotes) {
          keywords += `, ${product.TastingNotes}`;
        }
        if (product.ABV) {
          keywords += `, ${product.ABV}`;
        }
        if (product.Price) {
          keywords += `, ${product.Price}`;
        }
        keywordsMetaTag.setAttribute('content', keywords);
      }
    }
  }
}
