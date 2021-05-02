import * as actionTypes from "./types";

const initState = {
  loading: false,
  admin: null,
  errors: {
    signIn: null,
  },
};

const adminReducer = (state = initState, action) => {
  switch (action.type) {
    // GET ALL USERS
    case actionTypes.SIGN_IN_SUCCESS:
      console.log("Payload in reducer", action.payload);

      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        loading: false,
        admin: action?.payload.admin,
      };
    case actionTypes.SIGN_IN_FAILURE:
      console.log("error from reducer: ", action.error);
      return {
        ...state,
        loading: false,
        admin: null,
        errors: { ...state.errors, signIn: action.error },
      };
    case actionTypes.SIGN_OUT:
      localStorage.removeItem("profile");

      return {
        ...state,
        admin: null,
        loading: false,
        errors: { ...state.errors, signIn: null },
      };
    case actionTypes.SET_ADMIN:
      return {
        ...state,
        admin: action.payload,
      };

    default:
      return state;
  }
};

export default adminReducer;
