import actionTypes from "../constants";

interface IActionProps {
  type: string;
  payload: any;
}

const initialState = {
  postDetails: [],
  currentPostDetails:{}
};

export default (state = initialState, action: IActionProps) => {
  const oldState = { ...state };
  switch (action.type) {
    case actionTypes.STORE_POSTS:
      return { postDetails: action.payload.data };
    case actionTypes.STORE_CURRENT_POSTS:
      return { currentPostDetails: action.payload.data };
    default:
      return oldState;
  }
};
