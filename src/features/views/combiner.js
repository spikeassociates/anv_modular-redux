import { providerWrapper } from "./wrapper";

const combiner = (mod, deps, Module) => ({
  views: deps,
  view: providerWrapper(mod, { ...Module, views: deps })
});

export default combiner;
