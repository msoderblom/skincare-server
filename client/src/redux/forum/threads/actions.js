import * as actionTypes from "./types";
import * as api from "../../../api";

export const createThread = (formData, history) => async (dispatch) => {
  dispatch({ type: actionTypes.CREATE_THREAD_REQUEST });

  try {
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
export const getThreads = (queryParams = "", history) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_THREADS_REQUEST });

  try {
    const {
      data: { threads, pages: totalPages },
    } = await api.getThreads(queryParams);

    const payload = {
      threads,
      totalPages,
    };

    dispatch({ type: actionTypes.GET_THREADS_SUCCESS, payload });

    // history.push("/");
  } catch (error) {
    dispatch({
      type: actionTypes.GET_THREADS_FAILURE,
      error: error.response.data?.error || error.message,
    });
    console.error(error);
    console.log(error.response.data.error);
  }
};
