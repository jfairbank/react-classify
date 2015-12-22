import React from 'react';
import methodCreators from './methodCreators';

export default function classify(Component, methods = {}) {
  class Wrapper extends React.Component {
    render() {
      return Component(this.props);
    }
  }

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
