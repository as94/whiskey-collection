import { setWhiskey, getWhiskey } from './state.js';
import whiskeyData from '../assets/whiskey.json';

export const initializeWhiskey = async () => {
  const whiskey = getWhiskey();
  if (whiskey.length === 0) {
    setWhiskey(whiskeyData);
  }
};
