import showdown from 'showdown';
import posts from '../../../services/post-context';
import postContent from './post.html';
import postListContent from './postList.html';
import './postList.css';

const converter = new showdown.Converter();

const element = document.getElementById('blogPostList');
if (element) {
  const orderedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.article.publicationDate);
    const dateB = new Date(b.article.publicationDate);
    return dateB - dateA;
  });

  let result = '';
  for (let i = 0; i < orderedPosts.length; i++) {
    const post = orderedPosts[i];

    const content = converter.makeHtml(post.markdownContent);

    const tags = post.article.tags.map(
      tag => `<span class="tag body-small">${tag}</span>`
    );

    result += postContent
      .replace(
        '${previewImgLink}',
        `assets/posts/${post.article.previewImagePath}`
      )
      .replace('${tags}', tags)
      .replace('${title}', post.article.title)
      .replace(
        '${description}',
        content
          .split(/\s+/)
          .map(x => x.replace(',', ''))
          .slice(0, 30)
          .join(' ') + ' ...'
      );
  }

  if (posts.length % 3 === 2) {
    result += `<div class="empty-block"></div>`;
  }

  element.innerHTML = postListContent.replace('${posts}', result);
}
