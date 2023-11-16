import headerWithoutSpecialOfferContent from './headerWithoutSpecialOffer.html';

const element = document.getElementById('mainHeader');
if (element) {
  element.innerHTML = headerWithoutSpecialOfferContent;
}
