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
      return {
        ...state,
        loading: false,
        createdComment: action.payload,
      };
    case actionTypes.CREATE_COMMENT_FAILURE:
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
      return {
        ...state,
        loading: false,
        comments: action.payload,
      };
    case actionTypes.GET_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        getCommentsError: action.error,
      };
    case actionTypes.UPDATE_COMMENTS:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };

    default:
      return state;
  }
};

export default commentsReducer;
