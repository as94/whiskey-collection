const postContext = require.context(
  '!raw-loader!../assets/posts',
  true,
  /article\.json$/
);

const postsByKey = {};

const fillAllPosts = async () =>
  await Promise.all(
    postContext.keys().map(async key => {
      const postPath = key.slice(2, key.lastIndexOf('/'));

      const postData = postContext(key);
      const contentPath = postData.contentPath || 'content.md';

      const content = await import(
        `!raw-loader!../assets/posts/${postPath}/${contentPath}`
      );

      const post = {
        key: postPath,
        article: JSON.parse(postData.default),
        markdownContent: content.default,
      };

      postsByKey[post.key] = post;
    })
  );

await fillAllPosts();

const getPost = key => {
  if (postsByKey[key]) {
    return postsByKey[key];
  } else {
    return null;
  }
};

const posts = Object.values(postsByKey);

export { posts, getPost };
