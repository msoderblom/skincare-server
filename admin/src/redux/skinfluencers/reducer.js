import * as actionTypes from "./types";

const initState = {
  skinfluencers: null,
  loading: false,
  getSkinfluencersError: null,
};

const skinfluencersReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_SKINFLUENCERS_REQUEST:
      return {
        ...state,
        loading: true,
        getSkinfluencersError: null,
      };
    case actionTypes.GET_SKINFLUENCERS_SUCCESS:
      console.log("Payload in reducer", action.payload);

      return {
        ...state,
        loading: false,
        skinfluencers: action.payload,
      };
    case actionTypes.GET_SKINFLUENCERS_FAILURE:
      console.log("error from reducer: ", action.error);
      return {
        ...state,
        loading: false,
        getSkinfluencersError: action.error,
      };

    default:
      return state;
  }
};

export default skinfluencersReducer;
