import React from 'react'
import {connect} from 'react-redux'
import {ApplicationState, ConnectedReduxProps} from '../store'
import {clearOrder} from "../store/menus/actions";
import {Dispatch} from "redux";
import Navigation from "../components/layout/Navigation";
import MenuCard from "../components/cards/MenuCard";
import CardsGrid from "../components/layout/CardsGrid";
import {Col, Container} from "reactstrap";
import {Menu} from "../store/menus/types";
import Heading from "../components/Heading";
import MenuButton from "../components/Button";
import styled from "../utils/styled";


type State = {}

type PropsFromState = {
    orders : number[]
    menus: Menu[]
    config: any
}

type PropsFromDispatch = {
    clearOrders: typeof clearOrder
}

type AllProps = PropsFromState &
    PropsFromDispatch &
    ConnectedReduxProps

class Order extends React.Component<AllProps, State> {

    render() {
        const {orders, menus} = this.props

        return (
            <Wrapper>
                <Navigation />
                <Container>
                    <Heading text={'Order'} underline={true}/>
                    {orders.length > 0 ? (
                        <div>
                        <CardsGrid>
                            {menus.map(menu => {
                                if (orders.find(id => {return id === menu.id}) !== undefined) {
                                    return (
                                        <Col key={2} xs="6" sm="6" >
                                            <MenuCard menu={menu}/>
                                        </Col>
                                    )
                                }
                            })}
                        </CardsGrid>
                        <MenuButton onClick={this.props.clearOrders}>
                        Clear All
                        </MenuButton>
                        </div>
                    ): (
                        <h5>
                            You currently do not have any menus in your order.
                        </h5>
                    )}


                </Container>

            </Wrapper>
        )
    }

}

const mapStateToProps = ({menus, layout}: ApplicationState) => ({
    orders: menus.orders,
    config: layout,
    menus: menus.data
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    clearOrders: () => dispatch(clearOrder())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Order)

const Wrapper = styled('div')`
    h5 {
        text-align: center;
    }
`