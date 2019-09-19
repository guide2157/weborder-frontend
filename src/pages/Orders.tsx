import React from 'react'
import {connect} from 'react-redux'
import {ApplicationState, ConnectedReduxProps} from '../store'
import {clearOrder} from "../store/menus/actions";
import {Dispatch} from "redux";
import Navigation from "../components/layout/Navigation";
import CardsGrid from "../components/layout/CardsGrid";
import {Col, Container, Row} from "reactstrap";
import {Menu} from "../store/menus/types";
import Heading from "../components/Heading";
import MenuButton from "../components/Button";
import styled from "../utils/styled";
import OrderCard from "../components/cards/OrderCard";


type State = {}

type PropsFromState = {
    orders : {id: number, quantity: number}[]
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

        const totalPrice = menus.reduce((rsf,menu) => rsf + menu.price, 0)

        const mockMenu = {
                about: 'delicious',
                category_name: 'Korean',
                detail: 'best fried chicken in town',
                image: '',
                id: 1,
                meta_description: '',
                meta_title: '',
                name: 'Fried Chicken',
                price: 15,
                slug: 'fried_chicken',
                tags: ['spicy', 'chicken', 'deep fried'],
                updated_at: 0
            }


        return (
            <Wrapper>
                <Navigation />
                <Container>
                    <Heading text={'Order'} underline={true}/>
                    {/*{orders.length > 0 ? (*/}
                        <div>
                        <CardsGrid>
                            {menus.map(menu => {
                                if (orders.find(order => {return order.id === menu.id}) !== undefined) {
                                    return (
                                            <OrderCard menu={menu}/>
                                    )
                                }
                            })}



                            <OrderCard menu={mockMenu}/>
                        </CardsGrid>
                            <TotalPrice>
                                <Col xs={{ size: 3, offset: 7}}>
                                    <span>
                                        Total:
                                    </span>
                                </Col>
                                <Col xs="2">
                                    <span>
                                        {totalPrice}$
                                    </span>
                                </Col>

                            </TotalPrice>

                        <MenuButton onClick={this.props.clearOrders}>
                        Clear All
                        </MenuButton>
                        </div>
                    {/*): (*/}
                    {/*    <h5>*/}
                    {/*        You currently do not have any menus in your order.*/}
                    {/*    </h5>*/}
                    {/*)}*/}


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

const TotalPrice = styled(Row)`
    margin-top: 1rem;
`