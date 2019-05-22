import { selectLanguage } from '../selectors';
import { initialState } from '../reducer';

describe('selectLanguage', () => {
  it('should select the global state', () => {
    const globalState = {};
    const mockedState = {
      language: globalState,
    };
    expect(selectLanguage(mockedState)).toEqual(globalState);
  });
  it('Should select the initialState when state is not available', () => {
    const mockedState = {};
    expect(selectLanguage(mockedState)).toEqual(initialState);
  });
});
