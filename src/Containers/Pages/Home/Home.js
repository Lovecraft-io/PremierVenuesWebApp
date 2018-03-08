import React, { Component } from 'react'
import AppDispatcher from '../../../Flux/Dispatchers/AppDispatcher'
import { Carousel } from '../../../Components/Carousel'
import EventForm from '../../../Components/EventForm'
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
    // this.getPageData()
    const {Home} = this.props.pages
    const { modules, pageContent, pageHeader } = Home
    const {carouselMedia} = modules[0].fields
    this.setState({
      carouselMedia: carouselMedia,
      pageHeader: pageHeader,
      pageContent: pageContent
    })
  }

  render() {
    const { pageContent, pageHeader, carouselMedia } = this.state
    const {venues, destinations} = this.props
    return (
        <div>  
          <section className="page-section">
            <EventForm venues={venues} destinations={destinations} />
          </section>
          <section className="page-section">
          <Carousel media={carouselMedia}/>
          </section>
        </div>
    )
  }
}
