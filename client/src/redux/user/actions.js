import * as actionTypes from "./types";
import * as api from "../../api";

export const signUp = (formData, history) => async (dispatch) => {
  dispatch({ type: actionTypes.SIGN_UP_REQUEST });

  try {
    // signup the user
    const { data: user } = await api.signUp(formData);

    const payload = {
      username: user.username,
      email: user.email,
    };

    dispatch({ type: actionTypes.SIGN_UP_SUCCESS, payload });

    // history.push("/");
  } catch (error) {
    dispatch({
      type: actionTypes.SIGN_UP_FAILURE,
      error: error.response.data?.error || error.message,
    });
    console.error(error);
    console.log(error.response.data.error);
  }
};
