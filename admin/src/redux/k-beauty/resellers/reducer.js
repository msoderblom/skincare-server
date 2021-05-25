import * as actionTypes from "./types";

const initState = {
  resellers: [],
  createdReseller: null,
  currentReseller: null,
  loading: false,
  errors: {
    getResellers: null,
    createReseller: null,
    deleteReseller: null,
    getOneReseller: null,
    updateReseller: null,
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
      return {
        ...state,
        loading: false,
        resellers: action.payload,
      };
    case actionTypes.GET_RESELLERS_FAILURE:
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
      return {
        ...state,
        loading: false,
        createdReseller: action.payload,
        resellers: [...state.resellers, action.payload],
      };
    case actionTypes.CREATE_RESELLER_FAILURE:
      return {
        ...state,
        loading: false,
        errors: { ...state.errors, createReseller: action.error },
      };

    // DELETE RESELLER
    case actionTypes.DELETE_RESELLER_REQUEST:
      return {
        ...state,
        loading: true,
        errors: { ...state.errors, deleteReseller: null },
      };
    case actionTypes.DELETE_RESELLER_SUCCESS:
      return {
        ...state,
        loading: false,
        resellers: state.resellers.filter(
          (reseller) => reseller._id !== action.payload
        ),
      };
    case actionTypes.DELETE_RESELLER_FAILURE:
      return {
        ...state,
        loading: false,
        errors: { ...state.errors, deleteReseller: action.error },
      };

    // UPDATE RESELLER
    case actionTypes.UPDATE_RESELLER_REQUEST:
      return {
        ...state,
        loading: true,
        errors: { ...state.errors, updateReseller: null },
      };
    case actionTypes.UPDATE_RESELLER_SUCCESS:
      return {
        ...state,
        loading: false,
        resellers: state.resellers.map((reseller) =>
          reseller._id === action.payload._id ? action.payload : reseller
        ),
        currentReseller: action.payload,
      };
    case actionTypes.UPDATE_RESELLER_FAILURE:
      return {
        ...state,
        loading: false,
        errors: { ...state.errors, updateReseller: action.error },
      };

    // GET ONE RESELLER
    case actionTypes.GET_ONE_RESELLER_REQUEST:
      return {
        ...state,
        loading: true,
        errors: { ...state.errors, getOneReseller: null },
      };
    case actionTypes.GET_ONE_RESELLER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentReseller: action.payload,
      };
    case actionTypes.GET_ONE_RESELLER_FAILURE:
      return {
        ...state,
        loading: false,
        errors: { ...state.errors, getOneReseller: action.error },
        currentReseller: null,
      };

    default:
      return state;
  }
};

export default resellersReducer;
