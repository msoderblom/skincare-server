import * as actionTypes from "./types";

const initState = {
  threads: [],
  totalPages: 1,
  loading: false,
  createdThread: null,
  viewedThread: null,
  createThreadError: null,
  getThreadsError: null,
  getOneThreadError: null,
};

const threadsReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_THREAD_REQUEST:
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
      };

    // GET THREADS
    case actionTypes.GET_THREADS_REQUEST:
      return {
        ...state,
        loading: true,
        getThreadsError: null,
      };
    case actionTypes.GET_THREADS_SUCCESS:
      console.log("Payload in reducer", action.payload);

      return {
        ...state,
        loading: false,
        threads: action.payload.threads,
        totalPages: action.payload.totalPages,
      };
    case actionTypes.GET_THREADS_FAILURE:
      console.log("error from reducer: ", action.error);
      return {
        ...state,
        loading: false,
        getThreadsError: action.error,
      };

    // GET ONE THREAD
    case actionTypes.GET_ONE_THREAD_REQUEST:
      return {
        ...state,
        loading: true,
        getOneThreadError: null,
      };
    case actionTypes.GET_ONE_THREAD_SUCCESS:
      console.log("Payload in reducer", action.payload);

      return {
        ...state,
        loading: false,
        viewedThread: action.payload,
      };
    case actionTypes.GET_ONE_THREAD_FAILURE:
      console.log("error from reducer: ", action.error);
      return {
        ...state,
        loading: false,
        getOneThreadError: action.error,
      };

    default:
      return state;
  }
};

export default threadsReducer;
