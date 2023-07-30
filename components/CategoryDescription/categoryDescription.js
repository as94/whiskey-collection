import { getCategory } from '../../services/urlSearchParams.js';
import { whiskeyCategoryDescriptions } from '../../services/whiskeyCategoryDescriptions.js';

const categoryDescription = () => {
  const category = getCategory();
  return `
<link rel="stylesheet" href="./components/CategoryDescription/categoryDescription.css" />
<div class="category-description">
  <img class="category-image" src="images/atmosphere-2.jpg" />
  <div class="description">
    <h2 class="title h2">${category.toUpperCase()}</h2>
    <p class="text body-medium-large">
      ${whiskeyCategoryDescriptions[category]}
    </p>
  </div>
</div>
`;
};

$('#category-description').html(categoryDescription());
