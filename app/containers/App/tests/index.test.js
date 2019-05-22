import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import App from '../index';
import { Router } from 'react-router';
import history from 'utils/history';

jest.mock('containers/HomePage', () => () => <span />);
jest.mock('containers/NotFoundPage', () => () => <span />);

describe('<App />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale="en">
        <Router history={history}>
          <App />
        </Router>
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
