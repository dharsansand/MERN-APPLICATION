// reducer.js
import { SET_NAME } from "./Actions";

const initialState = {
  name: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
