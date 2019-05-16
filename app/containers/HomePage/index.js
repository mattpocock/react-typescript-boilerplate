/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Typography } from '@material-ui/core';

export default function HomePage() {
  return (
    <Typography>
      <FormattedMessage {...messages.header} />
    </Typography>
  );
}
