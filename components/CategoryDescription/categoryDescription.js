import { getCategory } from '../../services/urlSearchParams.js';
import { whiskeyCategoryDescriptions } from '../../services/whiskeyCategoryDescriptions.js';

const categoryDescription = () => {
  const category = getCategory();
  return `
<link rel="stylesheet" href="./components/CategoryDescription/categoryDescription.css" />
<div class="category-description">
  <img class="category-image" src="${whiskeyCategoryDescriptions[category].ImageLink}" title="${category}" alt="${category}" />
  <div class="description">
    <h2 class="title h2">${category}</h2>
    <p class="text body-medium-large">
      ${whiskeyCategoryDescriptions[category].Description}
    </p>
  </div>
</div>
`;
};

$('#category-description').html(categoryDescription());
