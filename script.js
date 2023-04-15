'use strict';

const whiskeyCollection = document.getElementById('whiskey-collection');

const getWhiskey = async () => {
  const url =
    'https://wandering-sky-6e0a.anatoly-sorokin-personal1751.workers.dev/';

  const response = await fetch(url);

  return await response.json();
};

const run = async () => {
  const whiskey = await getWhiskey();

  for (const item of whiskey) {
    const product = document.createElement('div');
    product.style.width = '300px';
    product.style.border = '1px solid #ccc';
    product.style.textAlign = 'center';

    const img = document.createElement('img');
    img.src = item.ImageUrl;
    img.style.maxWidth = '100%';
    img.style.height = '300px';
    img.style.objectFit = 'contain';
    img.style.display = 'inline-block';
    img.style.margin = 'auto';

    product.appendChild(img);

    const name = document.createElement('p');
    name.innerText = item.Name;
    product.appendChild(name);

    whiskeyCollection.appendChild(product);
  }
};

run();
