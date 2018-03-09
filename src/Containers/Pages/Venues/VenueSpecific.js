import React, { Component } from 'react'
import AppDispatcher from '../../../Flux/Dispatchers/AppDispatcher'
import AppStore from '../../../Flux/Stores/AppStore'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from 'semantic-ui-react'
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
    return (
      <div id="VenueSpecific">
        <Container
          fluid
          style={{
            backgroundImage: `url(${currentVenue
              ? currentVenue.featuredImage.fields.file.url
              : null})`
          }}>
          <Header
            as="h1"
            content={currentVenue ? currentVenue.venueTitle : null}
            inverted
            style={{
              fontSize: '4em',
              fontWeight: 'normal',
              height: '500px',
              textAlign: 'center',
              paddingTop: '2em'
            }}
          />
        </Container>
        <div className="venue_specific_main">
          <div className="venue_specific_content">
            <div className="venue_specific_date">
              <span>April</span>
              <span className="venue_specific_day">6</span>
            </div>
            <div className="venue_specific_article">
              <h2><span>{currentVenue ? currentVenue.venueTitle : null}</span></h2>
      
              <p className="venue_specific_firstpara">
                <span className="venue_specific_firstcharacter"></span>
                {currentVenue.venueBluePrintDetails}
              </p>
              <p>
                {currentVenue.venueDescription}
              </p>
          
            </div>

          </div>
        </div>
      </div>
    )
  }
}
