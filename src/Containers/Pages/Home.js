import React, { Component } from 'react'
import { Container, Header } from 'semantic-ui-react'
import AppDispatcher from '../../Flux/Dispatchers/AppDispatcher'
import { Carousel } from '../../Components/Carousel'

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
  // componentDidMount() {
  //   const {currentPage} = this.props
  //   if(currentPage) {
  //     const {modules, pageContent, pageHeader} = currentPage
  //     console.log(modules, pageContent, pageHeader)
  //     const carouselMedia = modules[0].fields
  //     this.setState({
  //       carouselMedia:carouselMedia,
  //       pageHeader:pageHeader,
  //       pageContent:pageContent
  //     })
  //   }
  // }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.currentPage) {
      const { currentPage } = this.props
      console.log(currentPage)
      if (currentPage.fields.pageHeader !== this.state.pageHeader) {
        const { modules, pageContent, pageHeader } = currentPage.fields
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
      <div text>
        <Header as="h2">{pageHeader}</Header>
        <Carousel media={carouselMedia}/>
      </div>
    )
  }
}
