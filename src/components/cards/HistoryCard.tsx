import React from 'react';
import styled from "../../utils/styled";
import {Col, Collapse, Row} from "reactstrap";
import {ApplicationState, ConnectedReduxProps} from "../../store";
import {connect} from "react-redux";
import {Menu} from "../../store/menus/types";
import moment from 'moment';

type Props = {
    time: any
    order: any
}

type PropsFromState = {
    menus: Menu[] | undefined
}

type State = {
    open: boolean
}


type AllProps = Props & ConnectedReduxProps & PropsFromState


class HistoryCard extends React.Component<AllProps, State> {
    state = {
        open: false
    }

    toggleCollapse = () => {
        this.setState(prevState => ({
            open: !prevState.open
        }))
    }

    render() {
        const {menus, order, time} = this.props
        const {open} = this.state
        console.log(order)
        console.log(Object.keys(order).length)
        return (
            <Wrapper>
                <ShortInfo onClick={this.toggleCollapse}>
                    <span>
                        {moment.unix(time).format('h:mm:ss a')}
                    </span>
                    <span>
                        {Object.keys(order).length - 1}
                        {' '}
                        {Object.keys(order).length > 1 ? 'dishes' : 'dish'}
                    </span>
                </ShortInfo>
                <Collapse isOpen={open}>
                    <Inside>
                    <span>
                        {'ref: '}
                        {order['ref_code']}
                    </span>
                        {menus && menus.map(menu => {

                            if (order[menu.id]) {
                                return (
                                    <Row key={menu.id} >
                                        <MenuName xs="6" sm="7">
                        <span>
                            {menu.name}
                        </span>
                                        </MenuName>
                                        <MenuPrice xs="2" sm="2">
                        <span>
                            {order[menu.id]}
                        </span>
                                        </MenuPrice>
                                    </Row>
                                )
                            }
                        })}
                    </Inside>
                </Collapse>

            </Wrapper>
        )
    }
}


const mapStateToProps = ({menus}: ApplicationState) => ({
    menus: menus.data
})


export default connect(
    mapStateToProps
)(HistoryCard)


const Wrapper = styled('div')`
    row {
        margin-top: 1rem;
    }
    
    .collapse, .collapsing{
        border-radius: 0 0 10px 10px;
        background-color:${props => props.theme.colors.footerBg};
    }
    
`

const Inside = styled('div')`
   span {
        display: block;
        padding-top: 1rem;
        margin-left: 1rem;
    }
    
    padding-bottom: 1rem;

`

const ShortInfo = styled('div')`
    width: 100%;
    padding: 1rem;
    border-radius: 10px;
    border: 1px solid ${props => props.theme.colors.paleGray};
    
    span {
        margin-right: 1rem;
    }
    
    &:hover {
        cursor: pointer;
    }
`

const MenuName = styled(Col)`
   display: table;
   height: -webkit-fill-available;
`

const MenuPrice = styled(Col)`
   &:focus,
    &:hover {
   
      color: ${props => props.theme.colors.black};
  }
  display: table;
  height: -webkit-fill-available;
`
