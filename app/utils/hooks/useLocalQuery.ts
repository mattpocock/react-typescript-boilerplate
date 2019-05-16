import useLocalState from './useLocalState';
import queryActionsAndState from './utils/queryActionsAndState';
import { QueryState, QueryActions } from './useReduxQuery';

const useLocalQuery = <Request, Response>({
  endpoint,
}: {
  endpoint: string;
}) => {
  const queryState = useLocalState<
    QueryState<Request, Response>,
    QueryActions<Request, Response>
  >({
    ...queryActionsAndState,
  });
  const handleSubmit = async () => {
    queryState.submit();
    try {
      const data = await fetch(endpoint).then(res => res.json());
      if (data) {
        queryState.reportSuccess(data);
      } else {
        queryState.reportFailure('An unknown error occurred');
      }
    } catch (e) {
      queryState.reportFailure(e.toString());
    }
  };
  return {
    reset: queryState.reset,
    submit: handleSubmit,
    state: queryState.state,
  };
};

export default useLocalQuery;
