import React, {Fragment} from 'react'
import styled from "../utils/styled";
import {ApplicationState, ConnectedReduxProps} from "../store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {Container} from "reactstrap";
import Heading from "../components/Heading";
// @ts-ignore
import Helmet from 'react-helmet'
import {fetchMenusRequest, addOrder, addWishList} from "../store/menus/actions";
import {Menu} from "../store/menus/types";
import {RouteComponentProps} from "react-router";
import Navigation from "../components/layout/Navigation";
import MenuButton from "../components/Button";
import ConfirmationModal from "../components/layout/ConfirmationModal";


type PropsFromState = {
    loading: boolean
    config: any
    menus: Menu[] | undefined
    id: any
}

type RouteParams = {
    id: any
}

type PropsFromDispatch = {
    fetchMenu: typeof fetchMenusRequest
    addToOrder: typeof addOrder
    addToWishList: typeof addWishList
}

type State = {
    addModal: boolean
    wishModal: boolean
}

type AllProps = PropsFromState &
    PropsFromDispatch &
    ConnectedReduxProps &
    RouteComponentProps<RouteParams>

class MenuPage extends React.Component<AllProps, State> {

    state = {
        addModal: false,
        wishModal: false
    }

    componentDidMount(): void {
        if (!this.props.menus) this.props.fetchMenu()
    }

    toggleModal = (add: boolean) => {
        if (add) {
            this.setState(prevState => ({
                addModal: prevState.addModal
            }))
        } else {
            this.setState(prevState => ({
                wishModal: prevState.wishModal
            }))
        }
    }

    render() {
        const {addModal, wishModal} = this.state
        const {menus, match} = this.props
        const menu = menus ? menus[match.params.id - 1] : undefined
        return (
            <Wrapper>

                <Helmet>
                    <title>{menu && menu.meta_title}</title>
                    <meta
                        name="description"
                        content={menu && menu.meta_description}
                    />
                </Helmet>

                {menu && (
                    <Fragment>
                        <Navigation/>
                        <Image>
                            <img src={menu.image} alt={menu.name}/>
                        </Image>
                        <Container>
                            <Heading text={menu.name}/>
                            <h5>{menu.price}$</h5>
                            <p>{menu.detail}</p>

                        </Container>
                        <Footer>
                            <Buttons>
                                <MenuButton onClick={() => {
                                    this.props.addToOrder(menu.id)
                                    this.setState({
                                        addModal: true
                                    })
                                }}>
                                    Add
                                </MenuButton>
                                <MenuButton onClick={() => {
                                    this.props.addToWishList(menu.id)
                                    this.setState({
                                        wishModal: true
                                    })
                                }}>
                                    WishList
                                </MenuButton>
                            </Buttons>
                        </Footer>
                    </Fragment>
                )}
                <ConfirmationModal isOpen={addModal} toggleModal={this.toggleModal(true)} text={"Menu added to order!"}/>
                <ConfirmationModal isOpen={wishModal} toggleModal={this.toggleModal(false)} text={"Menu added to wish list!"}/>

            </Wrapper>
        )
    }
}

const mapStateToProps = ({menus, layout}: ApplicationState) => (
    {
        loading: menus.loading,
        menus: menus.data,
        config: layout
    })

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchMenu: (payload: any) => dispatch(fetchMenusRequest(payload)),
    addToOrder: (payload: number) =>dispatch(addOrder(payload)),
    addToWishList: (payload: number) => dispatch(addWishList(payload))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuPage)


const Wrapper = styled('div')`
    h5 {
        text-align: right;
    }
`

const Image = styled('div')`
    width: 100%;
    height: 250px;
    overflow: hidden;
    
    img {
        width: 100%;
    }
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

const Footer = styled('div')`
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100px;
    background-color: ${props => props.theme.colors.background};
    box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.15);

`