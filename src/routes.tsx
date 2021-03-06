import * as React from 'react'
import {Route, Switch} from 'react-router-dom'
import {withRouter} from 'react-router'

import Root from './components/layout/Root'
import IndexPage from './pages/Index'
import WishListPage from "./pages/WishList";
import RestaurantPage from './pages/Restaurant'
import OrderPage from './pages/Orders';
import AboutPage from './pages/About';
import MenuPage from './pages/Menu';
import HistoryPage from './pages/History'

class Routes extends React.Component<{}, {}> {
    render() {
        return (
            <Root>
                <Switch>
                    <Route
                        exact
                        path={'/'}
                        render={() => <IndexPage/>}
                    />
                    <Route
                        exact
                        path={'/menus/:id'}
                        component={MenuPage}
                    />
                    <Route
                        path={'/wishlist'}
                        render={() => <WishListPage/>}
                    />
                    <Route
                        path={'/orders'}
                        render={() => <OrderPage/>}
                    />
                    <Route
                        path={'/history'}
                        render={() => <HistoryPage/>}
                    />
                    <Route
                        path={'/restaurant'}
                        render={() => <RestaurantPage/>}
                    />
                    <Route
                        path={'/about'}
                        component={AboutPage}
                    />
                </Switch>
            </Root>
        )
    }
}

// @ts-ignore
export default withRouter(Routes)
