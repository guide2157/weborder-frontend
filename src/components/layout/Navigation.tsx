import React from 'react'
// import { connect } from 'react-redux'
// import { Dispatch } from 'redux'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
} from 'reactstrap'
import styled from '../../utils/styled'
import classnames from 'classnames'
import {isMobile} from 'react-device-detect'
import {Global} from "@emotion/core";
import {Link} from "react-router-dom";
import {FiMenu, IoIosCloseCircleOutline} from "../Icons";

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

    updateDimensions = () => {
        this.setState({
            heightSet: window.scrollY
        })
    }

    componentDidMount() {
        this.updateDimensions()
        window.addEventListener('scroll', this.updateDimensions)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.updateDimensions)
    }

    render() {
        const {heightSet, isOpen} = this.state
        const override = this.props.override || 60


        return (
            <div>
                <Wrapper className={classnames({'sticky': heightSet > override})}>
                    <Navbar
                        fixed="top"
                        dark
                        expand="md"
                        className={classnames(
                            {active: heightSet > override},
                            {'mobilenav': isOpen},
                            {'is-mobile': isMobile}
                        )}
                    >
                        <PlaceHolder>
                            <NavbarToggler className={isOpen ? 'expanded' : ''} onClick={this.toggle}>
                                {!isOpen ? <FiMenu/> : <IoIosCloseCircleOutline/>}
                            </NavbarToggler>
                        </PlaceHolder>
                        {isOpen &&
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className="ml-auto" navbar>

                                <NavItem className="mobile-nav-item">
                                    <Link className="nav-link" to="">
                                        Menus
                                    </Link>
                                </NavItem>

                                <NavItem className="mobile-nav-item">
                                    <Link className="nav-link" to="/orders">
                                        Orders
                                    </Link>
                                </NavItem>

                                <NavItem className="mobile-nav-item">
                                    <Link className="nav-link" to="/wishlist">
                                        WishList
                                    </Link>
                                </NavItem>

                                <NavItem className="mobile-nav-item ">
                                    <Link className="nav-link" to="/restaurant">
                                        Our Restaurant
                                    </Link>
                                </NavItem>

                                <NavItem className="mobile-nav-item ">
                                    <Link className="nav-link" to="/history">
                                        Order Log
                                    </Link>
                                </NavItem>

                                <NavItem className="mobile-nav-item ">
                                    <Link className="nav-link" to="/about">
                                        The App
                                    </Link>
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

   &.sticky {
      height: 64px;
   }
  
  nav {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    height: 4rem;
    z-index: 1000;
  }


  .active.navbar {
    box-shadow: 0px 1px 10px 6px rgba(0, 0, 0, 0.15);
  }
  
  .navbar-toggler {
    cursor: pointer;
    float:right;
  }
  
  .navbar-toggler.expanded svg{
    color: ${props => props.theme.colors.paleGray} !important;
  }
  
  .navbar-collapse {
    position: absolute;
    background-color: ${props => props.theme.colors.white};
    top: 4rem;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 100;
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
  
  .mobilenav {
    background-color: ${props => props.theme.colors.white} !important;
    border-bottom: 1px solid ${props => props.theme.colors.darkGray};
  }
  
  .navbar-toggler svg {
    color: ${props => props.theme.colors.white};
  }
  
  .active {
    box-shadow: 0px 1px 10px 6px rgba(0, 0, 0, 0.15);
    background-color: ${props => props.theme.colors.white} !important;
  }
  
  .active svg {
    color: ${props => props.theme.colors.paleGray} !important;
  }
  
`

const PlaceHolder = styled('div')`
    width: 100%;
`