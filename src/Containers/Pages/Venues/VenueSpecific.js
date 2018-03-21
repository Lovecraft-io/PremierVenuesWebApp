import React, { Component } from 'react'
import AppDispatcher from '../../../Flux/Dispatchers/AppDispatcher'
import AppStore from '../../../Flux/Stores/AppStore'
import VenueMap from '../../Maps/VenueMap'
import { BlogPostPreview } from '../Blog/BlogPostPreview'
import VenuePro from './VenuePro'
import ReactMarkdown from 'react-markdown'
import _ from 'lodash'
import './venue.css'

export default class VenueSpecific extends Component {
  constructor() {
    super()
    this.state = {}
  }
  componentWillMount() {
    console.log(this.props)
    const { venueName } = this.props.match.params
    console.log(venueName)
    this.getVenueData(venueName)
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps)
    console.log(this.props)
  }

  getVenueData(venue) {
    AppDispatcher.dispatch({
      action: 'get-venue-data',
      venue: venue
    })
  }

  render() {
    const { data } = AppStore
    const { currentVenue } = data
    console.log(currentVenue)
    const { currentUser } = data
    const VenueStandard = props => (
      <div className="section3 venue_standard section_background__full">
        <div className="section3 venue_standard section_background__full__left" />
        <div className="section3 venue_standard section_background__full__right" />
        <div className="section3 venue_standard section_background__inner">
          <div className="section3 venue_standard section_background__inner_content">
            <div
              className="section3 venue_standard venue_floating_card"
              style={{
                backgroundImage: `url(${props.currentVenue
                  ? props.currentVenue.featuredImage.fields.file.url
                  : null})`
              }}>
              >
              <div className="section3 venue_standard venue_floating_card__inner">
                <h2>{props.currentVenue ? props.currentVenue.venueTitle : null}</h2>
              </div>
            </div>
            <div className="section3 venue_standard section_background__inner__text">
              <div className="venueRelatedNews">
                {props.currentVenue.blogPosts
                  ? props.currentVenue.blogPosts.map(
                      post =>
                        post.fields &&
                        post.fields.blogPostFeaturedImage &&
                        post.fields.blogPostFeaturedImage.length > 0 ? (
                          <BlogPostPreview blogPost={post} />
                        ) : null
                    )
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    )

    const ToggleVenuePro = () =>
      currentUser ? (
        <VenuePro currentUser={currentUser} currentVenue={currentVenue} />
      ) : (
        <VenueStandard currentVenue={currentVenue} />
      )

    return (
      <div id="VenueSpecific">
        <div className="page-section">
          <div className="section_background__full">
            <div className="section_background__full__left" />
            <div className="section_background__full__right" />
            <div className="section_background__inner">
              <div className="section_background__inner_content">
                <div
                  className="venue_floating_card"
                  style={{
                    backgroundImage: `url(${currentVenue
                      ? currentVenue.featuredImage.fields.file.url
                      : null})`
                  }}>
                  >
                  <div className="venue_floating_card__inner">
                    <h2>{currentVenue ? currentVenue.venueTitle : null}</h2>
                  </div>
                </div>
                <div className="section_background__inner__text">
                  <p>{currentVenue.venueFeatures}</p>
                  <p>{currentVenue.venueDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section2 page-section">
          <div className="section2 section_background__full">
            <div className="section2 section_background__full__left" />
            <div className="section2 section_background__full__right" />
            <div className="section2 section_background__inner">
              <div className="section2 section_background__inner_content">
                <div className="section2 venue_floating_map_card">
                  <VenueMap venue={currentVenue} />
                </div>
                <div className="section2 section_background__inner__text">
                  <h2>Become a Premium Member!</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section3 page-section">
          {ToggleVenuePro()}
        </div>
      </div>
    )
  }
}
