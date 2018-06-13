import React, { Component } from "react";
import PropTypes from "prop-types";

class ModuleProvider extends Component {
  getChildContext() {
    return {
      module: this.props.module || {}
    };
  }
  render() {
    return this.props.children;
  }
}

ModuleProvider.childContextTypes = {
  module: PropTypes.object
};

const providerWrapper = (View, Module) => props => (
  <ModuleProvider module={Module}>
    <View {...props} />
  </ModuleProvider>
);

const contextWrapper = Component => {
  const ModularizedComponent = (props, context) => <Component {...props} Module={context.module} />;
  ModularizedComponent.contextTypes = { module: PropTypes.object };

  return ModularizedComponent;
};

export default contextWrapper;
export { providerWrapper, contextWrapper };
