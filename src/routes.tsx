import * as React from 'react'
import {Route, Switch} from 'react-router-dom'
import { withRouter } from 'react-router'

import Root from './components/layout/Root'
import IndexPage from './pages/Index'
import WishListPage from "./pages/WishList";
import RestaurantPage from './pages/Restaurant'

class Routes extends React.Component<{}, {}> {
    render() {
        return (
            <Root>
                <Switch>
                    <Route
                        exact
                        path={'/'}
                        render={ () => <IndexPage/>}
                    />
                    <Route
                        path={'/wishlist'}
                        render={ () => <WishListPage/>}
                    />
                    <Route
                        path={'/restaurant'}
                        render={() => <RestaurantPage/>}
                    />

                </Switch>
            </Root>
        )
    }
}

// @ts-ignore
export default withRouter(Routes)
