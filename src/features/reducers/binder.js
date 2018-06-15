const binder = (wrapper, mod) => ({
  _module: wrapper(mod.instance, mod.actions),
  _instance: () => mod.instance
});
const fallback = mod => {};

export { fallback };
export default binder;
