import footerContent from './footer.html';

const element = document.getElementById('mainFooter');
if (element) {
  element.innerHTML = footerContent.replace(
    '${year}',
    new Date().getFullYear()
  );
}
