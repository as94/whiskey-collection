import { getCategory } from '../../services/categoryChanges.js';
import { whiskeyCategoryDescriptions } from '../../services/whiskeyCategoryDescriptions.js';

const categoryDescription = () => {
  const category = getCategory();
  return `
<link rel="stylesheet" href="./components/CategoryDescription/categoryDescription.css" />
<div class="category-description">
  <img class="category-image" src="images/atmosphere-2.jpg" />
  <div class="description">
    <div class="title h-2">${category.toUpperCase()}</div>
    <div class="text body-text-18">
      ${whiskeyCategoryDescriptions[category]}
    </div>
  </div>
</div>
`;
};

$('#category-description').html(categoryDescription());
