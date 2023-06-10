import { setWhiskey } from './services/state.js';
import { whiskeyLoaded } from './services/customEvents.js';

(async () => {
  const response = await fetch('./services/whiskey.json');
  setWhiskey(await response.json());

  const event = new CustomEvent(whiskeyLoaded);
  window.dispatchEvent(event);
})();
