import React from 'react'
import {connect} from 'react-redux'
import {ApplicationState, ConnectedReduxProps} from '../store'
import {addOrder, clearOrder, placeOrder, removeOrder} from "../store/menus/actions";
import {Dispatch} from "redux";
import Navigation from "../components/layout/Navigation";
import {Col, Container, Row} from "reactstrap";
import {Menu} from "../store/menus/types";
import Heading from "../components/Heading";
import MenuButton from "../components/Button";
import styled from "../utils/styled";
import OrderCard from "../components/cards/OrderCard";
import ConfirmationModal from "../components/layout/ConfirmationModal";
import {v1Api} from "../utils/api";


type State = {
    totalPrice: number
    modal: boolean
    confirm: boolean
}

type PropsFromState = {
    orders: { [key: number]: number }
    menus: Menu[]
    config: any
}

type PropsFromDispatch = {
    clearOrders: typeof clearOrder
    addToOrder: typeof addOrder
    removeFromOrder: typeof removeOrder
    placeOrders: typeof placeOrder
}

type AllProps = PropsFromState &
    PropsFromDispatch &
    ConnectedReduxProps

class Order extends React.Component<AllProps, State> {
    state = {
        totalPrice: 0,
        modal: false,
        confirm: false
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

    placeOrder = async () => {
        try {
            const {orders} = this.props
            const params = {
                path: 'order',
                method: 'post',
                body: {
                    order: orders
                }
            }
            const res = await v1Api(params)
            if (res.ref_code != undefined) {
                this.setState({
                    confirm: true
                })
                this.props.placeOrders(res.ref_code)
                this.toggleModal()
            }
        } catch (err) {
            this.setState({
                confirm: false
            })
            this.toggleModal()
        }


    }

    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    componentDidMount(): void {
        let totalAmount = 0
        this.props.menus.map(menu => {
            const current = this.props.orders[menu.id]
            if (current !== undefined) totalAmount += current * menu.price
            return
        })
        this.setState({
            totalPrice: totalAmount
        })

    }


    render() {
        const {orders, menus} = this.props

        const {totalPrice} = this.state


        return (
            <Wrapper>
                <Navigation override={-1}/>
                <Container>
                    <Heading text={'Order'} underline={true}/>
                    {Object.keys(orders).length > 0 ? (
                        <div>
                            <Row className='row-box'>
                                {menus.map(menu => {

                                    if (orders[menu.id]) {
                                        return (
                                            <OrderCard key={menu.id} menu={menu} quantity={orders[menu.id]}
                                                       addOrder={() => {
                                                           this.manageCart(menu.id, menu.price, true)
                                                       }}
                                                       removeOrder={() => {
                                                           this.manageCart(menu.id, menu.price, false)
                                                       }}
                                            />
                                        )
                                    }

                                })}

                                {/*<OrderCard menu={mockMenu}/>*/}
                            </Row>
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
                            <Buttons>
                                <MenuButton onClick={this.placeOrder}>
                                    Place Order
                                </MenuButton>
                                <MenuButton onClick={this.props.clearOrders}>
                                    Clear All
                                </MenuButton>
                            </Buttons>

                        </div>
                    ) : (
                        <h5>
                            You currently do not have any menus in your order.
                        </h5>
                    )}
                    <ConfirmationModal isOpen={this.state.modal} toggleModal={this.toggleModal}
                                       text={this.state.confirm ? 'The order was sent!' : 'Sorry, there is an error in our system.'}/>
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
    addToOrder: (payload: any) => dispatch(addOrder(payload)),
    placeOrders: (payload: any) => dispatch(placeOrder(payload))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Order)

const Wrapper = styled('div')`
    h5 {
        text-align: center;
    }
     
    .row-box {
        display: contents;
    }
    
  
`

const TotalPrice = styled(Row)`
    margin-top: 1rem;
`

const Buttons = styled('div')`

    width: fit-content;
    margin: 1rem auto;

    button {
        display: inline-block;
        width: 160px;
        margin: 0 10px;
    }

`