import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { bindActionCreators, createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import NameTag from './NameTag';

const NameTagContainer = connect(props => props)(NameTag);

const store = createStore((state = { name: 'Jeremy' }, action) => {
  if (action.type === 'CHANGE_NAME') {
    return { name: action.payload };
  }

  return state;
});

const actions = bindActionCreators({
  changeName: (name) => ({ type: 'CHANGE_NAME', payload: name })
}, store.dispatch);

render(
  <Provider store={store}>
    <NameTagContainer/>
  </Provider>,
  document.getElementById('main')
);

setTimeout(() => actions.changeName('Bob'), 1000);
setTimeout(() => unmountComponentAtNode(document.getElementById('main')), 2000);
