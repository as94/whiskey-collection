export const onCategoryClick = category => {
  var params = new URLSearchParams(window.location.search);
  params.set('category', category);
  var newUrl = 'catalog.html' + '?' + params.toString();
  window.location.href = newUrl;
};

export const getCategory = () => {
  var params = new URLSearchParams(window.location.search);
  return params.get('category');
};
