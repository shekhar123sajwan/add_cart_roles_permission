export const getCookie = (name) => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  if (cookie) {
    return cookie.split("=")[1];
  }
  return null;
};

export const deleteCookie = (name) => {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

export const setCookie = (name, value, timeInSeconds) => {
  let expires = "";
  if (timeInSeconds) {
    const date = new Date();
    date.setTime(date.getTime() + timeInSeconds * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  const sameSite = "; SameSite=None";
  document.cookie =
    name + "=" + (value || "") + expires + "; path=/" + sameSite;
};
