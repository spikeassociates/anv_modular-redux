import { getFeatureFn } from "./features";

const getBindFn = (features = {}) => {
  // Binders will call wrapper functions for the components (keys) of the declared module
  // and bind them to the module, ex. calling the wrapper and preparing the result for combiners
  const binders = getFeatureFn(features, "binder");

  // These are binder fallbacks, in case the wrapper does not exist, or the binder returns a falsy value
  // Fallbacks will then be passed to the combiners instead
  const fallbacks = getFeatureFn(features, "fallback");

  // The main binding functions which will take a component name and a wrapper and bind
  // it with the corresponding binding function or default to a binding fallback
  return (component, wrapper, mod) => {
    const binder = binders[component];
    const fallback = fallbacks[component];

    if (!!wrapper && !!binder) {
      return binder(wrapper, mod) || fallback(mod);
    }

    return fallback(mod);
  };
};

export default getBindFn;
