import { combineReducers } from "redux";

const combiner = (mod, deps, Module) => ({ reducer: combineReducers({ ...mod, ...deps }) });

export default combiner;
