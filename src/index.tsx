import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {createBrowserHistory } from 'history'

import './styles'
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './main'
import * as serviceWorker from './serviceWorker'
import configureStore from './configureStore'


// we use hash history for static exports or else use browser history.
const history = createBrowserHistory()

// @ts-ignore
const initialState = window.initialReduxState
const store = configureStore(history, initialState)

ReactDOM.render(
    <Provider store={store}>
        <Main history={history} />
    </Provider>,
document.getElementById('root')
)

// For offline access and load faster, change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
