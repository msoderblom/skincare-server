import * as actionTypes from "./types";
import * as api from "../../../api";

export const createComment = (formData, history) => async (dispatch) => {
  dispatch({ type: actionTypes.CREATE_COMMENT_REQUEST });

  try {
    const {
      data: { thread },
    } = await api.createThread(formData);

    const payload = {
      title: thread.title,
      body: thread.body,
    };

    dispatch({ type: actionTypes.CREATE_COMMENT_SUCCESS, payload });

    // history.push("/");
  } catch (error) {
    dispatch({
      type: actionTypes.CREATE_COMMENT_FAILURE,
      error: error.response.data?.error || error.message,
    });
    console.error(error);
    console.log(error.response.data.error);
  }
};

export const getComments = (threadID, history) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_COMMENTS_REQUEST });

  try {
    const {
      data: { comments },
    } = await api.getThreadComments(threadID);

    dispatch({ type: actionTypes.GET_COMMENTS_SUCCESS, payload: comments });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_COMMENTS_FAILURE,
      error: error.response.data?.error || error.message,
    });
    console.error(error);
    console.log(error.response.data.error);
  }
};
