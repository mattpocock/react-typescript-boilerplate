/**
 * Component Generator
 */

/* eslint strict: ["off"] */

'use strict';

const path = require('path');
const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add an unconnected component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
  ],
  actions: () => {
    const actions = [
      {
        type: 'add',
        path: path.resolve(__dirname, '../../../app/components/{{properCase name}}/index.tsx'),
        templateFile: './component/stateless.tsx.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: path.resolve(__dirname, '../../../app/components/{{properCase name}}/stories/index.stories.tsx'),
        templateFile: './component/index.stories.tsx.hbs',
        abortOnFail: true,
      },
    ];
    actions.push({
      type: 'add',
      path: path.resolve(__dirname, '../../../app/components/{{properCase name}}/messages.ts'),
      templateFile: './component/messages.ts.hbs',
      abortOnFail: true,
    });
    actions.push({
      type: 'add',
      path: path.resolve(__dirname, '../../../app/components/{{properCase name}}/Loadable.tsx'),
      templateFile: './component/loadable.tsx.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'prettify',
      path: path.resolve(__dirname, '../../../app/components/'),
    });

    return actions;
  },
};
