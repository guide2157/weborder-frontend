import React from 'react'
import Slider from 'react-slick'
// import styled from '../../utils/styled'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {Container} from "reactstrap";

type Props = {
    children: React.ReactNode
    slides?: number
    slideToIndex?: number
}


const CardsCarousel = (props : Props) => {

        const {children, slides, slideToIndex} = props
        const settings = {
            dots: false,
            centerPadding: '25%',
            infinite: true,
            speed: 500,
            slidesToShow: slides || 6,
            slidesToScroll: 1,
            slickNext: true,
            initialSlide: slideToIndex
        }

        return (
            <Slider {...settings}>
                <Container> {children}</Container>
            </Slider>
        )
}

export default CardsCarousel