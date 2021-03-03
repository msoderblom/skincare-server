import * as actionTypes from "./types";

const initState = {
  resellers: [],
  createdReseller: null,
  loading: false,
  errors: {
    getResellers: null,
    createReseller: null,
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

    // CREATE RESELLER
    case actionTypes.CREATE_RESELLER_REQUEST:
      return {
        ...state,
        loading: true,
        errors: { ...state.errors, createReseller: null },
      };
    case actionTypes.CREATE_RESELLER_SUCCESS:
      console.log("Payload in reducer", action.payload);

      return {
        ...state,
        loading: false,
        createdReseller: action.payload,
      };
    case actionTypes.CREATE_RESELLER_FAILURE:
      console.log("error from reducer: ", action.error);
      return {
        ...state,
        loading: false,
        errors: { ...state.errors, createReseller: action.error },
      };

    default:
      return state;
  }
};

export default resellersReducer;
