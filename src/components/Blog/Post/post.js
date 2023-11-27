import showdown from 'showdown';
import { getPostTitleKey } from '../../../services/urlSearchParams.js';
import { getPost } from '../../../services/post-context.js';
import postContent from './post.html';
import './post.css';

const element = document.getElementById('blogPost');
if (element) {
  const postTitleKey = getPostTitleKey();
  const post = getPost(postTitleKey);

  var tempContainer = document.createElement('div');

  const converter = new showdown.Converter();
  tempContainer.innerHTML = converter.makeHtml(post.markdownContent);

  const h2Elements = tempContainer.querySelectorAll('h2');
  for (let i = 0; i < h2Elements.length; i++) {
    h2Elements[i].classList.add('h2');
  }

  const h3Elements = tempContainer.querySelectorAll('h3');
  for (let i = 0; i < h3Elements.length; i++) {
    h3Elements[i].classList.add('h3');
  }

  const pElements = tempContainer.querySelectorAll('p');
  for (let i = 0; i < pElements.length; i++) {
    if (i === 0) {
      pElements[i].classList.add('post-preview');
    } else {
      pElements[i].classList.add('post-paragraph');
    }
  }

  const imgElements = tempContainer.querySelectorAll('img');
  for (let i = 0; i < imgElements.length; i++) {
    imgElements[i].style.width = '400px';
    imgElements[i].style.marginTop = '25px';
    imgElements[i].style.marginBottom = '25px';
    if (i % 2 === 0) {
      imgElements[i].style.float = 'right';
      imgElements[i].style.marginLeft = '25px';
    } else {
      imgElements[i].style.float = 'left';
      imgElements[i].style.marginRight = '25px';
    }
  }

  const aElements = tempContainer.querySelectorAll('a');
  for (let i = 0; i < aElements.length; i++) {
    const productName = aElements[i].textContent;
    const link = `catalog-by-search-results?searchText=${encodeURIComponent(
      productName
    )}&page=1`;

    aElements[i].href = link;

    aElements[i].target = '_blank';
    aElements[i].rel = 'noopener noreferrer';
  }

  const tags = post.article.tags.map(
    tag => `<span class="tag body-small">${tag}</span>`
  );

  element.innerHTML = postContent
    .replace('${title}', post.article.title)
    .replace('${tags}', tags)
    .replace('${mainImgLink}', `assets/posts/${post.article.mainImagePath}`)
    .replace('${readingTimeInMinutes}', post.article.readingTimeInMinutes)
    .replace(
      '${publicationDate}',
      new Date(post.article.publicationDate).toDateString()
    )
    .replace('${articleContent}', tempContainer.innerHTML);
}
