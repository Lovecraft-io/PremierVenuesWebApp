import React, { Component } from 'react'
import OwlCarousel from 'react-owl-carousel2'
import './owlCarousel.css'
import {
  MorphIcon,
  CloseButton,
  NavButton,
  PlusButton
} from 'react-svg-buttons'

class MorphButton extends Component {
  state = {
    type: this.props.type,
    defaultType: this.props.type
  }
  changeButton = () => {
    const _this = this
    const { defaultType } = this.state
    this.setState({ type: 'crossSparks' })
    setTimeout(() => {
      _this.setState({ type: defaultType })
    }, 1000)
  }
  render = () => {
    const { type } = this.state
    console.log(type)
    return (
      <MorphIcon
        type={type}
        onClick={this.changeButton}
        size={40}
        thickness={2}
        color="#dd6e78"
      />
    )
  }
}
{
  /*  */
}
{
  /*  */
}
export const Carousel = props => {
  console.log(props)
  const options = {
    items: 1,
    nav: true,
    loop: true,
    navText : [`${<MorphButton type="arrowLeft" />}`,`${<MorphButton type="arrowRight" />}`],
    autoplay: true
};

const events = {
    onDragged: (event) => {
      console.log(event)
    },
    onChanged: (event) => {
      console.log(event)
    }
};

  return (
    <OwlCarousel options={options} events={events}>
      {props.media
        ? props.media.map((item, i) => <img src={item.fields.file.url} />)
        : null}
    </OwlCarousel>
  )
}
