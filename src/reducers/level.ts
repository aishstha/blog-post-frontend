import actionTypes from "../constants";

/* 
- a plain JavaScript function with two parameters: : copy of current state and action to calculate next state
*/

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
      // return state untouched if reducer ignored the action
      return oldState;
  }
}