# react-classify

Wrap functional React components with a component class, so you can use
lifecycle hook functions and have a backing instance for testing or other
purposes.

## Install

    $ npm install react-classify

## Usage

Use the default export `classify` to wrap your functional React component in a
class. This allows your component to have a wrapped backing instance which may
be useful for tests or other reasons. Additionally, you can provide lifecycle
hook functions.

```js
import React from 'react';
import { render } from 'react-dom';
import classify from 'react-classify';

function componentWillMount(props) {
  console.log('NameTag mounting with props', props);
}

const FunctionalNameTag = ({ name }) => (
  <div>Hello, my name is {name}</div>
);

const NameTag = classify(FunctionalNameTag, 'NameTag', { componentWillMount });

render(
  <NameTag name="Jeremy"/>,
  document.getElementById('main')
);

// Logs 'NameTag mounting with props { name: "Jeremy" }'
```

## API

### `classify`

```js
classify(
  componentFunction: (props: Object) => ReactElement,
  [displayName: string],
  [methods: {
    [componentWillMount: (props: Object) => void],
    [componentDidMount: (props: Object) => void],
    [componentWillReceiveProps: (currentProps: Object, nextProps: Object) => void],
    [shouldComponentUpdate: (currentProps: Object, nextProps: Object) => boolean],
    [componentWillUpdate: (currentProps: Object, nextProps: Object) => void],
    [componentDidUpdate: (currentProps: Object, prevProps: Object) => void],
    [componentWillUnmount: (props: Object) => void]
  }]
): React.Component
```

### `displayName`

You can provide a `displayName` for your wrapped component for debugging
purposes via the second argument.

```js
const FunctionalNameTag = ({ name }) => (
  <div>Hello, my name is {name}</div>
);

const NameTag = classify(FunctionalNameTag, 'NameTag');

console.assert(NameTag.displayName === 'NameTag');
```

### Lifecycle Functions

All lifecycle functions are optional. Notice that lifecycle functions all take
the current `props` as the first parameter. They may take an additional argument
based on whether you're updating the `props` for the component.


#### `componentWillMount(props: Object): void`

Invoked once immediately before the initial rendering occurs.

#### `componentDidMount(props: Object): void`

Invoked once immediately after the initial rendering occurs.

#### `componentWillReceiveProps(currentProps: Object, nextProps: Object): void`

Invoked when a component is receiving new props. This function is not called for
the initial render.

#### `shouldComponentUpdate(currentProps: Object, nextProps: Object): boolean`

Invoked before rendering when new props are being received. This function is not
called for the initial render. Return `false` to prevent a component update.

#### `componentWillUpdate(currentProps: Object, nextProps: Object): void`

Invoked immediately before rendering when new props are being received. This
function is not called for the initial render.

#### `componentDidUpdate(currentProps: Object, prevProps: Object): void`

Invoked immediately after the component's updates are flushed to the DOM. This
function is not called for the initial render.

#### `componentWillUnmount(props: Object): void`

Invoked immediately before a component is unmounted from the DOM.
