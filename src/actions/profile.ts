import actionTypes from "../constants";
import { IProfileDetails } from '../interface';

/* 
Actions are objects with information of what happened and what needs to change
Action creators are actions wrapped in a function
*/



const storeProfile = (profileDetails: IProfileDetails) => ({
  type: actionTypes.STORE_PROFILE_INFORMATION,
  payload: profileDetails
});

export const Actions = {
  storeProfile
};
