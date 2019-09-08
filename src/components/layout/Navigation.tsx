import React from 'react'
// import { connect } from 'react-redux'
// import { Dispatch } from 'redux'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap'
import styled from '../../utils/styled'
import classnames from 'classnames'
// import LanguagePicker from '../../containers/LanguagePicker'
import {isMobile} from 'react-device-detect'
import {Global} from "@emotion/core";

interface PropsFromState {
    loading?: boolean
    errors?: string
}

type State = {
    isOpen: boolean
    heightSet: number
}

type Props = {
    override?: number
}

type NavigationProps = {
    bg?: string
    fg?: string
}

type AllProps = PropsFromState & NavigationProps & Props

class Navigation extends React.Component<AllProps, State> {
    state = {
        isOpen: false,
        heightSet: 0,
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    render() {
        const {heightSet, isOpen} = this.state
        const override = this.props.override || 60


        return (
            <div>
                <Wrapper>
                    <Navbar
                        fixed="top"
                        dark
                        expand="md"
                        className={classnames(
                            { active: heightSet > override },
                            { mobilenav: isOpen },
                            { 'is-mobile': isMobile }
                        )}
                    >
                        <PlaceHolder>
                        <NavbarToggler onClick={this.toggle}>

                            {!isOpen ? <span>Open</span>: <span>Close</span>}

                        </NavbarToggler>
                        </PlaceHolder>
                        {isOpen &&
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className="ml-auto" navbar>

                                <NavItem className="mobile-nav-item">
                                    <NavLink className="nav-link" href="">
                                        Orders
                                    </NavLink>
                                </NavItem>

                                <NavItem className="mobile-nav-item ">
                                    <NavLink className="nav-link" href="/wishlist">
                                        WishList
                                    </NavLink>
                                </NavItem>

                                <NavItem className="mobile-nav-item ">
                                    <NavLink className="nav-link" href="/about">
                                        About
                                    </NavLink>
                                </NavItem>

                            </Nav>
                        </Collapse>
                        }

                        {isMobile && (
                            <Global
                                styles={{
                                    body: {
                                        overflow: 'hidden'
                                    }
                                }}
                            />
                        )}

                    </Navbar>
                </Wrapper>
            </div>
        );
    }

}

export default Navigation

const Wrapper = styled('header')`
  nav {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    position: relative;
    height: 4rem;
    z-index: 1000;
  }
  background-color: ${props=> props.theme.colors.paleGray};
  font-family: ${props => props.theme.fonts.headings};
  
  
  .fixed-top {
    // background-color: ${(props: NavigationProps) => props.bg};
    // color: ${(props: NavigationProps) => props.fg};
  }

  .active.navbar {
    box-shadow: 0px 1px 10px 6px rgba(0, 0, 0, 0.15);
  }
  
  .navbar-toggler {
    cursor: pointer;
    float:right;
  }
  
  .navbar-collapse {
    position: absolute;
    background-color: ${props=> props.theme.colors.white};
    top: 4rem;
    left: 0;
    height: 100vh;
    width: 100vw;
  }

  
  .mobile-nav-item {
    height: fit-content;
    padding: 1.5rem;
    border-bottom: 1px solid ${props => props.theme.colors.darkGray};
  }
  
  .mobile-nav-item a {
    text-decoration: none;
    color: ${props => props.theme.colors.paleGray} !important;
    cursor: pointer;
  }
  
`

const PlaceHolder = styled('div')`
    width: 100%;
`