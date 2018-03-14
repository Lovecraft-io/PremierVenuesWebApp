import React, { Component } from 'react'
import AppStore from '../../../Flux/Stores/AppStore'
import AppDispatcher from '../../../Flux/Dispatchers/AppDispatcher'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Icon, List, Button, Popup, Image, Segment } from 'semantic-ui-react'
import './destination.css'

export default class Destinations extends Component {
  render() {
    const { destinations, venues } = AppStore.data
    console.log(destinations)
    return (
      <div className="Destinations component" id="Destinations">
        {destinations.map(destination => (
          <div
            className="destination-card"
            style={{
              backgroundImage: `url(${destination.destinationFeaturedImage
                ? destination.destinationFeaturedImage.fields.file.url
                : null})`
            }}>
            <div className="title-content">
              <h3>
                <Link to={'destinations/' + destination.destinationName}>
                  {destination.destinationName}
                </Link>
              </h3>
              <hr />
              <div className="intro">
                {/* <ReactMarkdown source={destination.destinationBlueprintDetails} /> */}
              </div>
            </div>
            <div className="card-info">
              <ReactMarkdown source={destination.destinationDescription} />
            </div>
            <div className="utility-info">
              <ul className="utility-list">
                <li className="comments" />
                <li className="date" />
                <Popup
                  trigger={<li className="destination-card__popup-link">Venues</li>}
                  on="hover">
                  <Popup.Header>Venues</Popup.Header>
                  <Popup.Content>
                    {destination.destinationVenues.map((venue) => (
                      <Segment>
                      <div className="destination-card__popup__tooltip__content clearfix">
                      <Image src={venue.fields.featuredImage.fields.file.url} size='mini' verticalAlign='middle' rounded spaced floated='left' />
                        <Link to={`venues/${venue.fields.venueTitle}`}>{venue.fields.venueTitle}</Link>
                      </div>
                      </Segment>
                    ))}
                  </Popup.Content>
                </Popup>
              </ul>
            </div>
            <div className="gradient-overlay" />
            <div className="color-overlay" />
          </div>
        ))}
      </div>
    )
  }
}
