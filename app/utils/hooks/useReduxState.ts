/* eslint-disable object-shorthand */
/* eslint-disable func-names */
import React, { useCallback } from 'react';
import { useInjectSaga } from '../injectSaga';
import { useInjectReducer } from '../injectReducer';
import { ReactReduxContext } from 'react-redux';
import { takeLatest } from 'redux-saga/effects';
import {
  makeConstants,
  makeReducer,
  makeActionCreators,
  makeDispatchFunctions,
} from './utils/makeReducer';

const useReduxState = <State, Actions>({
  key,
  initialState,
  actions,
  sagas = {},
}: Props<State, Actions>): ReduxStateReturn<State> & Actions => {
  const constants = makeConstants({
    key,
    actions,
  });

  const reducer = makeReducer({ initialState, actions, constants });
  const actionCreators = makeActionCreators({ actions, constants });

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

  const dispatchFunctions = makeDispatchFunctions({
    actionCreators,
    dispatch: context.store.dispatch,
  });

  const [state, setState] = React.useState(initialState);

  const handleChange = useCallback(() => {
    setState(context.store.getState()[key]);
  }, [context.store, key]);

  React.useEffect(() => context.store.subscribe(handleChange), [
    context.store,
    handleChange,
  ]);

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
