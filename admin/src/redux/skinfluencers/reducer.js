import * as actionTypes from "./types";

const initState = {
  skinfluencers: null,
  createdSkinfluencer: null,
  currentSkinfluencer: null,
  loading: false,
  getSkinfluencersError: null,
  createSkinfluencerError: null,
  deleteSkinfluencerError: null,
  getOneSkinfluencerError: null,
  updateSkinfluencerError: null,
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

    // DELETE
    case actionTypes.DELETE_SKINFLUENCER_REQUEST:
      return {
        ...state,
        loading: true,
        deleteSkinfluencerError: null,
      };
    case actionTypes.DELETE_SKINFLUENCER_SUCCESS:
      return {
        ...state,
        loading: false,
        skinfluencers: state.skinfluencers.filter(
          (skinfluencer) => skinfluencer._id !== action.payload
        ),
      };
    case actionTypes.DELETE_SKINFLUENCER_FAILURE:
      console.log("error from reducer: ", action.error);
      return {
        ...state,
        loading: false,
        deleteSkinfluencerError: action.error,
      };

    // GET ALL SKINFLUENCERS
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

    // GET ONE SKINFLUENCER
    case actionTypes.GET_ONE_SKINFLUENCER_REQUEST:
      return {
        ...state,
        loading: true,
        getOneSkinfluencerError: null,
      };
    case actionTypes.GET_ONE_SKINFLUENCER_SUCCESS:
      console.log("Payload in reducer", action.payload);

      return {
        ...state,
        loading: false,
        currentSkinfluencer: action.payload,
      };
    case actionTypes.GET_ONE_SKINFLUENCER_FAILURE:
      console.log("error from reducer: ", action.error);
      return {
        ...state,
        loading: false,
        getOneSkinfluencerError: action.error,
        currentSkinfluencer: null,
      };

    // UPDATE SKINFLUENCER
    case actionTypes.UPDATE_SKINFLUENCER_REQUEST:
      return {
        ...state,
        loading: true,
        updateSkinfluencerError: null,
      };
    case actionTypes.UPDATE_SKINFLUENCER_SUCCESS:
      return {
        ...state,
        loading: false,
        skinfluencers: state.skinfluencers
          ? state.skinfluencers.map((skinfluencer) =>
              skinfluencer._id === action.payload._id
                ? action.payload
                : skinfluencer
            )
          : state.skinfluencers,
        currentSkinfluencer: action.payload,
      };
    case actionTypes.UPDATE_SKINFLUENCER_FAILURE:
      console.log("error from reducer: ", action.error);
      return {
        ...state,
        loading: false,
        updateSkinfluencerError: action.error,
      };

    default:
      return state;
  }
};

export default skinfluencersReducer;
