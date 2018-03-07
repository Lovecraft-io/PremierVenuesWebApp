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
    this.getPageData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.currentPage) {
      const { currentPage } = this.props
      console.log(currentPage)
      if (currentPage.pageHeader !== this.state.pageHeader) {
        const { modules, pageContent, pageHeader } = currentPage
        console.log(modules, pageContent, pageHeader)
        const {carouselMedia} = modules[0].fields
        this.setState({
          carouselMedia: carouselMedia,
          pageHeader: pageHeader,
          pageContent: pageContent
        })
      }
    }
  }

  getPageData() {
    AppDispatcher.dispatch({
      action: 'get-page-data',
      page_slug: 'Landing Page'
    })
  }

  render() {
    const { pageContent, pageHeader, carouselMedia } = this.state
    return (
        <div>  
          <section className="page-section">
            <EventForm />
          </section>
          <section className="page-section">
          <Carousel media={carouselMedia}/>
          </section>
        </div>
    )
  }
}
