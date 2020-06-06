import { createStore } from "redux";
import setStore from "./setStore.js";

const store = createStore(setStore);

export default store;
