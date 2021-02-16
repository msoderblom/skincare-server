import * as actionTypes from "./types";

const initState = {
  comments: [],
  loading: false,
  createCommentError: null,
  getCommentsError: null,
};

const commentsReducer = (state = initState, action) => {
  switch (action.type) {
    /*  case actionTypes.CREATE_THREAD_REQUEST:
      return {
        ...state,
        loading: true,
        createThreadError: null,
      };
    case actionTypes.CREATE_THREAD_SUCCESS:
      console.log("Payload in reducer", action.payload);

      return {
        ...state,
        loading: false,
        createdThread: action.payload,
      };
    case actionTypes.CREATE_THREAD_FAILURE:
      console.log("error from reducer: ", action.error);
      return {
        ...state,
        loading: false,
        createThreadError: action.error,
      }; */

    // GET COMMENTS
    case actionTypes.GET_COMMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        getCommentsError: null,
      };
    case actionTypes.GET_COMMENTS_SUCCESS:
      console.log("Payload in reducer", action.payload);

      return {
        ...state,
        loading: false,
        comments: action.payload,
      };
    case actionTypes.GET_COMMENTS_FAILURE:
      console.log("error from reducer: ", action.error);
      return {
        ...state,
        loading: false,
        getCommentsError: action.error,
      };

    default:
      return state;
  }
};

export default commentsReducer;
