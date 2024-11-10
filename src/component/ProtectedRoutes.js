import { getAccessToken } from "../helpers/authConfig";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const token = getAccessToken();
  if (token === null) {
    return <Navigate to="/user/login" />;
  } else {
    return children;
  }
};

export default ProtectedRoutes;
