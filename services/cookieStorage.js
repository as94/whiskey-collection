export const setConfirmUsersAgeCookie = () => {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + 1);
  document.cookie = 'isUserConfirmedAge=true';
};

export const setNotConfirmUsersAgeCookie = () => {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + 1);
  document.cookie = `isUserConfirmedAge=false; expires=${currentDate.toUTCString()}; path=/`;
};

export const getUserConfirmedAgeCookie = () => {
  const isUserConfirmedAge = getCookie('isUserConfirmedAge');
  return isUserConfirmedAge;
};

const getCookie = name => {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) {
      return cookieValue;
    }
  }

  return null;
};
