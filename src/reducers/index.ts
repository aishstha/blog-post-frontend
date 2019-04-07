import { combineReducers } from "redux";

import levelReducer from "./level";
import power from './power';

const rootReducer = combineReducers({
  levelReducer,
  power,
});

export default rootReducer;
