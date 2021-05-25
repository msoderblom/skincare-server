import * as actionTypes from "./types";
import * as api from "../../../api";

export const createComment =
  (formData, threadID, socket) => async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_COMMENT_REQUEST });

    try {
      const {
        data: { comment },
      } = await api.createComment(formData, threadID);

      dispatch({ type: actionTypes.CREATE_COMMENT_SUCCESS, payload: comment });
      socket.emit("new-comment", { comment, threadID });
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_COMMENT_FAILURE,
        error: error.response.data?.error || error.message,
      });
      console.error(error);
    }
  };

export const getComments = (threadID) => async (dispatch) => {
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
  }
};
