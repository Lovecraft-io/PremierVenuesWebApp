import React, { Component } from 'react'
import AppDispatcher from '../../../Flux/Dispatchers/AppDispatcher'
import AppStore from '../../../Flux/Stores/AppStore'
import VenueMap from '../../Maps/VenueMap'
import { BlogPostPreview } from '../Blog/BlogPostPreview'
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
  // shouldComponentUpdate(nextProps, nextState) {
  //   if(this.props.match.params.venueName !== nextProps.match.params.venueName) {
  //     return true
  //   } else {
  //     return false
  //   }

  // }
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
    const proContent = currentUser ? (
      <div>{currentVenue.exclusiveMemberContent}</div>
    ) : null
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
                  <p>{currentVenue.venueBlueprintDetails}</p>
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
                  
                  <ReactMarkdown source={currentVenue.venueArchitectureAndDesign ? currentVenue.venueArchitectureAndDesign : null} className="at-a-glance" />
                  <ReactMarkdown source={proContent} className="pro-content" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section3 page-section">
          <div className="section3 section_background__full">
            <div className="section3 section_background__full__left" />
            <div className="section3 section_background__full__right" />
            <div className="section3 section_background__inner">
              <div className="section3 section_background__inner_content">
                <div
                  className="section3 venue_floating_card"
                  style={{
                    backgroundImage: `url(${currentVenue
                      ? currentVenue.featuredImage.fields.file.url
                      : null})`
                  }}>
                  >
                  <div className="section3 venue_floating_card__inner">
                    <h2>{currentVenue ? currentVenue.venueTitle : null}</h2>
                  </div>
                </div>
                <div className="section3 section_background__inner__text">
                  <div className="venueRelatedNews">
                    {currentVenue.venueRelatedNews
                      ? currentVenue.venueRelatedNews.map(post => (
                          <BlogPostPreview blogPost={post} />
                        ))
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
