import React, {Fragment} from 'react'
import styled from "../utils/styled";
import {ApplicationState, ConnectedReduxProps} from "../store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {Container} from "reactstrap";
import Heading from "../components/Heading";
// @ts-ignore
import Helmet from 'react-helmet'
import {fetchMenusRequest} from "../store/menus/actions";
import {Menu} from "../store/menus/types";


type PropsFromState = {
    loading: boolean
    config: any
    menu: Menu | undefined
}

type RouteParams = {
    id: any
}

type PropsFromDispatch = {
    fetchMenu: typeof fetchMenusRequest
}

type AllProps = PropsFromState &
    PropsFromDispatch &
    ConnectedReduxProps &
    RouteParams

class MenuPage extends React.Component<AllProps, {}> {

    render() {

        const {menu} = this.props
        return (
            <Wrapper>

                <Helmet>
                    <title>{menu  && menu.meta_title}</title>
        <meta
        name="description"
        content={menu  && menu.meta_description}
        />
        </Helmet>

        {menu && (
            <Fragment>
            <Container>
                <img ref={menu.image} alt={menu.name}/>
                <Heading text={menu.name}/>
                <p>{menu.price}</p>
        <p>{menu.detail}</p>

        </Container>
            </Fragment>
        )}


        </Wrapper>
    )
    }
}

const mapStateToProps = ({menus, layout}: ApplicationState, {id}: RouteParams) => ({
    loading: menus.loading,
    menu: menus.data[id],
    config: layout,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchMenu: (payload: any) => dispatch(fetchMenusRequest(payload))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuPage)


const Wrapper = styled('div')`

`