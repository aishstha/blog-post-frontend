import { combineReducers } from "redux";

import levelReducer from "./level";
import power from "./power";
import menuReducer from "./menu";
import postReducer from "./posts";
import profileReducer from './profile';

const rootReducer = combineReducers({
  levelReducer,
  power,
  menuReducer,
  postReducer,
  profileReducer
});

export default rootReducer;
