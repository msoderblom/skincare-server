import * as actionTypes from "./types";

const initState = {
  user: null,
  loading: false,
  signUpData: null,
  signUpError: null,
  signInError: null,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_UP_REQUEST:
      return {
        ...state,
        loading: true,
        signUpError: null,
      };
    case actionTypes.SIGN_UP_SUCCESS:
      console.log("Payload in reducer", action.payload);

      return {
        ...state,
        loading: false,
        signUpData: action.payload,
      };
    case actionTypes.SIGN_UP_FAILURE:
      console.log("error from reducer: ", action.error);
      return {
        ...state,
        loading: false,
        signUpError: action.error,
      };
    case actionTypes.SIGN_IN_REQUEST:
      return {
        ...state,
        loading: true,
        signInError: null,
      };
    case actionTypes.SIGN_IN_SUCCESS:
      console.log("Payload in reducer", action.payload);

      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        loading: false,
        user: action?.payload.user,
      };
    case actionTypes.SIGN_IN_FAILURE:
      console.log("error from reducer: ", action.error);
      return {
        ...state,
        loading: false,
        signInError: action.error,
        user: null,
      };
    case actionTypes.SIGN_OUT:
      localStorage.removeItem("profile");

      return {
        ...state,
        user: null,
        loading: false,
        signUpData: null,
        signUpError: null,
        signInError: null,
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
