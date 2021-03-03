import * as actionTypes from "./types";
import * as api from "../../../api";

export const createReseller = (formData) => async (dispatch) => {
  dispatch({ type: actionTypes.CREATE_RESELLER_REQUEST });

  try {
    const {
      data: { reseller },
    } = await api.createReseller(formData);

    dispatch({ type: actionTypes.CREATE_RESELLER_SUCCESS, payload: reseller });
  } catch (error) {
    dispatch({
      type: actionTypes.CREATE_RESELLER_FAILURE,
      error: error?.response?.data?.error || error.message,
    });
    console.error(error);
    console.log(error?.response?.data?.error);
  }
};

export const getResellers = () => async (dispatch) => {
  dispatch({ type: actionTypes.GET_RESELLERS_REQUEST });

  try {
    const {
      data: { resellers },
    } = await api.getResellers();

    dispatch({ type: actionTypes.GET_RESELLERS_SUCCESS, payload: resellers });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_RESELLERS_FAILURE,
      error: error?.response?.data?.error || error.message,
    });
    console.error(error);
    console.log(error?.response?.data?.error);
  }
};
