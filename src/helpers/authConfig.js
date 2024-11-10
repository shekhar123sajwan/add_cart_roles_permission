import {
  getLocalStorage,
  getSessionStorage,
  setLocalStorage,
  setSessionStorage,
} from "./storage";
import { ACCESS_TOKEN_EXPIRE_TIME } from "../data/constants";

export const getAuthUserData = async () => {
  const user = await getAuthUser();
  return user;
};

export const getAccessToken = () => {
  const rememberMe = getLocalStorage("rememberMe");
  let token = null;
  if (rememberMe && rememberMe == 1) {
    token = getLocalStorage("accessToken");
  } else {
    token = getSessionStorage("accessToken");
  }
  return token;
};

export const getRefereshToken = () => {
  const rememberMe = getLocalStorage("rememberMe");
  let token = null;
  if (rememberMe && rememberMe == 1) {
    token = getLocalStorage("refreshToken");
  } else {
    token = getSessionStorage("refreshToken");
  }
  return token;
};

const getAuthUser = async () => {
  const token = getAccessToken();
  if (!token) return null;
  try {
    const response = await fetch("/auth/me", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.status === 401 && data?.message === "Token Expired!") {
      fetch("/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refreshToken: getRefereshToken(), // Optional, if not provided, the server will use the cookie
          expiresInMins: ACCESS_TOKEN_EXPIRE_TIME,
        }),
        credentials: "include", // Include cookies (e.g., accessToken) in the request
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.accessToken) {
            const rememberMe = getLocalStorage("rememberMe");
            if (rememberMe && rememberMe == 1) {
              setLocalStorage("accessToken", data.accessToken);
              setLocalStorage("refreshToken", data.refreshToken);
            } else {
              setSessionStorage("accessToken", data.accessToken);
              setSessionStorage("refreshToken", data.refreshToken);
            }
          }
        });
      return data;
    }
    if (response.status === 200) return data;
    return null;
  } catch (error) {
    console.log(error);
  }
};
