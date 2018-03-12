import React, { Component } from 'react'
import AppDispatcher from '../../../Flux/Dispatchers/AppDispatcher'
import { Carousel } from '../../../Components/Carousel'
import EventForm from '../../../Components/EventForm'
import { VideoBackground } from './VideoBackground'
import DestinationsMap from '../../Maps/DestinationsMap'
import './home.css'
import '../pages.css'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      carouselMedia: [],
      pageHeader: '',
      pageContent: ''
    }
  }
  componentWillMount() {
    const { Home } = this.props.pages
    const { modules, pageContent, pageHeader } = Home
    const { carouselMedia } = modules[0].fields
    this.setState({
      carouselMedia: carouselMedia,
      pageHeader: pageHeader,
      pageContent: pageContent
    })
    window.Intercom("update")
  }
  componentDidUpdate(prevProps, prevState) {
    const { history } = this.props
    if (!prevProps.searchResults && this.props.searchResults) {
      history.push('/search/results')
    }
  }

  render() {
    const { pageContent, pageHeader, carouselMedia } = this.state
    const { venues, destinations } = this.props
    return (
      <div id="Home" className="">
        <section className="page-section">
          <VideoBackground />
          <EventForm venues={venues} destinations={destinations} />
        </section>
        <section className="page-section">
          <Carousel media={carouselMedia} />
        </section>
        <section className="page-section">
          <DestinationsMap />
        </section>
      </div>
    )
  }
}
