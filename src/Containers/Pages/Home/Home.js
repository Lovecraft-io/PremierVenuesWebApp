import React, { Component } from 'react'
import AppDispatcher from '../../../Flux/Dispatchers/AppDispatcher'
import AppStore from '../../../Flux/Stores/AppStore'
import { Carousel } from '../../../Components/Carousel'
import EventForm from '../../../Components/EventForm'
import { VideoBackground } from './VideoBackground'
import { Link } from 'react-router-dom'
import { CONSTANTS } from '../../../constants'
import DestinationsMap from '../../Maps/DestinationsMap'
import _ from 'lodash'
import './home.css'
import '../pages.css'

export default class Home extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {}
  componentDidUpdate(prevProps, prevState) {
    const { history } = this.props
    if (!prevProps.searchResults && this.props.searchResults) {
      history.push('/search/results')
    }
  }
  greetReturningUser() {
    const { currentUser } = AppStore.data
    return currentUser && currentUser.loggedIn
      ? window.Intercom('showMessages')
      : false
  }

  render() {
    const { venues, destinations } = AppStore.data
    const { Home } = AppStore.data.pages
    const {blogPosts} = Home
    const carousel = _.find(Home.sections, (section) => section.fields.type === 'Carousel')
    console.log(Home)
    console.log(carousel)
    const {carouselSlides} = carousel.fields
    // const carouselSection = {...Home.sections.find(section => section.fields.type  === 'Carousel').fields}
    // const {carouselSlides} = carouselSection.children[0].fields
    // let blogPosts = [] 
    // Home.sections.forEach((section) => section.fields.type === 'Blog Posts' ? section.fields.children.forEach((childArray) => blogPosts = blogPosts.concat(childArray)) : false)

    return (
      <div id="Home" className="">
        <section className="page-section">
          <VideoBackground />
          <EventForm venues={venues} destinations={destinations} />
        </section>
        <section className="page-section">
          <Carousel slides={carouselSlides} />
        </section>
        <section className="page-section">
          <DestinationsMap />
        </section>
        <section className="page-section">
          <div className="blog-section">
            {blogPosts.map(post => (
              <div
                className="home-card"
                style={{
                  backgroundImage: `url(${post.blogPostFeaturedImage[0].fields.file.url})`}}>
                <div className="title-content">
                  <h3>
                    <Link to={'blog/' + post.blogPostTitle}>
                      {post.blogPostTitle}
                    </Link>
                  </h3>
                  <hr />
                  <div className="intro" />
                </div>
                <div className="card-info">
                  {CONSTANTS.trim(post.blogPostContent)}
                </div>
                <div className="gradient-overlay" />
                <div className="color-overlay" />
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  }
}
