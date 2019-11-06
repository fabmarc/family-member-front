import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import LoaderIndicator from '../index';

describe('<LoaderIndicator />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<LoaderIndicator />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
