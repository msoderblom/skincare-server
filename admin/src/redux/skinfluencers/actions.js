import * as actionTypes from "./types";
import * as api from "../../api";

export const createSkinfluencer = (formData) => async (dispatch) => {
  dispatch({ type: actionTypes.CREATE_SKINFLUENCER_REQUEST });

  try {
    const {
      data: { skinfluencer },
    } = await api.createSkinfluencer(formData);

    dispatch({
      type: actionTypes.CREATE_SKINFLUENCER_SUCCESS,
      payload: skinfluencer,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.CREATE_SKINFLUENCER_FAILURE,
      error: error?.response?.data?.error || error.message,
    });
    console.error(error);
  }
};

export const updateSkinfluencer =
  (id, formData, history) => async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_SKINFLUENCER_REQUEST });

    try {
      const {
        data: { updatedSkinfluencer },
      } = await api.updateSkinfluencer(id, formData);

      dispatch({
        type: actionTypes.UPDATE_SKINFLUENCER_SUCCESS,
        payload: updatedSkinfluencer,
      });
      history.push(`/skinfluencers/${id}`);
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_SKINFLUENCER_FAILURE,
        error: error?.response?.data?.error || error?.message,
      });
      console.error(error);
    }
  };

export const deleteSkinfluencer = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.DELETE_SKINFLUENCER_REQUEST });

  try {
    await api.deleteSkinfluencer(id);

    dispatch({
      type: actionTypes.DELETE_SKINFLUENCER_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_SKINFLUENCER_FAILURE,
      error: error?.response?.data?.error || error.message,
    });
    console.error(error);
  }
};

export const getSkinfluencers = () => async (dispatch) => {
  dispatch({ type: actionTypes.GET_SKINFLUENCERS_REQUEST });

  try {
    const {
      data: { skinfluencers },
    } = await api.getSkinfluencers();

    dispatch({
      type: actionTypes.GET_SKINFLUENCERS_SUCCESS,
      payload: skinfluencers,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_SKINFLUENCERS_FAILURE,
      error: error?.response?.data?.error || error.message,
    });
    console.error(error);
  }
};

export const getOneSkinfluencer = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_ONE_SKINFLUENCER_REQUEST });

  try {
    const {
      data: { skinfluencer },
    } = await api.getOneSkinfluencer(id);

    dispatch({
      type: actionTypes.GET_ONE_SKINFLUENCER_SUCCESS,
      payload: skinfluencer,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ONE_SKINFLUENCER_FAILURE,
      error: error?.response?.data?.error || error.message,
    });
    console.error(error);
  }
};
