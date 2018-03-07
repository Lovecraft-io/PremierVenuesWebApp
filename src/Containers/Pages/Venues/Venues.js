import React, { Component } from 'react'
import { Grid, Image, Segment } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
// import './venues.css'
export default class Venues extends Component {
  render() {
    console.log(this.props)
    const { venues } = this.props
    return (
      <Grid celled="internally">
        {this.props.venues.map(venue => (
          <Grid.Row>
            <Grid.Column width={3}>
              <Image
                src={venue.venueMedia ? venue.venueMedia[0].fields.file.url : null}
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Segment>
                <h1><Link to={'venues/' + venue.venueTitle}>{venue.venueTitle}</Link></h1>
                <ReactMarkdown source={venue.venueBlueprintDetails} />
                <ReactMarkdown source={venue.venueDescription} />
              </Segment>
              <Segment>
              
              </Segment>
            </Grid.Column>
            <Grid.Column width={3}>
              <Image
                src={venue.venueMedia ? venue.venueMedia[1].fields.file.url : null}
              />
            </Grid.Column>
          </Grid.Row>
        ))}
      </Grid>
    )
  }
}
