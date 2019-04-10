import { combineReducers } from "redux";

import levelReducer from "./level";
import power from "./power";
import menuReducer from "./menu";
import postReducer from "./posts";
import profileReducer from "./profile";
import loginReducer from "./login";

const rootReducer = combineReducers({
  levelReducer,
  power,
  menuReducer,
  postReducer,
  profileReducer,
  loginReducer
});

export default rootReducer;
