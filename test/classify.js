import React from 'react';
import chai, { expect } from 'chai';
import { describeWithDOM, mount, shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import classify from '../src/classify';

chai.use(sinonChai);

describeWithDOM('classify', () => {
  it('receives props', () => {
    const content = 'hello';
    const [Text, WrappedText] = createTextComponent();

    shallow(<WrappedText content={content}/>);

    expect(Text).to.have.been
      .calledOnce.and
      .calledWith({ content });
  });

  it('uses componentWillMount', () => {
    testNoExtraArgs('componentWillMount', { render: shallow });
  });

  it('uses componentDidMount', () => {
    testNoExtraArgs('componentDidMount', { render: mount });
  });

  describe('updating props', () => {
    it('uses componentWillReceiveProps', () => {
      testUpdatingProps('componentWillReceiveProps');
    });

    describe('shouldComponentUpdate', () => {
      it('prevents an update', () => {
        testUpdatingProps('shouldComponentUpdate', {
          lifecycleFunction: sinon.stub().returns(false),

          after(element, component, content) {
            expect(component.text()).to.equal(content.before);
          }
        });
      });

      it('allows an update', () => {
        testUpdatingProps('shouldComponentUpdate', {
          lifecycleFunction: sinon.stub().returns(true),

          after(element, component, content) {
            expect(component.text()).to.equal(content.after);
          }
        });
      });
    });

    it('uses componentWillUpdate', () => {
      testUpdatingProps('componentWillUpdate');
    });

    it('uses componentDidUpdate', () => {
      testUpdatingProps('componentDidUpdate', {
        argsBuilder: (content) => [
          { content: content.after },
          { content: content.before }
        ]
      });
    });
  });

  it('uses componentWillUnmount', () => {
    testNoExtraArgs('componentWillUnmount', {
      render(element) {
        const anchor = document.createElement('div');
        anchor.id = 'componentWillUnmount';

        document.body.appendChild(anchor);

        ReactDOM.render(element, anchor);
      },

      beforeAssertions() {
        const anchor = document.getElementById('componentWillUnmount');

        ReactDOM.unmountComponentAtNode(anchor);

        anchor.parentNode.removeChild(anchor);
      }
    })
  });
});

function createTextComponent(methods) {
  const Text = sinon.spy(({ content }) => <div>{content}</div>);
  const WrappedText = classify(Text, methods);

  return [Text, WrappedText];
}

function testNoExtraArgs(lifecycleName, {
  render,
  beforeAssertions = () => {}
} = {}) {
  const content = 'hello';
  const lifecycleFunction = sinon.spy();

  const [Text, WrappedText] = createTextComponent({
    [lifecycleName]: lifecycleFunction
  });

  render(<WrappedText content={content}/>);

  beforeAssertions();

  expect(lifecycleFunction).to.have.been
    .calledOnce.and
    .calledWith({ content });
}

function mountInStateWrapper(Component, initialState) {
  let element;

  class Wrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = initialState
      element = this;
    }

    render() {
      return <Component {...this.state}/>;
    }
  }

  const component = mount(<Wrapper/>);

  return [element, component];
}

function testUpdatingProps(lifecycleName, {
  lifecycleFunction = sinon.spy(),
  after = () => {},
  argsBuilder = (content) => [
    { content: content.before },
    { content: content.after }
  ]
} = {}) {
  const content = Object.freeze({ before: 'hello', after: 'hola' });

  const [Text, WrappedText] = createTextComponent({
    [lifecycleName]: lifecycleFunction
  });

  const [element, component] = mountInStateWrapper(WrappedText, {
    content: content.before
  });

  element.setState({ content: content.after });

  const args = argsBuilder(content);

  expect(lifecycleFunction).to.have.been
    .calledOnce.and
    .calledWith(...args);

  after(element, component, content);
}
