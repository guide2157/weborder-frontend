import React, {Fragment} from 'react'
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
            <Fragment>
                <Navigation />
                <Container>
                    <Heading text={'Wish List'} underline={true}/>
                    <CardsGrid>
                        {menus.map(menu => {
                            if (wishList.find(id => {return id === menu.id}) !== undefined) {
                                return (
                                    <Col key={2} xs="6" sm="6" >
                                        <MenuCard menu={menu}/>
                                    </Col>
                                )
                            }
                        })}
                    </CardsGrid>
                    <MenuButton onClick={this.props.clearWishList}>
                        Clear All
                    </MenuButton>
                </Container>

            </Fragment>
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