export const getLocalStorage = (keyName: string) => {
  return localStorage.getItem(keyName);
};

export const setLocalStorage = (keyName: string, value: string) => {
  return localStorage.setItem(keyName, value);
};

export const clearLocalStorage = () => {
  return localStorage.clear();
};
