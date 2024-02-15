// store.js
import { createStore } from "redux";
import reducer from "./Reducer";

const Store = createStore(reducer);

export default Store;
