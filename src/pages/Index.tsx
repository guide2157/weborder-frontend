import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {ApplicationState, ConnectedReduxProps} from '../store'
import {fetchMenusRequest} from "../store/menus/actions";
import {fetchRequest as fetchRestaurant} from "../store/restaurant/actions";
import {Dispatch} from "redux";
import Navigation from "../components/layout/Navigation";
import MenuCard from "../components/cards/MenuCard";
import CardsGrid from "../components/layout/CardsGrid";
import {Col, Container} from "reactstrap";
import {Menu} from "../store/menus/types";


type State = {}

type PropsFromState = {
    loading: boolean
    menus: Menu[]
    errors?: string
    config: any
    restaurant: any
}

type PropsFromDispatch = {
    fetchRequest: typeof fetchMenusRequest
    fetchRestaurant: typeof fetchRestaurant
}

type AllProps = PropsFromState &
    PropsFromDispatch &
    ConnectedReduxProps

class IndexPage extends React.Component<AllProps, State> {

    componentDidMount(): void {
        this.props.fetchRequest();
        this.props.fetchRestaurant();
    }

    render() {

        return (
            <Fragment>
                <Navigation />
                <Container>
                <CardsGrid>
                    <Col key={2} xs="6" sm="6" >
                    <MenuCard image={''} id={1} name={'rice'} price={40} tags={['hot']}/>
                    </Col>
                    <Col key={1} xs="6" sm="6">
                    <MenuCard image={''} id={2} name={'soup'} price={50} tags={['carrot']}/>
                    </Col>
                    <Col key={3} xs="6" sm="6">
                        <MenuCard image={''} id={2} name={'soup'} price={50} tags={['carrot']}/>
                    </Col>
                </CardsGrid>
                </Container>

            </Fragment>
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
    fetchRestaurant: (payload: any) => dispatch(fetchRestaurant(payload)),
    fetchRequest: (payload: any) => dispatch(fetchMenusRequest(payload))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexPage)