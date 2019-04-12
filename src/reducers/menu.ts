import actionTypes from "../constants";

interface IActionProps {
  type: any;
  payload: any;
}

const initialState = {
  isMenuOpen: false
};

export default (state = initialState, action: IActionProps) => {
  const oldState = { ...state };
  switch (action.type) {
    case actionTypes.TOGGLE_MENU:
      return {
        oldState,
        isMenuOpen: !action.payload
      };

    default:
      return oldState;
  }
};
