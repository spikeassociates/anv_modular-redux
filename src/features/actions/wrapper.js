const actionTypes = (types, instance = "", separator = "/") =>
  types.reduce((acc, type) => ({ ...acc, [type]: instance + separator + type }), {});

const wrapper = (types, actions, config) => moduleInstance => {
  const moduleTypes = actionTypes(types, moduleInstance);
  return { ...actions(moduleTypes), types: moduleTypes };
};

export default wrapper;
