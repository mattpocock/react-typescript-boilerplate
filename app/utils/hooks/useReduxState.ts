/* eslint-disable object-shorthand */
/* eslint-disable func-names */
import React from 'react';
import { useInjectSaga } from '../injectSaga';
import { useInjectReducer } from '../injectReducer';
import { ReactReduxContext } from 'react-redux';
import { takeLatest } from 'redux-saga/effects';

const useReduxState = <State, Actions>({
  key,
  initialState,
  actions,
  sagas = {},
}: Props<State, Actions>): ReduxStateReturn<State> & Actions => {
  const constants = {
    ...Object.keys(actions)
      .map(actionName => ({
        [actionName]: `${key}/${constant(actionName)}`,
      }))
      .reduce(reduceToObject, {}),
  };

  const reducer = (
    state = initialState,
    { type, payload }: { type: string; payload: any },
  ) => {
    const cases = [
      ...Object.keys(actions).map(actionName => ({
        type: constants[actionName],
        // @ts-ignore
        action: actions[actionName],
      })),
    ];
    return (
      cases
        .filter(c => type === c.type)
        /**
         * Runs through each case that matches the type, and calls
         * it with (state, payload). At the end of the reduce, returns
         * the state
         */
        .reduce((a, b) => (b.action ? b.action(a, payload) : a), state)
    );
  };

  const actionCreators = {
    ...Object.keys(actions)
      .map(actionName => ({
        [actionName]: (payload?: any) => {
          return {
            type: constants[actionName],
            payload,
          };
        },
      }))
      .reduce(reduceToObject, {}),
  };

  useInjectReducer({ key, reducer });
  useInjectSaga({
    key,
    saga: function*() {
      const sagaKeys = Object.keys(sagas);
      for (let i = 0; i < sagaKeys.length; i += 1) {
        const sagaKey = sagaKeys[i];
        // @ts-ignore
        yield takeLatest(constants[sagaKey], sagas[sagaKey](actionCreators));
      }
    },
    mode: null,
  });

  const context: any = React.useContext(ReactReduxContext);

  const dispatchFunctions = {
    ...Object.keys(actions)
      .map(actionName => ({
        [actionName]: (payload: any) => {
          /** Don't allow events as payloads - slows down redux dev tools */
          if (payload && payload.stopPropagation) {
            context.store.dispatch(actionCreators[actionName]());
          } else {
            context.store.dispatch(actionCreators[actionName](payload));
          }
        },
      }))
      .reduce(reduceToObject, {}),
  };

  const [state, setState] = React.useState(initialState);

  const handleChange = () => {
    setState(context.store.getState()[key]);
  };

  React.useEffect(() => context.store.subscribe(handleChange), []);

  // @ts-ignore
  return {
    ...dispatchFunctions,
    state: state || initialState,
  };
};

interface Props<State, Actions> {
  key: string;
  initialState: State;
  actions: ActionDefinition<State, Actions>;
  sagas?: SagaType<Actions>;
}

type SagaType<Actions> = {
  [K in keyof Actions]?: (
    actions: ActionCreators<Actions>,
  ) => (action: { type: string; payload: any }) => void
};

type ActionCreators<Actions> = {
  [K in keyof Actions]: (payload?: any) => { type: string; payload?: any }
};

type ActionDefinition<State, Actions> = {
  [K in keyof Actions]: (state: State, payload: any) => State
};

interface ReduxStateReturn<State> {
  state: State;
}

export default useReduxState;

const reduceToObject = (a: {}, b: {}) => ({ ...a, ...b });

const parseCamelCaseToArray = (value: string) =>
  value.replace(/([A-Z])/g, letter => ` ${letter}`).split(' ');

const constant = (value: string) =>
  parseCamelCaseToArray(value)
    .map(word => word.toUpperCase())
    .join('_');
