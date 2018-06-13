const binder = (wrapper, mod) => ({ ...wrapper(mod.instance) });
const fallback = mod => {};

export { fallback };
export default binder;
