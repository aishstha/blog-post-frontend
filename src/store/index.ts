import { createStore } from "redux";
import rootReducer from "../reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";

/* 
    function from redux library , reducer as argument , state comes from reducers
    transform reducer into store object that will be single source of state in our app 
*/
const store = createStore(rootReducer, composeWithDevTools());

export default store;
