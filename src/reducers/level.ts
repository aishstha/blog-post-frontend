import actionTypes from "../constants";

interface IActionProps {
  type: any;
  payload: any;
}

const initialState = {
  level: 1
};

export default (state = initialState, action: IActionProps) => {
  const oldState = { ...state };
  switch (action.type) {
    case actionTypes.LEVEL_UP:
      return {
        level: action.payload + 1
      };
    case actionTypes.POWER_UP:
      return action.payload;
    default:
      return oldState;
  }
}
