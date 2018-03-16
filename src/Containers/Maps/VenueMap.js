import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import AppStore from '../../Flux/Stores/AppStore'
import { Card, Image, Segment, Feed } from 'semantic-ui-react'
import './maps.css'

export default class VenueMap extends Component {
  state = {
    lat: 0,
    lng: 0,
    zoom: 16
  }
  componentWillMount() {
    const { venue } = this.props
    this.setState({
      lat: venue.venueLocation.lat,
      lng: venue.venueLocation.lon
    })
  }
  componentDidMount() {
    console.log(this)
    const { leafletElement } = this.refs.VenueMap
    leafletElement.scrollWheelZoom.disable()
    leafletElement.boxZoom.disable()
    leafletElement.keyboard.disable()
  }
  handleZoomControl = e => {
    console.log(e)
    e.preventDefault()
    e.stopPropagation()
  }
  render() {
    const position = [this.state.lat, this.state.lng]
    const { venue } = this.props

    return (
      <div className="" id="VenueMap">
        <Map
          ref={'VenueMap'}
          center={position}
          zoom={this.state.zoom}
          onSCroll={this.handleZoomControl}
          zoomControl={false}>
          <TileLayer
            attribution="&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> &copy; <a href='http://cartodb.com/attributions'>CartoDB</a>"
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              <Card>
                <Image src={venue.featuredImage.fields.file.url} size="small" />
                <span>{venue.venueTitle}</span>
              </Card>
            </Popup>
          </Marker>
        </Map>
      </div>
    )
  }
}
