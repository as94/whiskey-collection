const state = {
  whiskey: [],
};

export const setWhiskey = whiskey => {
  state.whiskey = whiskey;
};

export const getWhiskey = () => state.whiskey;
