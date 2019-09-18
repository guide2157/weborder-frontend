import { all, call, fork, put, takeLatest } from 'redux-saga/effects'
import { MenusActionTypes } from './types'
import { fetchError, fetchSuccess } from './actions'
import { v1Api } from '../../utils/api'

function* handleFetch(action: any) {
    // const { locale } = action.payload
    try {
        const params = {
            // locale,
            path: 'menus/all'
        }
        const res = yield call(v1Api, params)

        if (res.error) {
            yield put(fetchError(res.error))
        } else {
            yield put(fetchSuccess({ data: res }))
        }
    } catch (err) {
        if (err instanceof Error) {
            yield put(fetchError(err.stack!))
        } else {
            yield put(fetchError('An unknown error occured.'))
        }
    }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchFetchRequest() {
    yield all([
        takeLatest(MenusActionTypes.FETCH_REQUEST, handleFetch)
    ])
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* menusSaga() {
    yield all([fork(watchFetchRequest)])
}

export default menusSaga
