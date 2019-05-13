import React from 'react';
import AppWrapper from '../app/AppWrapper';
import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

addDecorator(withA11y);

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
   * suffix .stories.tsx
   */
  const req = require.context('../app/components', true, /\.stories\.tsx$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
