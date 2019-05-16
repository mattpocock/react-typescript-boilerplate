export default {
  initialState: {
    isLoading: false,
    errorMessage: '',
    hasError: false,
    hasSucceeded: false,
    data: null,
    prevPayload: null,
  },
  actions: {
    submit: (state: any, payload: any) => ({
      ...state,
      isLoading: true,
      hasError: false,
      hasSucceeded: false,
      prevPayload: payload,
    }),
    reportSuccess: (state: any, payload: any) => ({
      ...state,
      isLoading: false,
      hasError: false,
      hasSucceeded: true,
      data: payload,
    }),
    reportFailure: (state: any, payload: any) => ({
      ...state,
      isLoading: false,
      hasError: true,
      hasSucceeded: false,
      errorMessage: payload,
    }),
    reset: () => ({
      isLoading: false,
      errorMessage: '',
      hasError: false,
      hasSucceeded: false,
      data: null,
      prevPayload: null,
    }),
  },
};
