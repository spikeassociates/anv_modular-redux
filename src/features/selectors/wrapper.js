import { deepFindKey } from "utils";

const wrapper = selectors => moduleInstance => selectors(state => deepFindKey(state, moduleInstance));

export default wrapper;
