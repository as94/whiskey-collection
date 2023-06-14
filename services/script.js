import { setWhiskey } from './state.js';
import { whiskeyLoaded } from './customEvents.js';

(async () => {
  const response = await fetch('./services/whiskey.json');
  setWhiskey(await response.json());

  const event = new CustomEvent(whiskeyLoaded);
  window.dispatchEvent(event);
})();
