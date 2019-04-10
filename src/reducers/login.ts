import actionTypes from "../constants";
import * as tokenService from "../services/token";

interface IActionProps {
  type: any;
  payload: any;
}
const userId = tokenService.getUserId();

const initialState = {
  isAuthenticated: userId ? true : false
};

export default (state = initialState, action: IActionProps) => {
  const oldState = { ...state };
  switch (action.type) {
    case actionTypes.CHECK_LOGIN:
      return {
        isAuthenticated: action.payload
      };

    default:
      return oldState;
  }
};


