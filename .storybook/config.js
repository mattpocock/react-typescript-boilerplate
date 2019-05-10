import React from 'react';
import AppWrapper from '../app/AppWrapper';
import { configure, addDecorator } from '@storybook/react';

addDecorator(storyFn => (
  <AppWrapper messages={{}}>
    <div
      style={{
        padding: '1.5rem',
      }}
    >
      {storyFn()}
    </div>
  </AppWrapper>
));

function loadStories() {
  /**
   * Loads everything in ../app/components with
   * suffix .stories.js
   */
  const req = require.context('../app/components', true, /\.stories\.tsx$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
