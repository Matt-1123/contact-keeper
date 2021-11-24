import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    // access token from browser's local storage (Note: this is just vanilla JS)
    token: localStorage.getItem("token"),
    isAuthenticated: null, // check if user is logged in
    loading: true,
    user: null,
    errors: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // ACTIONS:

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      console.log("there is a token in local storage");
      setAuthToken(localStorage.token);
    }

    try {
      // check token to see if valid user
      const res = await axios.get("/api/auth");
      console.log(res);
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      console.log("load user error");
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  // Desc: add user to database, and return a token which the reducer will put in the browser's local storage
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // Note: the proxy host in package.json sends request to localhost:5000, so no need to enter it here.
      const res = await axios.post("/api/users", formData, config);

      // send token to reducer
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // Note: the proxy host in package.json sends request to localhost:5000, so no need to enter it here.
      const res = await axios.post("/api/auth", formData, config);

      // send token to reducer
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        errors: state.errors,
        register,
        login,
        logout,
        clearErrors,
        loadUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
