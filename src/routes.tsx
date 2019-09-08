import * as React from 'react'
import {Route, Switch} from 'react-router-dom'
import { withRouter } from 'react-router'

import Root from './components/layout/Root'
import IndexPage from './pages/Index'
import WishListPage from "./pages/WishList";

class Routes extends React.Component<{}, {}> {
    render() {
        return (
            <Root>
                <Switch>
                    <Route
                        exact
                        path={''}
                        component={IndexPage}
                    />
                    <Route
                        path={'/wishlist'}
                        component={WishListPage}
                    />
                    {/* //************************ ADD NEW ROUTES HERE ABOVE RELOAD *********************************\\ */}
                    {/*
          // @ts-ignore */}

                </Switch>
            </Root>
        )
    }
}

// @ts-ignore
export default withRouter(Routes)
