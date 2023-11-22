import showdown from 'showdown';
import content from '../../../assets/posts/WhichTypeOfWhiskeyDoPeopleDrinkOften/WhichTypeOfWhiskeyDoPeopleDrinkOften.md';
import article from '../../../assets/posts/WhichTypeOfWhiskeyDoPeopleDrinkOften/article.json';

const converter = new showdown.Converter();
const htmlContent = converter.makeHtml(content);

const element = document.getElementById('blogPost');
if (element) {
  const title = document.createElement('h1');
  title.textContent = article.title;
  element.appendChild(title);

  const tags = document.createElement('p');
  tags.textContent = article.tags.join(', '); // TODO: for a while
  element.appendChild(tags);

  const previewImg = document.createElement('img');
  previewImg.src = article.previewImagePath;
  previewImg.alt = article.previewImagePath
    .replace(/^.*[\\\/]/, '')
    .replace(/\.[^/.]+$/, '');
  element.appendChild(previewImg);

  var tempContainer = document.createElement('div');
  tempContainer.innerHTML = htmlContent;
  console.log('tempContainer.innerHTML', tempContainer.innerHTML);

  const imgElements = tempContainer.querySelectorAll('img');
  console.log('imgElements', imgElements);
  for (let i = imgElements.length - 1; i >= 0; i--) {
    if (i % 2 === 0) {
      imgElements[i].style.float = 'left';
      imgElements[i].style.marginRight = '15px';
    } else {
      imgElements[i].style.float = 'right';
      imgElements[i].style.marginLeft = '15px';
    }
  }

  element.appendChild(tempContainer);
}
