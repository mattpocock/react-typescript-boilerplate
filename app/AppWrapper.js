/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Import all the third party stuff
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './configureStore';

// Import i18n messages

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);

// eslint-disable-next-line react/prop-types
const AppWrapper = ({ children, messages }) => (
  <Provider store={store}>
    <LanguageProvider messages={messages}>
      <ConnectedRouter history={history}>{children}</ConnectedRouter>
    </LanguageProvider>
  </Provider>
);

export default AppWrapper;
