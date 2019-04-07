import { combineReducers } from "redux";

import levelReducer from "./level";
import power from "./power";
import menuReducer from "./menu";
import postReducer from "./posts";

const rootReducer = combineReducers({
  levelReducer,
  power,
  menuReducer,
  postReducer
});

export default rootReducer;
