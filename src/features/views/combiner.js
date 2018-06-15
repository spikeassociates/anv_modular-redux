import { providerWrapper } from "./wrapper";

const combiner = (mod, deps, Module) => {
  const view = providerWrapper(mod, { ...Module, view: deps });
  Object.entries(deps).forEach(([key, val]) => {
    view[key] = val;
  });
  return ({ view });
}

export default combiner;
