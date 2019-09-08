import React from 'react'
import styled from "../utils/styled";

type Props = {
    text: string,
    underline?: boolean
}

type WrapperProp = {
    underline? : boolean
}

export default class Heading extends React.Component<Props> {

    render () {
        return (
            <Wrapper underline={this.props.underline}>
                <h3>
                    {this.props.text}
                </h3>
            </Wrapper>
        )

    }

}

const Wrapper =styled('div')`
    margin-top: 1rem;
    
    h3 {
        text-align: center;
    }
     
     h3: after {
        display: ${(props: WrapperProp) => props.underline ? 'block' : 'none'};
        content:"";
        border-bottom: 1px solid #000;
        width: 5rem;
        margin: 1rem auto;
        
     }

`