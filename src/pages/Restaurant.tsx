import React from 'react'
import styled from "../utils/styled";
import {fetchRequest as fetchRestaurant} from "../store/restaurant/actions";
import {ApplicationState, ConnectedReduxProps} from "../store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import CardsCarousel from "../components/layout/CardsCarousel";
import {Restaurant} from "../store/restaurant/types";
import {Col, Container} from "reactstrap";
import {map} from 'lodash';
import Heading from "../components/Heading";
// @ts-ignore
import Helmet from 'react-helmet'
import MenuCard from "../components/cards/MenuCard";
import Banner from "../components/layout/Banner";
import Navigation from "../components/layout/Navigation";


type PropsFromState = {
    loading: boolean
    config: any
    restaurant: Restaurant | undefined
}

type PropsFromDispatch = {
    fetchRestaurant: typeof fetchRestaurant
}

type AllProps = PropsFromState &
    PropsFromDispatch &
    ConnectedReduxProps

class RestaurantPage extends React.Component<AllProps, {}> {

    componentDidMount(): void {
        if (!this.props.restaurant) {
            this.props.fetchRestaurant()
        }
    }

    render() {

        const {restaurant} = this.props
        return (
            <Wrapper>

                <Helmet>
                    <title>{restaurant  && restaurant.meta_title}</title>
                    <meta
                        name="description"
                        content={restaurant  && restaurant.meta_description}
                    />
                </Helmet>

                {restaurant && (
                    <div>
                        <Navigation />
                        <Banner text={restaurant.name} image={restaurant.gallery}/>
                        <Container>
                            <Heading text={restaurant.name} underline={true}/>
                            <p>{restaurant.detail}</p>
                            <h5>Featured menus</h5>

                        <CardsCarousel>
                            {map(restaurant.featured_menus, (menu: any) => {
                                return (
                                    <Col key={menu.id}>
                                        <MenuCard key={menu.id} menu={menu} />
                                    </Col>
                                )
                            })}
                        </CardsCarousel>
                        </Container>
                    </div>
                )}


            </Wrapper>
        )
    }
}

const mapStateToProps = ({menus, layout, restaurant}: ApplicationState) => ({
    loading: menus.loading,
    restaurant: restaurant.data,
    config: layout,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchRestaurant: (payload: any) => dispatch(fetchRestaurant(payload))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RestaurantPage)


const Wrapper = styled('div')`
    h5 {
        margin-bottom: 1rem;
    }
`