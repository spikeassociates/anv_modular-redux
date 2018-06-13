import React from "react";

const binder = (wrapper, mod) => wrapper;
const fallback = Module => () => <div>{Module.instance}</div>;

export { fallback };
export default binder;
