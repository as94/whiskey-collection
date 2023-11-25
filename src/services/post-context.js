const postContext = require.context(
  '!raw-loader!../assets/posts',
  true,
  /article\.json$/
);

const posts = await Promise.all(
  postContext.keys().map(async key => {
    const postPath = key.slice(2, key.lastIndexOf('/'));

    const postData = postContext(key);
    const contentPath = postData.contentPath || 'content.md';

    const content = await import(
      `!raw-loader!../assets/posts/${postPath}/${contentPath}`
    );

    return {
      key: postPath,
      article: JSON.parse(postData.default),
      markdownContent: content.default,
    };
  })
);

export default posts;
