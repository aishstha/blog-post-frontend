import actionTypes from "../constants";

interface IActionProps {
  type: any;
  payload: any;
}

const initialState = {
  isMenuOpen: false
};

// function toggleMenu(isMenuOpen: any) {
//   let newState: any ={...isMenuOpen}; //todo change any
//   newState.isMenuOpen = !newState.showMenu;
//   return newState;
// }

export default (state = initialState, action: IActionProps) => {
  const oldState = { ...state };
  switch (action.type) {
    case actionTypes.TOGGLE_MENU:
        return{
            oldState,
            isMenuOpen: !action.payload
        }
    //   return toggleMenu(action.payload);

    default:
      // return state untouched if reducer ignored the action
      return oldState;
  }
};
