export const getLocalStorage = (key) => localStorage.getItem(key);
export const setLocalStorage = (key, value) => localStorage.setItem(key, value);
export const removeLocalStorage = (key) => localStorage.removeItem(key);

export const getSessionStorage = (key) => sessionStorage.getItem(key);
export const setSessionStorage = (key, value) =>
  sessionStorage.setItem(key, value);
export const removeSessionStorage = (key) => sessionStorage.removeItem(key);

export const clearUserTokens = () => {
  removeLocalStorage("accessToken");
  removeLocalStorage("refreshToken");
  removeSessionStorage("accessToken");
  removeSessionStorage("refreshToken");
};
