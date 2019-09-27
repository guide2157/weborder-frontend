import React from 'react'
import Slider from 'react-slick'
// import styled from '../../utils/styled'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styled from "../../utils/styled";

type Props = {
    children: React.ReactNode
    slides?: number
    slideToIndex?: number
}


const CardsCarousel = (props : Props) => {

        const {children, slides} = props
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: slides || 2,
            slidesToScroll: 1,
            slickNext: true
        }

        return (
            <Wrapper>
            <Slider {...settings}>
                {children}
            </Slider>
            </Wrapper>
        )
}

export default CardsCarousel

const Wrapper = styled('div')`
    .slick-prev:before, .slick-next:before {
        color: ${props => props.theme.colors.black};
    }
    
    .slick-next {
        right: -10px;
    }
    
    .slick-prev {
        left: -10px;
    }
`