import * as actionTypes from "./types";

const initState = {
  skinfluencers: null,
  createdSkinfluencer: null,
  loading: false,
  getSkinfluencersError: null,
  createSkinfluencerError: null,
};

const skinfluencersReducer = (state = initState, action) => {
  switch (action.type) {
    // CREATE
    case actionTypes.CREATE_SKINFLUENCER_REQUEST:
      return {
        ...state,
        loading: true,
        createSkinfluencerError: null,
      };
    case actionTypes.CREATE_SKINFLUENCER_SUCCESS:
      console.log("Payload in reducer", action.payload);

      return {
        ...state,
        loading: false,
        createdSkinfluencer: action.payload,
      };
    case actionTypes.CREATE_SKINFLUENCER_FAILURE:
      console.log("error from reducer: ", action.error);
      return {
        ...state,
        loading: false,
        createSkinfluencerError: action.error,
      };

    // GET ALL SKINFLUENCERS
    case actionTypes.GET_SKINFLUENCERS_REQUEST:
      return {
        ...state,
        loading: true,
        createSkinfluencerError: null,
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
