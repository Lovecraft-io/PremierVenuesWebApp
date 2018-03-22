import React, { Component } from 'react'
import AppDispatcher from '../../../Flux/Dispatchers/AppDispatcher'
import AppStore from '../../../Flux/Stores/AppStore'
import { ContentPreviewCard } from '../../../Components/ContentPreviewCard'
import _ from 'lodash'
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
import './destination.css'

export default class DestinationSpecific extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentWillMount() {
    console.log(this.props)
    const { destination } = this.props.match.params
    this.getDestinationData(destination)
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.currentDestination && this.props.currentDestination) {
      this.setState({ ...this.props.currentDestination })
    }
  }
  componentDidMount() {
    console.log(this.props)
  }
  getDestinationData(destination) {
    AppDispatcher.dispatch({
      action: 'get-destination-data',
      destination: destination
    })
  }
  render() {
    const { currentDestination } = AppStore.data
    const { destination } = this.props.match.params
    console.log(currentDestination)
    const destinationVenues = currentDestination.destinationVenues.filter(
      venue => venue.fields
    )
    const venuesList =
      destinationVenues.length > 0 ? 
      destinationVenues.map(venue => (
            <ContentPreviewCard venue={venue} city={destination} />
          ))
        : null
    
    return (
      <div
        id="DestinationSpecific"
        style={{
          backgroundImage: `url(${currentDestination.destinationFeaturedImage
            .fields.file.url})`
        }}>
        <Container fluid>
          <div className="section-header">
            <h5>Premier Venues</h5>
            <h6>{currentDestination.destinationName}</h6>
          </div>
        </Container>
        <main className="DestinationSpecific__venues_list">{venuesList}</main>
      </div>
    )
  }
}
