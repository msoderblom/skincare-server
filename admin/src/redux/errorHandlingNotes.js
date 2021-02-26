// REQUEST/SUCCESS/FAILURE pattern

const initState = {
  items: [],
  loading: false,
  error: null,
};

const testReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_DATA_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "FETCH_DATA_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.error,
        items: [],
      };
    default:
      return state;
  }
};

export default testReducer;

// on the failure case you can decide if you want to clear the items or not

// npm install redux-devtools-extension

export const signup = (formData, history) => async (dispatch) => {
  dispatch({ type: "FETCH_DATA_REQUEST" });

  try {
    let api;
    // signup the user
    const { data } = await api.signUp(formData);

    dispatch({ type: "FETCH_DATA_SUCCESS", payload: data });

    history.push("/");
  } catch (error) {
    dispatch({ type: "FETCH_DATA_FAILURE", error });
  }
};
