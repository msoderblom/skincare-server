import * as actionTypes from "./types";
import * as api from "../../../api";

export const createThread = (formData) => async (dispatch) => {
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
  } catch (error) {
    dispatch({
      type: actionTypes.CREATE_THREAD_FAILURE,
      error: error.response.data?.error || error.message,
    });
    console.error(error);
  }
};
export const getThreads =
  (queryParams = "") =>
  async (dispatch) => {
    dispatch({ type: actionTypes.GET_THREADS_REQUEST });

    try {
      const {
        data: { threads, pages: totalPages, totalThreads },
      } = await api.getThreads(queryParams);

      const payload = {
        threads,
        totalPages,
        totalThreads,
      };

      dispatch({ type: actionTypes.GET_THREADS_SUCCESS, payload });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_THREADS_FAILURE,
        error: error.response.data?.error || error.message,
      });
      console.error(error);
    }
  };
export const getOneThread = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_ONE_THREAD_REQUEST });

  try {
    const {
      data: { thread },
    } = await api.getOneThread(id);

    const payload = { ...thread };

    dispatch({ type: actionTypes.GET_ONE_THREAD_SUCCESS, payload });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ONE_THREAD_FAILURE,
      error: error.response.data?.error || error.message,
    });
    console.error(error);
  }
};
