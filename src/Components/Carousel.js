import React, { Component } from 'react'
import OwlCarousel from 'react-owl-carousel2'
import ReactMarkdown from 'react-markdown'
import './owlCarousel.css'



export const Carousel = props => {
  console.log(props)
  const options = {
    items: 1,
    nav: true,
    loop: true,
    navText : ['<i aria-hidden="true" class="carousel-arrow angle left icon"></i>', '<i aria-hidden="true" class="carousel-arrow angle right icon"></i>'],
    autoplay: true
};

const events = {
    onDragged: (event) => {
      
    },
    onChanged: (event) => {
      
    }
};

  return (
    <OwlCarousel options={options} events={events}>
      {props.slides
        ? props.slides.map((slide, i) => 
          <div className="slide">
            <div className="slide_content">
            <h3>{slide.fields.slideHeader}</h3>
            <ReactMarkdown source={slide.fields.slideContent} className="slide_text"/>
            </div>
            <img src={slide.fields.slideImage.fields.file.url + '?fit=fill&w=1440&h=600'} />
          </div>)
        : null}
    </OwlCarousel>
  )
}
