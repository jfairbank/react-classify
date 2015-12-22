# react-classify

Wrap functional React components with a component class, so you can use
lifecycle hook functions.

## Install

    $ npm install react-classify

## Example

```js
import React from 'react';
import { render } from 'react-dom';
import classify from 'react-classify';

function componentWillMount(props) {
  console.log('NameTag mounting with props', props);
}

const NameTag = ({ name }) => (
  <div>Hello, my name is {name}</div>
);

const WrappedNameTag = classify(NameTag, { componentWillMount });

render(
  <WrappedNameTag name="Jeremy"/>,
  document.getElementById('main')
);

// Logs 'NameTag mounting with props { name: "Jeremy" }'
```
