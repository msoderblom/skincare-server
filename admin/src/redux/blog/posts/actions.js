import * as actionTypes from "./types";
import * as api from "../../../api";

export const getPosts =
  (queryParams = "") =>
  async (dispatch) => {
    dispatch({ type: actionTypes.GET_POSTS_REQUEST });

    try {
      const {
        data: { blogPosts, pages: totalPages, totalPosts },
      } = await api.getBlogPosts(queryParams);

      const payload = {
        posts: blogPosts,
        totalPages,
        totalPosts,
      };

      dispatch({ type: actionTypes.GET_POSTS_SUCCESS, payload });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_POSTS_FAILURE,
        error: error?.response?.data?.error || error.message,
      });

      console.error(error);
    }
  };
export const createPost = (formData) => async (dispatch) => {
  dispatch({ type: actionTypes.CREATE_POST_REQUEST });

  try {
    const {
      data: { blogPost },
    } = await api.createBlogPost(formData);

    dispatch({ type: actionTypes.CREATE_POST_SUCCESS, payload: blogPost });
  } catch (error) {
    dispatch({
      type: actionTypes.CREATE_POST_FAILURE,
      error: error.response.data?.error || error.message,
    });
    console.error(error);
  }
};

export const getOnePost = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_ONE_POST_REQUEST });

  try {
    const {
      data: { post },
    } = await api.getOneBlogPost(id);

    const payload = { ...post };

    dispatch({ type: actionTypes.GET_ONE_POST_SUCCESS, payload });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ONE_POST_FAILURE,
      error: error.response.data?.error || error.message,
    });
    console.error(error);
  }
};
