import React from 'react';
import classify from '../../src/classify';

const lifecycleFunction = (name, handler = () => {}) => (props, ...args) => {
  console.log(name, props, ...args);
  return handler(props, ...args);
};

const componentWillMount = lifecycleFunction('componentWillMount');
const componentDidMount = lifecycleFunction('componentDidMount');
const componentWillReceiveProps = lifecycleFunction('componentWillReceiveProps');

const shouldComponentUpdate = lifecycleFunction(
  'shouldComponentUpdate',
  (currentProps, nextProps, nextState) => true
);

const componentWillUpdate = lifecycleFunction('componentWillUpdate');
const componentDidUpdate = lifecycleFunction('componentDidUpdate');
const componentWillUnmount = lifecycleFunction('componentWillUnmount');

const NameTag = ({ name }) => (
  <div>Hello, my name is {name}</div>
);

export default classify(NameTag, {
  componentWillMount,
  componentDidMount,
  componentWillReceiveProps,
  shouldComponentUpdate,
  componentWillUpdate,
  componentDidUpdate,
  componentWillUnmount
});
