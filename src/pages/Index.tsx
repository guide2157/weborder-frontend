import React from 'react'
import {connect} from 'react-redux'
import {ApplicationState, ConnectedReduxProps} from '../store'
import {fetchMenusRequest} from "../store/menus/actions";
// import {fetchRequest as fetchRestaurant} from "../store/restaurant/actions";
import {Dispatch} from "redux";
import Navigation from "../components/layout/Navigation";
import MenuCard from "../components/cards/MenuCard";
import CardsGrid from "../components/layout/CardsGrid";
import {Col, Container} from "reactstrap";
import {Menu} from "../store/menus/types";
import _ from "lodash";
import Banner from "../components/layout/Banner";
import styled from "../utils/styled";


type State = {}

type PropsFromState = {
    loading: boolean
    menus: Menu[]
    errors?: string
    config: any
    restaurant: any
}

type PropsFromDispatch = {
    fetchMenus: typeof fetchMenusRequest
    // fetchRestaurant: typeof fetchRestaurant
}

type AllProps = PropsFromState &
    PropsFromDispatch &
    ConnectedReduxProps

class IndexPage extends React.Component<AllProps, State> {

    componentDidMount(): void {
        this.props.fetchMenus();
        // this.props.fetchRestaurant();
    }

    render() {

        const {menus} = this.props

        return (
            <Wrapper>
                <Navigation/>
                <Banner text={'Menu'}
                        image={'https://media.istockphoto.com/photos/blurred-background-of-restaurant-interior-picture-id624546890?k=6&m=624546890&s=612x612&w=0&h=8N4_vwGoS0hzlw2A_SaaJlyMEVmi-H8k1jPF2ZG38H0='}/>
                <Container>
                    <CardsGrid>
                        {_.map(menus, (menu) => {
                            return (
                                <Col key={menu.id} xs="6" sm="6">
                                    <MenuCard menu={menu}/>
                                </Col>
                            )
                        })}
                    </CardsGrid>
                </Container>

            </Wrapper>
        )
    }

}

const mapStateToProps = ({menus, layout, restaurant}: ApplicationState) => ({
    loading: menus.loading,
    errors: menus.errors,
    menus: menus.data,
    restaurant: restaurant.data,
    config: layout,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    // fetchRestaurant: (payload: any) => dispatch(fetchRestaurant(payload)),
    fetchMenus: (payload: any) => dispatch(fetchMenusRequest(payload))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexPage)

const Wrapper = styled('div')`


`