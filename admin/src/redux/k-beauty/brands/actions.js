import * as actionTypes from "./types";
import * as api from "../../../api";

export const createBrand = (formData) => async (dispatch) => {
  dispatch({ type: actionTypes.CREATE_BRAND_REQUEST });

  try {
    const {
      data: { brand },
    } = await api.createBrand(formData);

    dispatch({ type: actionTypes.CREATE_BRAND_SUCCESS, payload: brand });
  } catch (error) {
    dispatch({
      type: actionTypes.CREATE_BRAND_FAILURE,
      error: error?.response?.data?.error || error.message,
    });
    console.error(error);
    console.log(error?.response?.data?.error);
  }
};

export const getOneBrand = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_ONE_BRAND_REQUEST });

  try {
    const {
      data: { brand },
    } = await api.getOneBrand(id);

    dispatch({ type: actionTypes.GET_ONE_BRAND_SUCCESS, payload: brand });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ONE_BRAND_FAILURE,
      error: error?.response?.data?.error || error.message,
    });
    console.error(error);
    console.log(error?.response?.data?.error);
  }
};

export const updateBrand = (id, formData, history) => async (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_BRAND_REQUEST });

  try {
    const {
      data: { updatedBrand },
    } = await api.updateBrand(id, formData);

    dispatch({
      type: actionTypes.UPDATE_BRAND_SUCCESS,
      payload: updatedBrand,
    });
    history.push(`/k-beauty/brands/${id}`);
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_BRAND_FAILURE,
      error: error?.response?.data?.error || error.message,
    });
    console.error(error);
    console.log(error?.response?.data?.error);
  }
};

export const deleteBrand = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.DELETE_BRAND_REQUEST });

  try {
    await api.deleteBrand(id);

    dispatch({ type: actionTypes.DELETE_BRAND_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_BRAND_FAILURE,
      error: error?.response?.data?.error || error.message,
    });
    console.error(error);
    console.log(error?.response?.data?.error);
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
