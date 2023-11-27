import showdown from 'showdown';
import { getPostTitleKey } from '../../../services/urlSearchParams.js';
import { getPost } from '../../../services/post-context.js';
import postContent from './post.html';
import './post.css';

const element = document.getElementById('blogPost');
if (element) {
  const postTitleKey = getPostTitleKey();
  const post = getPost(postTitleKey);

  // const content = post.article;

  // const title = document.createElement('h1');
  // title.textContent = content.title;
  // element.appendChild(title);

  // const tags = document.createElement('p');
  // tags.textContent = content.tags.join(', '); // TODO: for a while
  // element.appendChild(tags);

  // const previewImg = document.createElement('img');
  // previewImg.src = `assets/posts/${content.mainImagePath}`;
  // previewImg.alt = content.mainImagePath
  //   .replace(/^.*[\\\/]/, '')
  //   .replace(/\.[^/.]+$/, '');
  // element.appendChild(previewImg);

  var tempContainer = document.createElement('div');

  const converter = new showdown.Converter();
  tempContainer.innerHTML = converter.makeHtml(post.markdownContent);

  const imgElements = tempContainer.querySelectorAll('img');
  for (let i = imgElements.length - 1; i >= 0; i--) {
    if (i % 2 === 0) {
      imgElements[i].style.float = 'left';
      imgElements[i].style.marginRight = '15px';
    } else {
      imgElements[i].style.float = 'right';
      imgElements[i].style.marginLeft = '15px';
    }
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
      new Date(post.article.publicationDate).toLocaleDateString()
    )
    .replace('${articleContent}', tempContainer.innerHTML);
}
