import React, {Fragment} from 'react'
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
                    <Fragment>
                        {restaurant.gallery.length > 0 && (
                            <CardsCarousel>
                                {map(restaurant.gallery, (url: any) => {
                                    return (
                                        <Col>
                                            <img ref={url}/>
                                        </Col>
                                    )
                                })}
                            </CardsCarousel>
                        )}
                        <Container>
                            <Heading text={restaurant.name} underline={true}/>
                            <p>{restaurant.about}</p>
                            <Heading text={'featured menus'}/>
                        </Container>
                        <CardsCarousel>
                            {map(restaurant.featured_menus, (menu: any) => {
                                return (
                                    <Col>
                                        <MenuCard menu={menu} />
                                    </Col>
                                )
                            })}
                        </CardsCarousel>
                    </Fragment>
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

`