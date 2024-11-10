import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import Main from "./pages/Main";
import Home from "./pages/Home";
import Permissions from "./pages/Permissions";
import Products from "./pages/Products";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

import Login from "./pages/Login";

import { lazy, Suspense } from "react";
import Loader from "./component/loader/Loader.js";
import ProtectedRoutes from "./component/ProtectedRoutes.js";

const UserLayout = lazy(() => import("./pages/UserLayout"));
const Profile = lazy(() => import("./pages/Profile"));
function App() {
  return (
    <div className="App">
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route
              path="/user"
              element={
                <Suspense fallback={<Loader />}>
                  <ProtectedRoutes>
                    <UserLayout />
                  </ProtectedRoutes>
                </Suspense>
              }
            >
              <Route
                path="/user/profile"
                element={
                  <Suspense fallback={<Loader />}>
                    <Profile />
                  </Suspense>
                }
              />
            </Route>
            <Route path="/" element={<Main />}>
              <Route path="/" element={<Home />} />
              <Route path="/permissions" element={<Permissions />} />
              <Route path="/products" element={<Products />} />
              <Route path="/user/login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
