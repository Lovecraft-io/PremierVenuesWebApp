import React from 'react'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

export const Carousel = props => {
  console.log(props)
  return (
    <CarouselProvider
    naturalSlideWidth={100}
    naturalSlideHeight={125}
    totalSlides={props.media ? props.media.length : 0}>
    <Slider>
      {props.media ? props.media.map((item, i) => (
        <Slide index={i}><img src={item.fields.file.url} alt=""/></Slide>
      )) : null}
    </Slider>
    <ButtonBack>Back</ButtonBack>
    <ButtonNext>Next</ButtonNext>
  </CarouselProvider>
  )
}
 

