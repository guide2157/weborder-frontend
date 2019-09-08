import { Reducer } from 'redux'
import { LayoutState, LayoutActionTypes } from './types'


// Type-safe initialState!
const initialState: LayoutState =
  {
      theme: 'light',
      language: { code: 'en', name: 'English', en: 'English', locale: 'en_US' }
    }

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<LayoutState> = (state = initialState, action) => {
  switch (action.type) {
    case LayoutActionTypes.SET_THEME: {
      return { ...state, theme: action.payload }
    }
    case LayoutActionTypes.SET_LANGUAGE: {
      return { ...state, language: action.payload.locale, messages: action.payload.messages }
    }
    default: {
      return state
    }
  }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as layoutReducer }
