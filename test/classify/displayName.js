import React from 'react';
import { expect } from 'chai';
import classify from '../../src/classify';

const FunctionalText = ({ content }) => <div>{content}</div>;

describe('displayName', () => {
  it('uses a default', () => {
    const Text = classify(FunctionalText);
    expect(Text.displayName).to.equal('Component');
  });

  it('uses a default when methods are the second arg', () => {
    const Text = classify(FunctionalText, {
      componentWillMount() {}
    });

    expect(Text.displayName).to.equal('Component');
    expect(Text.prototype.componentWillMount).to.be.a('function');
  });

  it('uses the provided displayName', () => {
    const Text = classify(FunctionalText, 'Text');
    expect(Text.displayName).to.equal('Text');
  });

  it('uses the provided displayName when methods are supplied', () => {
    const Text = classify(FunctionalText, 'Text', {
      componentWillMount() {}
    });

    expect(Text.displayName).to.equal('Text');
    expect(Text.prototype.componentWillMount).to.be.a('function');
  });
});
