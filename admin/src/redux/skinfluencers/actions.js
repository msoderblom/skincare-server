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
      error: error.response.data?.error || error.message,
    });
    console.error(error);
    console.log(error.response.data.error);
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
      error: error.response.data?.error || error.message,
    });
    console.error(error);
    console.log(error.response.data.error);
  }
};
