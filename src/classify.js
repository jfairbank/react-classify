import React from 'react';
import methodCreators from './methodCreators';

const DEFAULT_DISPLAY_NAME = 'Component';

export default function classify(Component, displayName = DEFAULT_DISPLAY_NAME, methods = {}) {
  if (typeof displayName === 'object') {
    methods = displayName;
    displayName = DEFAULT_DISPLAY_NAME;
  }

  class Wrapper extends React.Component {
    render() {
      return Component(this.props);
    }
  }

  Wrapper.displayName = displayName;

  Object.keys(methods).forEach((methodName) => {
    const methodCreator = methodCreators[methodName];
    const method = methodCreator(methods[methodName]);

    Object.defineProperty(Wrapper.prototype, methodName, {
      writable: true,
      enumerable: false,
      configurable: true,
      value: method
    });
  });

  return Wrapper;
}
