import { setWhiskey, getWhiskey } from './state.js';

export const initializeWhiskey = async () => {
  const whiskey = getWhiskey();
  if (whiskey.length === 0) {
    try {
      const response = await fetch('../assets/whiskey.json');
      const whiskeyData = await response.json();
      setWhiskey(whiskeyData);
    } catch (error) {
      console.error('Error loading whiskey data:', error);
    }
  }
};
