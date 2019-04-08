import actionTypes from "../constants";

interface IActionProps {
  type: string;
  payload: any;
}

const initialState = {
  profileDetails: []
};

export default (state = initialState, action: IActionProps) => {
  const oldState = { ...state };
  switch (action.type) {
    case actionTypes.STORE_PROFILE_INFORMATION:
      return { profileDetails: action.payload.data };

    default:
      return oldState;
  }
};
