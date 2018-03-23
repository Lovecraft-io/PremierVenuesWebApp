import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import AppStore from '../../Flux/Stores/AppStore'
import ReactMarkdown from 'react-markdown'
import { Card, Image, Segment, Feed } from 'semantic-ui-react'
import './maps.css'

export default class DestinationsMap extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 3
  }
  componentDidMount() {
    console.log(this)
    const { leafletElement } = this.refs.DestinationMap
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
    const { destinations } = AppStore.data
    const { content } = this.props
    const contentHTML = content ? (
      <div className="map_text">
        <ReactMarkdown source={content} />
      </div>
    ) : null

    const destinationMarkers = destinations.map(destination => (
      <Marker
        position={[
          destination.map.fields.location.lat,
          destination.map.fields.location.lon
        ]}>
        <Popup>
          <Card>
            <Image
              src={destination.destinationFeaturedImage.fields.file.url}
              size="small"
            />
            <span>{destination.destinationName}</span>
          </Card>
        </Popup>
      </Marker>
    ))

    return (
      <div className="map-container" id="DestinationsMap">
        <Map
          ref={'DestinationMap'}
          center={position}
          zoom={this.state.zoom}
          onSCroll={this.handleZoomControl}
          zoomControl={false}>
          <TileLayer
            attribution="&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> &copy; <a href='http://cartodb.com/attributions'>CartoDB</a>"
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
          />
          {contentHTML}
          {destinations.map(destination => {
            const markerPos = [
              destination.map.fields.location.lat,
              destination.map.fields.location.lon
            ]
            const destinationVenues = destination.destinationVenues.filter(
              venue => venue.fields
            )
            const destinationVenuesHTML =
              destinationVenues.length > 0 ? (
                <ul>
                  {destinationVenues.map(venue => (
                    <li>
                      <a href={`/venues/${venue.fields.venueTitle}`}>
                        <Image
                          src={
                            destination.destinationFeaturedImage.fields.file.url
                          }
                          size="small"
                        />
                        <h4>{venue.fields.venueTitle}</h4>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null
            console.log(destinationVenues)
            return (
              <Marker position={markerPos}>
                <Popup>
                  <Card className="card_popup">
                    <header className="card_popup__top">
                      <Image
                        src={
                          destination.destinationFeaturedImage.fields.file.url
                        }
                      />
                      <h3>{destination.destinationName}</h3>
                    </header>
                    <section className="card_popup__bottom">
                      <p>{destination.destinationBlueprintDetails}</p>
                      {destinationVenuesHTML}
                    </section>
                  </Card>
                </Popup>
              </Marker>
            )
          })}
        </Map>
      </div>
    )
  }
}
