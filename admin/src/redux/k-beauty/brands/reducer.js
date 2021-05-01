import * as actionTypes from "./types";

const initState = {
  brands: [],
  createdBrand: null,
  currentBrand: null,
  loading: false,
  errors: {
    getBrands: null,
    createBrand: null,
    deleteBrand: null,
    getOneBrand: null,
    updateBrand: null,
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

    // CREATE BRAND
    case actionTypes.CREATE_BRAND_REQUEST:
      return {
        ...state,
        loading: true,
        errors: { ...state.errors, createBrand: null },
      };
    case actionTypes.CREATE_BRAND_SUCCESS:
      console.log("Payload in reducer", action.payload);

      return {
        ...state,
        loading: false,
        createdBrand: action.payload,
      };
    case actionTypes.CREATE_BRAND_FAILURE:
      console.log("error from reducer: ", action.error);
      return {
        ...state,
        loading: false,
        errors: { ...state.errors, createBrand: action.error },
      };

    // DELETE BRAND
    case actionTypes.DELETE_BRAND_REQUEST:
      return {
        ...state,
        loading: true,
        errors: { ...state.errors, deleteBrand: null },
      };
    case actionTypes.DELETE_BRAND_SUCCESS:
      console.log("Payload in reducer", action.payload);

      return {
        ...state,
        loading: false,
        brands: state.brands.filter((brand) => brand._id !== action.payload),
      };
    case actionTypes.DELETE_BRAND_FAILURE:
      console.log("error from reducer: ", action.error);
      return {
        ...state,
        loading: false,
        errors: { ...state.errors, deleteBrand: action.error },
      };

    // GET ONE BRAND
    case actionTypes.GET_ONE_BRAND_REQUEST:
      return {
        ...state,
        loading: true,
        errors: { ...state.errors, getOneBrand: null },
      };
    case actionTypes.GET_ONE_BRAND_SUCCESS:
      console.log("Payload in reducer", action.payload);

      return {
        ...state,
        loading: false,
        currentBrand: action.payload,
      };
    case actionTypes.GET_ONE_BRAND_FAILURE:
      console.log("error from reducer: ", action.error);
      return {
        ...state,
        loading: false,
        errors: { ...state.errors, getOneBrand: action.error },
        currentBrand: null,
      };

    // UPDATE BRAND
    case actionTypes.UPDATE_BRAND_REQUEST:
      return {
        ...state,
        loading: true,
        errors: { ...state.errors, updateBrand: null },
      };
    case actionTypes.UPDATE_BRAND_SUCCESS:
      console.log("Payload in reducer", action.payload);

      return {
        ...state,
        loading: false,
        brands: state.brands
          ? state.brands.map((brand) =>
              brand._id === action.payload._id ? action.payload : brand
            )
          : state.brands,
        currentBrand: action.payload,
      };
    case actionTypes.UPDATE_BRAND_FAILURE:
      console.log("error from reducer: ", action.error);
      return {
        ...state,
        loading: false,
        errors: { ...state.errors, updateBrand: action.error },
      };

    default:
      return state;
  }
};

export default brandsReducer;
