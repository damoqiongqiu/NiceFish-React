import React from 'react';
import { create } from 'react-test-renderer';
import App from 'src/containers';
describe('render App Test', () => {
  it('render App correctly', () => {
    const testRender = create(<App />);
    expect(testRender.toJSON()).toMatchSnapshot();
    expect(testRender.root.findByType('div').props.className).toBe('layout-warpper');
  });
});
