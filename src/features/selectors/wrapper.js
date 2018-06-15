const deepFindModule = (obj, instance) => {
  if (obj && obj._instance === instance) {
    return obj._module;
  }
  for (let key in obj) {
    const val = obj[key];
    if (typeof val === "object") {
      const found = deepFindModule(val, instance);
      if (found) {
        return found;
      }
    }
  }
};

const wrapper = selectors => moduleInstance => selectors(state => deepFindModule(state, moduleInstance));

export default wrapper;
