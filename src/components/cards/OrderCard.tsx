import React from 'react';
import styled from "../../utils/styled";
import {Menu} from "../../store/menus/types";
import {removeOrder} from "../../store/menus/actions";
import {ApplicationState, ConnectedReduxProps} from "../../store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {Button, Col, Row} from "reactstrap";

type Props = {
    menu: Menu
}

type PropsFromDispatch = {
    removeFromOrder: typeof removeOrder
}

type AllProps = Props & PropsFromDispatch & ConnectedReduxProps

type State = {}

class OrderCard extends React.Component<AllProps, State> {
    render() {
        const {menu} = this.props
        const {name, price} = menu
        return (
            <Wrapper sm={12}>
                <Row>
                    <MenuName xs="5" sm="5">
                        <span>
                            {name}
                        </span>
                    </MenuName>
                    <MenuPrice xs="2" sm="2">
                        <span>
                        {price}$
                        </span>
                    </MenuPrice>
                    <MenuButton xs="5" sm="5">
                        <Button>
                            Add
                        </Button>
                        <span>

                        </span>
                        <Button>
                            Remove
                        </Button>
                    </MenuButton>
                </Row>

            </Wrapper>
        )
    }
}

const mapStateToProps = ({layout}: ApplicationState) => ({
    config: layout,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    removeFromOrder: (payload: any) => dispatch(removeOrder(payload))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
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
    font-size: 0.5rem;
    .btn {
        margin: 0 10px;
    }

    .btn: first-of-type {
        margin-left: 0;
    }
    
    .byn: last-of-type {
        margin-right: 0;
    }
`