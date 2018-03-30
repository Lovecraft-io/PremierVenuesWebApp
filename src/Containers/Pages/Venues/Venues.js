import React, { Component } from 'react'
import { Grid, Image, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { CONSTANTS } from '../../../constants'
import './venue.css'
export default class Venues extends Component {
  render() {
    console.log(this.props)
    const { venues } = this.props
    return (
      <div className="Venues component" id="Venues">
        {this.props.venues.map(venue => (
          <div
            className="venue-card"
            style={{
              backgroundImage: `url(${venue.featuredImage.fields.file.url})`
            }}>
            <div className="title-content">
              <h3>
                <Link to={'venues/' + venue.venueTitle}>
                  {venue.venueTitle}
                </Link>
              </h3>
              <hr />
            </div>
            <div className="card-info">
              <ReactMarkdown source={CONSTANTS.trim(venue.venueDescription)} />
            </div>
            <div className="utility-info">
              <ul className="utility-list">
                <li className="comments">12</li>
                <li className="date">03.12.2015</li>
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
