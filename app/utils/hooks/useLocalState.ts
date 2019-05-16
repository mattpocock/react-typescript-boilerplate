import { useReducer } from 'react';
import {
  makeActionCreators,
  makeConstants,
  makeDispatchFunctions,
  makeReducer,
} from './utils/makeReducer';

const useLocalState = <State, Actions>({
  initialState,
  actions,
}: Props<State, Actions>): { state: State } & Actions => {
  const constants = makeConstants({ actions, key: '' });
  const reducer = makeReducer({ initialState, actions, constants });
  const [state, dispatch] = useReducer(reducer, initialState);
  const actionCreators = makeActionCreators({ actions, constants });
  const dispatchFunctions = makeDispatchFunctions({ actionCreators, dispatch });
  // @ts-ignore
  return {
    ...dispatchFunctions,
    state,
  };
};

interface Props<State, Actions> {
  initialState: State;
  actions: ActionDefinition<State, Actions>;
}

type ActionDefinition<State, Actions> = {
  [K in keyof Actions]: (state: State, payload: any) => State
};

export default useLocalState;
