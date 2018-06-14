import { genId, uniq } from "utils";

import { getCustomFeatures, getFeatures, getFeatureFn } from "./features";

import getBindFn from "./bind";
import getCombineFn from "./combine";

// Unpacks features (ex. actions, reducers etc.) and returns new objects for module and dependency features
const unpack = (features, featureOrder) => {
  const modFeatures = {};
  const depFeatures = {};
  // Sorts the keys (since the binders depend on each-other)
  const orderedKeys = Object.keys(features).sort(
    (curr, next) => featureOrder.indexOf(curr) - featureOrder.indexOf(next)
  );

  orderedKeys.forEach(ft => {
    let { module, ...dep } = features[ft];
    modFeatures[ft] = module;
    depFeatures[ft] = dep;
  });

  return { modFeatures, depFeatures, orderedKeys };
};

const createModule = ({ name = "module", ...features }, custom = []) => {
  const libFeatures = getFeatures();
  const customFeatures = getCustomFeatures(custom);
  const allFeatures = { ...libFeatures, ...customFeatures };

  const libKeys = Object.keys(libFeatures).filter(f => f !== "views");
  const customKeys = Object.keys(customFeatures);
  const keysOrder = uniq([...libKeys, ...customKeys, "views"]);

  const bind = getBindFn(allFeatures);
  const combine = getCombineFn(allFeatures);
  const wrappers = getFeatureFn(customFeatures, "wrapper"); // Import wrappers to use only on custom features

  const { modFeatures, depFeatures, orderedKeys } = unpack(features, keysOrder);

  const Module = orderedKeys.reduce(
    (Module, ft) => {
      let modFeature = !!wrappers[ft] ? wrappers[ft](modFeatures[ft]) : modFeatures[ft]; // Wrap if custom
      let depFeature = depFeatures[ft];

      let feature = bind(ft, modFeature, Module);
      let rootFeature = combine(ft, feature, depFeature, Module);
      return { ...Module, ...rootFeature };
    },
    { name, instance: name + "_" + genId() }
  );

  return Module;
};

const Module = createModule;
const internalFeatures = getFeatures();
const internalWrappers = getFeatureFn(internalFeatures, "wrapper");

Module.actions = internalWrappers.actions;
Module.reducer = internalWrappers.reducers;
Module.selectors = internalWrappers.selectors;
Module.view = internalWrappers.views;

export default Module;
