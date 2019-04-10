import actionTypes from "../constants";

interface IActionProps {
  type: string;
  payload: any;
}

const initialState = {
  description: ""
};

export default (state = initialState, action: IActionProps) => {
  const oldState = { ...state };
  switch (action.type) {
    case actionTypes.STORE_NEW_COMMENT:
      console.log("action.payload from comment reducer", action.payload);
      return { description: action.payload };
    default:
      return oldState;
  }
};
