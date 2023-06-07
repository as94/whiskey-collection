'use strict';

import { nextSlide, setFirstSlideActive } from './services/slider.js';
import { getWhiskey, setWhiskey } from './services/state.js';

const response = await fetch('./services/whiskey.json');
setWhiskey(await response.json());

const whiskey = getWhiskey();
console.log('whiskey', whiskey);

setFirstSlideActive();
setInterval(nextSlide, 5000);
