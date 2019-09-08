import { combineReducers, Dispatch, Action, AnyAction } from 'redux'
import { all, fork } from 'redux-saga/effects'
import { connectRouter } from 'connected-react-router'

import { LayoutState, layoutReducer } from './layout'

import menusSaga from './menus/sagas'
import { menusReducer } from './menus/reducers'
import { MenusState } from './menus/types'

import restaurantSaga from './restaurant/sagas'
import { restaurantReducer } from './restaurant/reducers'
import { RestaurantState } from './restaurant/types'

// import accountsSaga from './accounts/sagas'
// import { accountsReducer } from './accounts/reducer'
// import { AccountsState } from './accounts/types'

// The top-level state object
export interface ApplicationState {
    router: any
    layout: LayoutState
    menus: MenusState
    restaurant: RestaurantState
    // accounts: AccountsState
}

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps<A extends Action = AnyAction> {
    dispatch?: Dispatch<A>
}

export const rootReducer = (history: any) =>
    combineReducers<ApplicationState>({
        router: connectRouter(history),
        layout: layoutReducer,
        menus: menusReducer,
        restaurant: restaurantReducer
        // accounts: accountsReducer
    })

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
export function* rootSaga() {
    yield all([
        fork(menusSaga),
        fork(restaurantSaga),
        // fork(accountsSaga),
    ])
}
