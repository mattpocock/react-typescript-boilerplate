import React from 'react';
import { render } from 'react-testing-library';

import AppWrapper from '../AppWrapper';

describe('<AppWrapper />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(
      <AppWrapper messages={{}}>
        <div />
      </AppWrapper>,
    );
    expect(container).toMatchSnapshot();
  });
});
