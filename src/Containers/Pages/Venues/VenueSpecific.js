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

export default class DestinationSpecific extends Component {
  constructor() {
    super()
    this.state = {}
  }
  componentWillMount() {
    console.log(this.props)
    const { venueName } = this.props.match.params
    this.getVenueData(venueName)
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if(prevProps.currentVenue === undefined && !prevState.currentVenue) {
  //     this.setState({...this.props.currentVenue})
  //   }

  // }
  // componentDidMount() {
  //   console.log(this.props)
  // }
  // shouldComponentUpdate(prevProps, nextProps) {
  //   if(prevProps.currentVenue === undefined && nextProps.currentVenue) {
  //     return true
  //   }
  //   return false
  // }

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
              marginBottom: 0
            }}
          />
          <Header
            as="h2"
            content={currentVenue ? currentVenue.venueTitle : null}
            inverted
            style={{
              fontSize: '1.7em',
              fontWeight: 'normal',
              marginTop: '1.5em'
            }}
          />
        </Container>
        <div className="content">
          <div className="content">
            <div className="date">
              <span>April</span>
              <span className="day">6</span>
            </div>
            <div className="article">
              <h2><span>{currentVenue ? currentVenue.venueTitle : null}</span></h2>
      
              <p className="firstpara">
                <span className="firstcharacter"></span>
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
