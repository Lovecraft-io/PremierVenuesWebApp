import React, { Component } from 'react'
import AppDispatcher from '../../../Flux/Dispatchers/AppDispatcher'
import AppStore from '../../../Flux/Stores/AppStore'
import { Carousel } from '../../../Components/Carousel'
import EventForm from '../../../Components/EventForm'
import { VideoBackground } from './VideoBackground'
// import { Parallax, Background } from 'react-parallax';
import DestinationsMap from '../../Maps/DestinationsMap'
import _ from 'lodash'
import './home.css'
import '../pages.css'

export default class Home extends Component {
  constructor(props) {
    super(props)
  
  }
  componentWillMount() {
    window.Intercom("update")
  }
  componentDidUpdate(prevProps, prevState) {
    const { history } = this.props
    if (!prevProps.searchResults && this.props.searchResults) {
      history.push('/search/results')
    }
  }

  render() {
    const { venues, destinations } = AppStore.data 
    const {Home} = AppStore.data.pages
    let carousel = _.find(Home.modules, (mod) => mod.fields.type === 'Carousel')
    carousel = {...carousel.fields}
    console.log(carousel)
    return (
      <div id="Home" className="">
        <section className="page-section">
          <VideoBackground />
          <EventForm venues={venues} destinations={destinations} />
        </section>
        <section className="page-section">
          <Carousel slides={carousel.carouselSlides} />
        </section>
        <section className="page-section">
          <DestinationsMap />
        </section>
      </div>
    )
  }
}
