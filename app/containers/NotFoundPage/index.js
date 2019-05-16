/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import { Typography } from '@material-ui/core';

export default function NotFound() {
  return (
    <Typography>
      <FormattedMessage {...messages.header} />
    </Typography>
  );
}
