import * as actionTypes from "./types";

const initState = {
  threads: [],
  loading: false,
  createdThread: null,
  createThreadError: null,
  getThreadsError: null,
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

    default:
      return state;
  }
};

export default threadsReducer;
