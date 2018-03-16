import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import {Link} from 'react-router-dom'
import AppStore from '../../Flux/Stores/AppStore'
import { Card, Image, Segment, Feed } from 'semantic-ui-react'
import './maps.css'

export default class DestinationsMap extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 4,
  }
  handleZoomControl = (e) => {
    console.log(e)
    e.preventDefault()
    e.stopPropagation()
  }
  render() {
    const position = [this.state.lat, this.state.lng]
    const { destinations } = AppStore.data
    const destinationMarkers = destinations.map(destination => (
      <Marker
        position={[
          destination.destinationLocation.lat,
          -destination.destinationLocation.lon
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
    console.log(destinationMarkers)
    return (
      <div className="map-container" id="DestinationsMap">
        <Map center={position} zoom={this.state.zoom} onSCroll={this.handleZoomControl} zoomControl={false}>
          <TileLayer
            attribution="&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> &copy; <a href='http://cartodb.com/attributions'>CartoDB</a>"
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
          />
          {destinations.map(destination => {
            const markerPos = [
              destination.destinationLocation.lat,
              destination.destinationLocation.lon
            ]
            console.log(markerPos)
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
                      <ul>
                        {destination.destinationVenues.map(venue => (
                          <li>
                            <a href={`/venues/${venue.fields.venueTitle}`}>
                              <Image
                                src={destination.destinationFeaturedImage.fields.file.url}
                                size="small"
                              />
                              <h4>{venue.fields.venueTitle}</h4>
                            </a>
                          </li>
                        ))}
                      </ul>
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
