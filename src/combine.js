import { getFeatureFn } from "./features";

const getCombineFn = (features = {}) => {
  // Combiners will combine the *bound* module components with the dep components (of other modules)
  // The module and dependecies are passed as arguments, the combiner must return a combination of them
  const combiners = getFeatureFn(features, "combiner");

  return (component, mod, deps, Module) => {
    const combiner = combiners[component];
    return combiner ? combiner(mod, deps, Module) : mod;
  };
};

export default getCombineFn;
