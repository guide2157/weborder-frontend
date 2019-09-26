import React from 'react';
import styled from "../utils/styled";
import Heading from "../components/Heading";
import Navigation from "../components/layout/Navigation";
import {Container} from "reactstrap";


const About = () => {
    return (
        <Wrapper>
            <Navigation override={-1}/>
            <Container>
                <Heading text={'About us'} underline={true}/>
                <p>
                    This web page is a personal project developed by guide2157. It is developed by React.js with a
                    backend system developed by Django.
                </p>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled('div')`
`

export default About;