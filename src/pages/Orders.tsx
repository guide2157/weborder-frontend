import React from 'react'
import {connect} from 'react-redux'
import {ApplicationState, ConnectedReduxProps} from '../store'
import {addOrder, clearOrder, removeOrder} from "../store/menus/actions";
import {Dispatch} from "redux";
import Navigation from "../components/layout/Navigation";
import CardsGrid from "../components/layout/CardsGrid";
import {Col, Container, Row} from "reactstrap";
import {Menu} from "../store/menus/types";
import Heading from "../components/Heading";
import MenuButton from "../components/Button";
import styled from "../utils/styled";
import OrderCard from "../components/cards/OrderCard";


type State = {
    totalPrice: number
}

type PropsFromState = {
    orders: { id: number, quantity: number }[]
    menus: Menu[]
    config: any
}

type PropsFromDispatch = {
    clearOrders: typeof clearOrder
    addToOrder: typeof addOrder
    removeFromOrder: typeof removeOrder
}

type AllProps = PropsFromState &
    PropsFromDispatch &
    ConnectedReduxProps

class Order extends React.Component<AllProps, State> {
    state = {
        totalPrice: this.props.menus.reduce((rsf: number, {price, quantity}) => {
            return rsf * 1 + ( price * 1 * quantity)
        }, 0)
    }

    manageCart = (id: number, amount: number, add: boolean) => {
        if (add) {
            this.props.addToOrder(id)
        } else {
            this.props.removeFromOrder(id)
        }
        this.setState((prevState) => ({
            totalPrice: add ? prevState.totalPrice * 1 + amount * 1 : prevState.totalPrice * 1 - amount * 1
        }))
    }


    render() {
        const {orders, menus} = this.props

        const {totalPrice} = this.state

        // const mockMenu = {
        //         about: 'delicious',
        //         category_name: 'Korean',
        //         detail: 'best fried chicken in town',
        //         image: '',
        //         id: 1,
        //         meta_description: '',
        //         meta_title: '',
        //         name: 'Fried Chicken',
        //         price: 15,
        //         slug: 'fried_chicken',
        //         tags: ['spicy', 'chicken', 'deep fried'],
        //         updated_at: 0
        //     }


        return (
            <Wrapper>
                <Navigation/>
                <Container>
                    <Heading text={'Order'} underline={true}/>
                    {orders.length > 0 ? (
                        <div>
                            <CardsGrid>
                                {menus.map(menu => {
                                    let amount = 0
                                    let found = false
                                    orders.map(order => {
                                        if (order.id === menu.id) {
                                            found = true
                                            amount = order.quantity
                                        }
                                    })

                                    if (found) {
                                        return (
                                            <OrderCard key={menu.id} menu={menu} quantity={amount}
                                                       addOrder={(id: number) => {
                                                           this.manageCart(id, menu.price, true)
                                                       }}
                                                       removeOrder={(id: number) => {
                                                           this.manageCart(id, menu.price, false)
                                                       }}
                                            />
                                        )
                                    }

                                })}

                                {/*<OrderCard menu={mockMenu}/>*/}
                            </CardsGrid>
                            <TotalPrice>
                                <Col xs={{size: 3, offset: 6}}>
                                    <span>
                                        Total:
                                    </span>
                                </Col>
                                <Col xs="2">
                                    <span>
                                        {totalPrice.toFixed(2)}$
                                    </span>
                                </Col>

                            </TotalPrice>

                            <MenuButton onClick={this.props.clearOrders}>
                                Clear All
                            </MenuButton>
                        </div>
                    ) : (
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
    clearOrders: () => dispatch(clearOrder()),
    removeFromOrder: (payload: any) => dispatch(removeOrder(payload)),
    addToOrder: (payload: any) => dispatch(addOrder(payload))
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

const TotalPrice = styled(Row)`
    margin-top: 1rem;
`