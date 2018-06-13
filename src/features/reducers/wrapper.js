const wrapper = reducer => (moduleInstance, moduleActions) => (...args) =>
  reducer(...args, { instance: moduleInstance, actions: moduleActions });

export default wrapper;
