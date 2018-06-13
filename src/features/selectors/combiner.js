const combiner = (mod, deps, Module) => ({ selectors: { ...mod, ...deps } });

export default combiner;
