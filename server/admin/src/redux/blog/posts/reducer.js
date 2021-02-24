import * as actionTypes from "./types";

const initState = {
  posts: [],
  totalPages: 1,
  totalPosts: 1,
  loading: false,
  viewedPost: null,
  getPostsError: null,
  getOnePostError: null,
  createPostError: null,
  createdPost: null,
};

const postsReducer = (state = initState, action) => {
  switch (action.type) {
    // CREATE POST
    case actionTypes.CREATE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        createPostError: null,
      };
    case actionTypes.CREATE_POST_SUCCESS:
      console.log("Payload in reducer", action.payload);

      return {
        ...state,
        loading: false,
        createdPost: action.payload,
      };

    case actionTypes.CREATE_POST_FAILURE:
      console.log("error from reducer: ", action.error);
      return {
        ...state,
        loading: false,
        createPostError: action.error,
      };

    // GET POSTS
    case actionTypes.GET_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        getPostsError: null,
      };
    case actionTypes.GET_POSTS_SUCCESS:
      console.log("Payload in reducer", action.payload);

      return {
        ...state,
        loading: false,
        posts: action.payload.posts,
        totalPages: action.payload.totalPages,
        totalPosts: action.payload.totalPosts,
      };
    case actionTypes.GET_POSTS_FAILURE:
      console.log("error from reducer: ", action.error);
      return {
        ...state,
        loading: false,
        getPostsError: action.error,
      };

    // GET ONE POST
    case actionTypes.GET_ONE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        getOnePostError: null,
      };
    case actionTypes.GET_ONE_POST_SUCCESS:
      console.log("Payload in reducer", action.payload);

      return {
        ...state,
        loading: false,
        viewedPost: action.payload,
      };
    case actionTypes.GET_ONE_POST_FAILURE:
      console.log("error from reducer: ", action.error);
      return {
        ...state,
        loading: false,
        getOnePostError: action.error,
      };

    default:
      return state;
  }
};

export default postsReducer;
