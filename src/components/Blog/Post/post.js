import content from '../../../assets/posts/WhichTypeOfWhiskeyDoPeopleDrinkOften/WhichTypeOfWhiskeyDoPeopleDrinkOften.md';
import showdown from 'showdown';

const converter = new showdown.Converter();
const htmlContent = converter.makeHtml(content);

const element = document.getElementById('blogPost');
if (element) {
  element.innerHTML = htmlContent;
}
