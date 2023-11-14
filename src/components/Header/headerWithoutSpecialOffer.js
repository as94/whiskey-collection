const response = await fetch(
  './components/Header/headerWithoutSpecialOffer.html'
);
const htmlContent = await response.text();

const element = document.getElementById('mainHeader');
if (element) {
  element.innerHTML = htmlContent;
}
