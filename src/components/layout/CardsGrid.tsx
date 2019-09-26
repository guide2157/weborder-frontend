import React, {Fragment} from 'react'
import {Row} from "reactstrap";
import styled from "../../utils/styled";

type Props = {
    heading? : string
    children: React.ReactNode
}

export default class CardsGrid extends React.Component<Props> {

    render () {
        const {heading, children} = this.props
        return (
            <Wrapper>
            <Fragment>
                {heading && (
                    <h2>
                        {heading}
                    </h2>
                )}
                <Row >
                    {children}
                </Row>
            </Fragment>
            </Wrapper>
        )
    }
}
const Wrapper = styled('div')`
    margin-top: 1rem;
   
`