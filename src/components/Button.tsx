import React from 'react'
import styled from "../utils/styled";
import {Button} from "reactstrap";

type Props = {
    children: React.ReactNode
    outline?: boolean
    color?: string
    onClick?: any
}

class MenuButton extends React.Component<Props> {
    render() {
        const { children, outline, color, onClick } = this.props
        return (
            <Btn outline={outline} color={color} onClick={onClick}>
            {children}
            </Btn>
    )
    }
}

export default MenuButton

const Btn = styled(Button)`
  padding: 1rem 2.5rem;
  font-family: ${props => props.theme.fonts.headings};
  font-size: 14px;
  display: block;
  margin: 1.5rem auto;
  cursor: pointer;
  border-radius: 30px;
  background: ${props => props.theme.colors.primaryColor};
  border-color: ${props => props.theme.colors.primaryColor};
  &:focus {
    background: ${props => props.theme.colors.primaryDarkColor};
    border-color: ${props => props.theme.colors.primaryDarkColor};
  }
  &.btn-outline-secondary {
    background: ${props => props.theme.colors.white};
    border-color: ${props => props.theme.colors.primaryColor};
    color: ${props => props.theme.colors.primaryColor};
  }
`