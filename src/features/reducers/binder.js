const binder = (wrapper, mod) => ({ [mod.instance]: wrapper(mod.instance, mod.actions) });
const fallback = mod => {};

export { fallback };
export default binder;
