import useReduxState from './useReduxState';
import { call, put } from 'redux-saga/effects';
import queryActionsAndState from './utils/queryActionsAndState';

interface Params {
  key: string;
  endpoint: string;
}

const useReduxQuery = <Request, Response>({ key, endpoint }: Params) =>
  useReduxState<QueryState<Request, Response>, QueryActions<Request, Response>>(
    {
      key,
      ...queryActionsAndState,
      sagas: {
        submit: actions =>
          function*({ payload }) {
            const fetchData = () =>
              new Promise((resolve, reject) => {
                try {
                  fetch(endpoint)
                    .then(res => res.json())
                    .then(data => resolve(data));
                } catch (e) {
                  reject(e);
                }
              });
            try {
              const data = yield call(fetchData);
              if (data) {
                yield put(actions.reportSuccess(data));
              } else {
                yield put(actions.reportFailure('An unknown error occurred'));
              }
            } catch (e) {
              yield put(actions.reportFailure(e.toString()));
            }
          },
      },
    },
  );

export default useReduxQuery;

export interface QueryState<Request, Response> {
  isLoading: boolean;
  errorMessage: string;
  hasError: boolean;
  hasSucceeded: boolean;
  data: Response | null;
  prevPayload: Request | null;
}

export interface QueryActions<Request, Response> {
  submit: (request?: Request) => void;
  reset: () => void;
  reportSuccess: (data: Response) => void;
  reportFailure: (errorMessage: string) => void;
}
