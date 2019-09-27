import React from 'react'
import styled from "../../utils/styled";

type Props = {
    text: string
    image: string
}

type bgprops = {
    src: string
}

export default class Banner extends React.Component<Props> {
    render(){
        const {image, text} = this.props
        return (
            <Wrapper src={image}>
                <h3>{text}</h3>
            </Wrapper>
        );
    }
}

const Wrapper = styled('div')  `
    height: 300px;
    width: 100wh;
    background-image: linear-gradient(rgb(0,0,0,0.7), rgb(0,0,0,0.7)), url(${(props : bgprops) => props.src});
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    
    @media(max-width: 767px) {
        height: 200px;
    }
    
    h3 {
        padding-top: 6rem;
        color: ${props => props.theme.colors.white};
        text-align: center;
    }
`