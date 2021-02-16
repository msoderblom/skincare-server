import * as actionTypes from "./types";

const initState = {
  comments: [],
  createdComment: null,
  loading: false,
  createCommentError: null,
  getCommentsError: null,
};

const commentsReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
        createCommentError: null,
      };
    case actionTypes.CREATE_COMMENT_SUCCESS:
      console.log("Payload in reducer", action.payload);

      return {
        ...state,
        loading: false,
        createdComment: action.payload,
      };
    case actionTypes.CREATE_COMMENT_FAILURE:
      console.log("error from reducer: ", action.error);
      return {
        ...state,
        loading: false,
        createCommentError: action.error,
      };

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
    case actionTypes.UPDATE_COMMENTS:
      console.log("error from reducer: ", action.error);
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };

    default:
      return state;
  }
};

export default commentsReducer;
