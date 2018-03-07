import React, { Component } from 'react'
import { Grid, Image } from 'semantic-ui-react'
// import './venues.css'
export default class Venues extends Component {
  render() {
    console.log(this.props)
    return (
      <Grid celled="internally">
        <Grid.Row>
          <Grid.Column width={3}>
            <Image src="/assets/images/wireframe/image.png" />
          </Grid.Column>
          <Grid.Column width={10}>
            <Image src="/assets/images/wireframe/centered-paragraph.png" />
          </Grid.Column>
          <Grid.Column width={3}>
            <Image src="/assets/images/wireframe/image.png" />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={3}>
            <Image src="/assets/images/wireframe/image.png" />
          </Grid.Column>
          <Grid.Column width={10}>
            <Image src="/assets/images/wireframe/paragraph.png" />
          </Grid.Column>
          <Grid.Column width={3}>
            <Image src="/assets/images/wireframe/image.png" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
