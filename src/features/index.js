import actions from "./actions";
import reducers from "./reducers";
import selectors from "./selectors";
import views from "./views";

const isObj = val => !!val && typeof val === "object" && val.constructor === Object;

const customFeatureDefaults = feature => ({
  binder: (wrapper, mod) => {
    const bound = wrapper(mod);
    return isObj(bound) ? bound : { [mod.name]: bound };
  },
  combiner: (mod, deps, Module) => ({ [feature]: { ...mod, ...deps } }),
  fallback: mod => ({}),
  wrapper: featureFn => mod => (typeof featureFn === "function" ? featureFn(mod) : featureFn)
});

const getCustomFeatures = (features = []) =>
  features.reduce(
    (acc, { feature, ...rest }) => ({ ...acc, [feature]: { ...customFeatureDefaults(feature), ...rest } }),
    {}
  );

const getFeatures = () => ({
  actions,
  reducers,
  selectors,
  views
});

const getFeatureFn = (features, fn = "") => {
  const fns = {};
  for (let feature in features) {
    fns[feature] = features[feature][fn];
  }
  return fns;
};

export { getCustomFeatures, getFeatures, getFeatureFn };
