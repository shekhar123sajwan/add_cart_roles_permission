import { useDispatch } from "react-redux";
import { getAuthUserData } from "../helpers/authConfig";
import { login, logout } from "../utils/userSlice";
import { clearUserTokens } from "../helpers/storage";
import { useEffect } from "react";

export const useLoadAuthConfig = () => {
  const dispatch = useDispatch();
  const loadAuthConfig = async () => {
    const userData = await getAuthUserData();
    if (userData?.accessToken) {
      const userData = await getAuthUserData();
      dispatch(login(userData));
    } else if (userData !== null) {
      dispatch(login(userData));
    } else {
      dispatch(logout());
      clearUserTokens();
    }
  };
  useEffect(() => {
    loadAuthConfig();
  }, []);
};
