const url =
  'https://worker-dry-bar-a3d5.anatoly-sorokin-personal1751.workers.dev';

export const sendNotification = async email => {
  try {
    await fetch(`${url}?email=${email}`, {
      method: 'GET',
      mode: 'no-cors',
    });
    return true;
  } catch {
    return false;
  }
};
