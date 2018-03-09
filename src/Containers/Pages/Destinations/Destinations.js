import React, {Component} from 'react'

export default class Destinations extends Component {
  render() {
    // style={{backgroundImage: `url(${currentDestination.destinationFeaturedImage.fields.file.url})`}}
    return (
      <div id="Destination">
      <div className="Destination_container">
        <section className="Destination_background">
          <div className="Destination_content-wrapper">
            <p className="Destination_content-title">
              {/* {currentDestination.destinationName} */}
            </p>
            <p className="Destination_content-subtitle">
              {/* {currentDestination.destinationDescription} */}
            </p>
          </div>
        </section>
        <section className="Destination_background">
          <div className="Destination_content-wrapper">
            <p className="Destination_content-title">
              
            </p>
            <p className="Destination_content-subtitle">
           
            </p>
          </div>
        </section>
        <section className="Destination_background">
          <div className="Destination_content-wrapper">
            <p className="Destination_content-title">
              Etiam consequat lectus.
            </p>
            <p className="Destination_content-subtitle">
              Nullam tristique urna sed tellus ornare congue. Etiam vitae erat
              at nibh aliquam dapibus.
            </p>
          </div>
        </section>
      </div>
    </div>
    )
  }
}