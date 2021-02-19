import * as actionTypes from "./types";
import * as api from "../../../api";

export const getPosts = (queryParams = "", history) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_POSTS_REQUEST });

  try {
    const {
      data: { blogPosts, pages: totalPages },
    } = await api.getBlogPosts(queryParams);

    const payload = {
      posts: blogPosts,
      totalPages,
    };

    dispatch({ type: actionTypes.GET_POSTS_SUCCESS, payload });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POSTS_FAILURE,
      error: error.response.data?.error || error.message,
    });
    console.error(error);
    console.log(error.response.data.error);
  }
};

/* export const getOnePost = (id, history) => async (dispatch) => {
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
    console.log(error.response.data.error);
  }
};
 */
