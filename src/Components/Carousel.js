import React, {Component} from 'react'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from 'pure-react-carousel'
import {
  MorphIcon,
  CloseButton,
  NavButton,
  PlusButton,
} from 'react-svg-buttons'
import 'pure-react-carousel/dist/react-carousel.es.css'

class MorphButton extends Component {
  state = {
    type: this.props.type,
    defaultType: this.props.type
  }
  changeButton = () => {
    const _this = this
    const {defaultType} = this.state
    this.setState({type:"crossSparks"})
    setTimeout(() => {
      _this.setState({type:defaultType})
    }, 1000)
  }
  render = () => {
    const {type} = this.state
    console.log(type)
    return (
      <MorphIcon 
        type={type} 
        onClick={this.changeButton}
        size={80}
        thickness={2}
          color="#dd6e78"
      />
    )
  }
}

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
    <ButtonBack className="carousel-button"><MorphButton type="arrowLeft"/></ButtonBack>
    <ButtonNext className="carousel-button"><MorphButton type="arrowRight"/></ButtonNext>
  </CarouselProvider>
  )
}
 

