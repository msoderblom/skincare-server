import * as actionTypes from "./types";

const initState = {
  resellers: [],
  loading: false,
  errors: {
    getResellers: null,
  },
};

const resellersReducer = (state = initState, action) => {
  switch (action.type) {
    // GET RESELLERS
    case actionTypes.GET_RESELLERS_REQUEST:
      return {
        ...state,
        loading: true,
        errors: { ...state.errors, getResellers: null },
      };
    case actionTypes.GET_RESELLERS_SUCCESS:
      console.log("Payload in reducer", action.payload);

      return {
        ...state,
        loading: false,
        resellers: action.payload,
      };
    case actionTypes.GET_RESELLERS_FAILURE:
      console.log("error from reducer: ", action.error);
      return {
        ...state,
        loading: false,
        errors: { ...state.errors, getResellers: action.error },
      };
    /* case actionTypes.UPDATE_COMMENTS:
      console.log("Payload inside update comments: ", action.payload);
      return {
        ...state,
        comments: [...state.comments, action.payload],
      }; */

    default:
      return state;
  }
};

export default resellersReducer;
