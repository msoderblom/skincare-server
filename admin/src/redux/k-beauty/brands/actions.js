import * as actionTypes from "./types";
import * as api from "../../../api";

export const createComment = (formData, threadID, socket, history) => async (
  dispatch
) => {
  dispatch({ type: actionTypes.CREATE_COMMENT_REQUEST });

  try {
    const {
      data: { comment },
    } = await api.createComment(formData, threadID);

    dispatch({ type: actionTypes.CREATE_COMMENT_SUCCESS, payload: comment });
    socket.emit("new-comment", { comment, threadID });

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

export const getBrands = () => async (dispatch) => {
  dispatch({ type: actionTypes.GET_BRANDS_REQUEST });

  try {
    const {
      data: { brands },
    } = await api.getBrands();

    dispatch({ type: actionTypes.GET_BRANDS_SUCCESS, payload: brands });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_BRANDS_FAILURE,
      error: error?.response?.data?.error || error.message,
    });
    console.error(error);
    console.log(error?.response?.data?.error);
  }
};
