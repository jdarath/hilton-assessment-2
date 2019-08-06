import { createStore } from "redux";
import MainReducer from "./reducers.js";

const store = createStore(MainReducer);

export default store;