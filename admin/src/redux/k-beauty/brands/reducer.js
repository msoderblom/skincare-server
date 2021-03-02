import * as actionTypes from "./types";

const initState = {
  brands: [],
  loading: false,
  errors: {
    getBrands: null,
  },
};

const brandsReducer = (state = initState, action) => {
  switch (action.type) {
    // GET BRANDS
    case actionTypes.GET_BRANDS_REQUEST:
      return {
        ...state,
        loading: true,
        errors: { ...state.errors, getBrands: null },
      };
    case actionTypes.GET_BRANDS_SUCCESS:
      console.log("Payload in reducer", action.payload);

      return {
        ...state,
        loading: false,
        brands: action.payload,
      };
    case actionTypes.GET_BRANDS_FAILURE:
      console.log("error from reducer: ", action.error);
      return {
        ...state,
        loading: false,
        errors: { ...state.errors, getBrands: action.error },
      };

    default:
      return state;
  }
};

export default brandsReducer;
