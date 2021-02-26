import * as actionTypes from "./types";

const initState = {
  loading: false,
  user: null,
  users: [],
  totalPages: 1,
  totalUsers: 1,
  errors: {
    getAllUsers: null,
  },
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    // GET ALL USERS
    case actionTypes.GET_ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        errors: { ...state.errors, getAllUsers: null },
      };
    case actionTypes.GET_ALL_USERS_SUCCESS:
      console.log("Payload in reducer", action.payload);

      return {
        ...state,
        loading: false,
        users: action?.payload.users,
        totalPages: action.payload.totalPages,
        totalUsers: action.payload.totalUsers,
      };
    case actionTypes.GET_ALL_USERS_FAILURE:
      console.log("error from reducer: ", action.error);
      return {
        ...state,
        loading: false,
        errors: { ...state.errors, getAllUsers: action.error },
        users: null,
      };

    default:
      return state;
  }
};

export default userReducer;
