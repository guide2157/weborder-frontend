import React from 'react'
import {connect} from 'react-redux'
import {ApplicationState, ConnectedReduxProps} from '../store'
import {clearWishList} from "../store/menus/actions";
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
    wishList : number[]
    menus: Menu[]
    config: any
}

type PropsFromDispatch = {
    clearWishList: typeof clearWishList
}

type AllProps = PropsFromState &
    PropsFromDispatch &
    ConnectedReduxProps

class WishList extends React.Component<AllProps, State> {

    render() {
        const {wishList, menus} = this.props

        return (
            <Wrapper>
                <Navigation override={-1}/>
                <Container>
                    <Heading text={'Wish List'} underline={true}/>
                    {wishList.length > 0 ? (
                        <div>
                        <CardsGrid>
                            {menus.map(menu => {
                                if (wishList.find(id => {return id === menu.id}) !== undefined) {
                                    return (
                                        <Col key={menu.id} xs="6" sm="6" >
                                            <MenuCard menu={menu}/>
                                        </Col>
                                    )
                                }
                            })}
                        </CardsGrid>
                        <MenuButton onClick={this.props.clearWishList}>
                        Clear All
                        </MenuButton>
                        </div>
                    ): (
                        <h5>
                            You currently do not have any menus in your wishlist.
                        </h5>
                    )}


                </Container>

            </Wrapper>
        )
    }

}

const mapStateToProps = ({menus, layout}: ApplicationState) => ({
    wishList: menus.wishList,
    config: layout,
    menus: menus.data
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    clearWishList: () => dispatch(clearWishList())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WishList)

const Wrapper = styled('div')`
    h5 {
        text-align: center;
    }
`