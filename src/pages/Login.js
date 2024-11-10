import React, { useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { setLocalStorage, setSessionStorage } from "../helpers/storage";
import { ACCESS_TOKEN_EXPIRE_TIME } from "../data/constants";

const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const rememberMe = useRef(null);
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const userStore = useSelector((store) => store.user);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (userStore.user) {
      navigate("/user/profile");
    }
  }, []);

  const loginUser = async () => {
    if (!email.current.value || !password.current.value) {
      alert("Please enter email and password");
      return;
    }

    setSubmit(true);

    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email.current.value,
          password: password.current.value,
          expiresInMins: ACCESS_TOKEN_EXPIRE_TIME,
        }),
        credentials: "include", // Include cookies (e.g., accessToken) in the request
      });

      const data = await response.json();
      if (response.status === 200) {
        dispatch(login(data));
        if (rememberMe.current.checked) {
          //Instead LocalStorage Use Cookies
          setLocalStorage("accessToken", data.accessToken);
          setLocalStorage("refreshToken", data.refreshToken);
          setLocalStorage("rememberMe", 1);
        } else {
          setLocalStorage("rememberMe", 0);
          setSessionStorage("accessToken", data.accessToken);
          setSessionStorage("refreshToken", data.refreshToken);
        }
        navigate("/user/profile");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmit(false);
    }
  };

  return (
    <div className="row">
      <div className="col-md-12 col-sm-12 col-lg-6 offset-lg-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginUser();
          }}
        >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              username
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              ref={email}
              placeholder="emilys"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              ref={password}
              placeholder="emilyspass"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              ref={rememberMe}
              defaultChecked
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Remember me
            </label>
          </div>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {submit ? (
            <button className="btn btn-primary" type="button" disabled>
              <span
                className="spinner-grow spinner-grow-sm"
                role="status"
              ></span>
              Loading...
            </button>
          ) : (
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
