import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
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

  // Register User

  // Login User

  // Logout

  // Clear Errors

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        errors: state.errors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
