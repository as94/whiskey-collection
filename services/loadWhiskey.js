import { setWhiskey, getWhiskey } from './state.js';

export const initializeWhiskey = async () => {
  const whiskey = getWhiskey();
  if (whiskey.length === 0) {
    const response = await fetch('./services/whiskey.json');
    setWhiskey(await response.json());
  }
};
