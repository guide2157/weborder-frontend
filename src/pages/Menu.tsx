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
import {RouteComponentProps} from "react-router";
import Navigation from "../components/layout/Navigation";


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
}

type AllProps = PropsFromState &
    PropsFromDispatch &
    ConnectedReduxProps &
    RouteComponentProps<RouteParams>

class MenuPage extends React.Component<AllProps, {}> {

    componentDidMount(): void {
        this.props.fetchMenu()
    }

    render() {
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
                    </Fragment>
                )}


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
    fetchMenu: (payload: any) => dispatch(fetchMenusRequest(payload))
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