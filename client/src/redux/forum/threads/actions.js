import * as actionTypes from "./types";
import * as api from "../../../api";

export const createThread = (formData, history) => async (dispatch) => {
  dispatch({ type: actionTypes.CREATE_THREAD_REQUEST });

  try {
    // signup the user
    const {
      data: { thread },
    } = await api.createThread(formData);

    const payload = {
      title: thread.title,
      body: thread.body,
    };

    dispatch({ type: actionTypes.CREATE_THREAD_SUCCESS, payload });

    // history.push("/");
  } catch (error) {
    dispatch({
      type: actionTypes.CREATE_THREAD_FAILURE,
      error: error.response.data?.error || error.message,
    });
    console.error(error);
    console.log(error.response.data.error);
  }
};
