/**
 * Container Generator
 */

const path = require('path');
const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a container component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Form',
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
        path: path.resolve(__dirname, '../../../app/containers/{{properCase name}}/index.tsx'),
        templateFile: './container/class.tsx.hbs',
        abortOnFail: true,
      },
    ];

    actions.push({
      type: 'add',
      path: path.resolve(__dirname, '../../../app/containers/{{properCase name}}/use{{properCase name}}State.ts'),
      templateFile: './container/useReduxState.ts.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'add',
      path: path.resolve(__dirname, '../../../app/containers/{{properCase name}}/messages.ts'),
      templateFile: './container/messages.ts.hbs',
      abortOnFail: true,
    });
    actions.push({
      type: 'add',
      path: path.resolve(__dirname, '../../../app/containers/{{properCase name}}/Loadable.tsx'),
      templateFile: './component/loadable.tsx.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'prettify',
      path: './app/containers/',
    });

    return actions;
  },
};
