import { useDispatch } from "react-redux";
import { login } from "../utils/userSlice";

export const useLoadAuthConfig = () => {
  const dispatch = useDispatch();
  const loadAuthConfig = () => {
    dispatch(login(data));
    if (rememberMe.current.checked) {
      //Instead LocalStorage Use Cookies
      setLocalStorage("accessToken", data.accessToken);
      setLocalStorage("refreshToken", data.refreshToken);
      setLocalStorage("rememberMe", rememberMe.current.checked);
    } else {
      setSessionStorage("accessToken", data.accessToken);
      setSessionStorage("refreshToken", data.refreshToken);
    }
  };

  return { loadAuthConfig };
};
