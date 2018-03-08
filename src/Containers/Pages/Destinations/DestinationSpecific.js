import React, { Component } from 'react'
import AppDispatcher from '../../../Flux/Dispatchers/AppDispatcher'
import _ from 'lodash'
import './destination.css'

export default class DestinationSpecific extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentWillMount() {
    console.log(this.props)
    const {destination} = this.props.match.params
    this.getDestinationData(destination)
  }

  componentDidUpdate(prevProps, prevState) {
    if(!prevProps.currentDestination && this.props.currentDestination) {
      this.setState({...this.props.currentDestination})
    }
  }
  componentDidMount() {
    console.log(this.props)
    let ticking = false
    let isFirefox = /Firefox/i.test(navigator.userAgent)
    let isIe =
      /MSIE/i.test(navigator.userAgent) ||
      /Trident.*rv\:11\./i.test(navigator.userAgent)
    let scrollSensitivitySetting = 30 //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive)
    let slideDurationSetting = 600 //Amount of time for which slide is "locked"
    let currentSlideNumber = 0
    let slideNumber = document.querySelectorAll('.destination_background').length
    console.log(totalSlideNumber)
    this.setState({
      totalSlideNumber: slideNumber
    })
    const {totalSlideNumber} = this.state
    if(totalSlideNumber) {
      this.parallax(isFirefox, totalSlideNumber, ticking, isIe, scrollSensitivitySetting, slideDurationSetting, currentSlideNumber)
    }

    
   
  }
  parallax(isFirefox, totalSlideNumber, ticking, isIe, scrollSensitivitySetting, slideDurationSetting, currentSlideNumber) {
    const parallaxScroll = (evt) => {
      let delta 
      if (isFirefox) {
        //Set delta for Firefox
        delta = evt.detail * -120
      } else if (isIe) {
        //Set delta for IE
        delta = -evt.deltaY
      } else {
        //Set delta for all other browsers
        delta = evt.wheelDelta
      }

      if (ticking != true) {
        if (delta <= -scrollSensitivitySetting) {
          //Down scroll
          ticking = true
          if (currentSlideNumber !== totalSlideNumber - 1) {
            currentSlideNumber++
            nextItem()
          }
          slideDurationTimeout(slideDurationSetting)
        }
        if (delta >= scrollSensitivitySetting) {
          //Up scroll
          ticking = true
          if (currentSlideNumber !== 0) {
            currentSlideNumber--
          }
          previousItem()
          slideDurationTimeout(slideDurationSetting)
        }
      }
    }

    // ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
    const slideDurationTimeout = (slideDuration) => {
      setTimeout(() => {
        ticking = false
      }, slideDuration)
    }

    // ------------- ADD EVENT LISTENER ------------- //
    let mousewheelEvent = isFirefox ? 'DOMMouseScroll' : 'wheel'
    window.addEventListener(
      mousewheelEvent,
      _.throttle(parallaxScroll, 60),
      false
    )

    // ------------- SLIDE MOTION ------------- //
    const nextItem = () => {
      let $previousSlide = document.querySelectorAll('.destination_background')[currentSlideNumber - 1]
      $previousSlide.classList.remove('up-scroll')
      $previousSlide.classList.add('down-scroll')
    }

    const previousItem = () => {
      let $currentSlide = document.querySelectorAll('.destination_background')[currentSlideNumber]
      $currentSlide.classList.remove('down-scroll')
      $currentSlide.classLis.add('up-scroll')
    }
  }
  getDestinationData(destination) {
    AppDispatcher.dispatch({
      action: 'get-destination-data',
      destination: destination
    })
  }

  render() {
    return (
      <div id="DestinationSpecific">
        <div className="destination_container">
          <section className="destination_background">
            <div className="destination_content-wrapper">
              <p className="destination_content-title">
                
              </p>
              <p className="destination_content-subtitle">
                
              </p>
            </div>
          </section>
          <section className="destination_background">
            <div className="destination_content-wrapper">
              <p className="destination_content-title">
                
              </p>
              <p className="destination_content-subtitle">
             
              </p>
            </div>
          </section>
          <section className="destination_background">
            <div className="destination_content-wrapper">
              <p className="destination_content-title">
                Etiam consequat lectus.
              </p>
              <p className="destination_content-subtitle">
                Nullam tristique urna sed tellus ornare congue. Etiam vitae erat
                at nibh aliquam dapibus.
              </p>
            </div>
          </section>
        </div>
      </div>
    )
  }
}
