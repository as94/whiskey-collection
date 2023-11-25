import './postList.css';

const content = `<div class="blog-post-list-content">
  <div class="post-list-item">
    <img
      src="assets/posts/WhichTypeOfWhiskeyDoPeopleDrinkOften/preview.webp"
      alt="Preview"
      width="300"
      height="300"
    />
    <div><span class="tag body-small">American whiskey</span></div>
    <div class="title body-semibold-large">
      Why do the people drink American whiskey often?
    </div>
    <p class="description body-medium">
      Alright, fellow whiskey aficionados, grab your favorite glass because
      we're about to embark on a deep dive into the world of everyone's favorite...
    </p>
    <a class="read-article-link body-semibold">Read</a>
  </div>
  <div class="post-list-item">
    <img
      src="assets/posts/WhichTypeOfWhiskeyDoPeopleDrinkOften/preview.webp"
      alt="Preview"
      width="300"
      height="300"
    />
    <div><span class="tag body-small">American whiskey</span></div>
    <div class="title body-semibold-large">
      Why do the people drink American whiskey often?
    </div>
    <p class="description body-medium">
      Alright, fellow whiskey aficionados, grab your favorite glass because
      we're about to embark on a deep dive into the world of everyone's favorite...
    </p>
    <a class="read-article-link body-semibold">Read</a>
  </div>
  <div class="post-list-item">
    <img
      src="assets/posts/WhichTypeOfWhiskeyDoPeopleDrinkOften/preview.webp"
      alt="Preview"
      width="300"
      height="300"
    />
    <div><span class="tag body-small">American whiskey</span></div>
    <div class="title body-semibold-large">
      Why do the people drink American whiskey often?
    </div>
    <p class="description body-medium">
      Alright, fellow whiskey aficionados, grab your favorite glass because
      we're about to embark on a deep dive into the world of everyone's favorite...
    </p>
    <a class="read-article-link body-semibold">Read</a>
  </div>

  <div class="post-list-item">
    <img
      src="assets/posts/WhichTypeOfWhiskeyDoPeopleDrinkOften/preview.webp"
      alt="Preview"
      width="300"
      height="300"
    />
    <div><span class="tag body-small">American whiskey</span></div>
    <div class="title body-semibold-large">
      Why do the people drink American whiskey often?
    </div>
    <p class="description body-medium">
      Alright, fellow whiskey aficionados, grab your favorite glass because
      we're about to embark on a deep dive into the world of everyone's favorite...
    </p>
    <a class="read-article-link body-semibold">Read</a>
  </div>

  <div class="post-list-item">
    <img
      src="assets/posts/WhichTypeOfWhiskeyDoPeopleDrinkOften/preview.webp"
      alt="Preview"
      width="300"
      height="300"
    />
    <div><span class="tag body-small">American whiskey</span></div>
    <div class="title body-semibold-large">
      Why do the people drink American whiskey often?
    </div>
    <p class="description body-medium">
      Alright, fellow whiskey aficionados, grab your favorite glass because
      we're about to embark on a deep dive into the world of everyone's favorite...
    </p>
    <a class="read-article-link body-semibold">Read</a>
  </div>
  <div class="empty-block"></div>
</div>
`;

const element = document.getElementById('blogPostList');
if (element) {
  element.innerHTML = content;
}
