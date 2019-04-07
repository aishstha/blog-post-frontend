import actionTypes from "../constants";

interface IActionProps {
  type: string;
  payload: any;
}

const initialState = {
  postDetails: []
};

export default (state = initialState, action: IActionProps) => {
  const oldState = { ...state };
  switch (action.type) {
    case actionTypes.STORE_POSTS:
      return { postDetails: action.payload.data };
    case actionTypes.EDIT_POSTS:
      return action.payload;
    default:
      return oldState;
  }
};
