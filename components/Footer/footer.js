const response = await fetch('./components/Footer/footer.html');
const htmlContent = await response.text();

const element = document.getElementById('mainFooter');
if (element) {
  element.innerHTML = htmlContent.replace('${year}', new Date().getFullYear());
}
