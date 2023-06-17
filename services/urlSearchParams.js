export const changeCategory = category => {
  var params = new URLSearchParams(window.location.search);
  params.set('category', category);
  var newUrl = 'catalog.html' + '?' + params.toString();
  window.location.href = newUrl;
};

export const getCategory = () => {
  var params = new URLSearchParams(window.location.search);
  return params.get('category');
};

export const changePage = page => {
  var params = new URLSearchParams(window.location.search);
  params.set('page', page);
  var newUrl =
    window.location.pathname + '?' + params.toString() + '#catalog-result';
  window.location.href = newUrl;
};

export const getPage = () => {
  var params = new URLSearchParams(window.location.search);
  const page = params.get('page');
  if (page) {
    return Number(page);
  }
  return 1;
};
