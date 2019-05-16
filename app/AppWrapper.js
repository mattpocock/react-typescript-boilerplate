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
/* eslint-disable */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable */

import configureStore from './configureStore';
import ThemeProvider from 'ThemeProvider';

// Import i18n messages

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);

// eslint-disable-next-line react/prop-types
const AppWrapper = ({ children, messages }) => (
  <ThemeProvider>
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>{children}</ConnectedRouter>
      </LanguageProvider>
    </Provider>
  </ThemeProvider>
);

export default AppWrapper;
