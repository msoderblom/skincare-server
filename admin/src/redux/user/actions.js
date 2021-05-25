import * as actionTypes from "./types";
import * as api from "../../api";

export const getAllUsers =
  (queryParams = "") =>
  async (dispatch) => {
    dispatch({ type: actionTypes.GET_ALL_USERS_REQUEST });

    try {
      const {
        data: { pages: totalPages, users, totalUsers },
      } = await api.getAllUsers(queryParams);

      const payload = {
        users,
        totalUsers,
        totalPages,
      };

      dispatch({ type: actionTypes.GET_ALL_USERS_SUCCESS, payload });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_ALL_USERS_FAILURE,
        error: error.response.data?.error || error.message,
      });
      console.error(error);
    }
  };
