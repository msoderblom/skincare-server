import * as actionTypes from "./types";

const initState = {
  user: {},
  loading: false,
  signUpData: null,
  signUpError: null,
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
    default:
      return state;
  }
};

export default userReducer;
