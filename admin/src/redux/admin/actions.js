import * as actionTypes from "./types";
import * as api from "../../api";

export const signIn = (formData, history) => async (dispatch) => {
  dispatch({ type: actionTypes.SIGN_IN_REQUEST });

  try {
    // sign in the user
    const {
      data: { admin, token },
    } = await api.signIn(formData);

    const payload = {
      admin,
      token,
    };

    dispatch({ type: actionTypes.SIGN_IN_SUCCESS, payload });

    history.push("/dashboard");
  } catch (error) {
    dispatch({
      type: actionTypes.SIGN_IN_FAILURE,
      error: error?.response?.data?.error || error?.message,
    });
    console.error(error);
    console.log(error?.response?.data?.error);
  }
};
