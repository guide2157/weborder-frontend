import React from 'react';
import styled from "../../utils/styled";
import {Menu} from "../../store/menus/types";
import {ApplicationState, ConnectedReduxProps} from "../../store";
import {connect} from "react-redux";
import { Col, Row} from "reactstrap";
import {FaMinus, FaPlus} from "../Icons";

type Props = {
    menu: Menu
    quantity: number
    addOrder:any
    removeOrder:any
}


type AllProps = Props& ConnectedReduxProps

type State = {
    amount: number
}

class OrderCard extends React.Component<AllProps, State> {
    state = {
        amount: this.props.quantity
    }

    render() {
        const {menu} = this.props
        const {name, price} = menu
        const {amount} = this.state
        return (
            <Wrapper sm={12}>
                <Row>
                    <MenuName xs="5" sm="6">
                        <span>
                            {name}
                        </span>
                    </MenuName>
                    <MenuPrice xs="2" sm="2">
                        <span>
                        {price}$
                        </span>
                    </MenuPrice>
                    <MenuButton xs="4" sm="3">
                        <div>
                        <FaPlus onClick={() => {
                            this.setState(prevState => ({amount: prevState.amount + 1}))
                            this.props.addOrder(menu.id)
                        }}/>
                        <span>
                            {amount}
                        </span>
                        <FaMinus onClick={() => {
                            this.setState(prevState => ({amount: prevState.amount - 1}))
                            this.props.removeOrder(menu.id)
                        }}/>
                        </div>
                    </MenuButton>
                </Row>

            </Wrapper>
        )
    }
}

const mapStateToProps = ({layout}: ApplicationState) => ({
    config: layout,
})



export default connect(
    mapStateToProps
)(OrderCard)


const Wrapper = styled(Col)`
    border: 1px solid ${props => props.theme.colors.borders};
    border-radius: 10px;
    height: 3rem;
    color: ${props => props.theme.colors.primaryColor};
    
    span {
        display: table-cell;
        vertical-align: middle;
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

const MenuButton = styled(Col)`
    font-size: 1rem;
    div {
        margin: 10% auto;
        width: fit-content;
    }
    span {
        display: inline-block;
        margin: 0 15px;
    }
`