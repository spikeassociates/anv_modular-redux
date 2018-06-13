const combiner = (mod, deps, Module) => ({ actions: { ...mod, ...deps } });

export default combiner;
