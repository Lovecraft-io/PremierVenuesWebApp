import React, { Component } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import {VENUE_PRO_SECTIONS } from './VenuePro/VenueProSections'
import _ from 'lodash'

export default class VenuePro extends Component {

  state = { activeItem: '' }

  componentWillMount() {
    let { currentVenue, currentUser } = this.props
    localStorage.setItem('currentVenue', JSON.stringify(currentVenue))
    if (!currentVenue) {
      currentVenue = JSON.parse(localStorage.getItem('currentVenue'))
    }
    if (currentVenue) {
      let {venuePro} = currentVenue
      venuePro = {...venuePro.fields}
      let keys = Object.keys(venuePro)
      const venueProSections = Object.keys(venuePro).filter((key) => key !== 'type')
      console.log(venueProSections)
      this.setState({
        activeItem: venueProSections[0]
      })
    } else {
      alert("Error")
      window.location = '/'
    }
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { currentVenue, currentUser } = this.props
    const { activeItem } = this.state
    console.log(activeItem)
    let {venuePro} = currentVenue
    venuePro = {...venuePro.fields}
    const venueProSections = Object.keys(venuePro).filter((key) => key !== 'type')
    console.log(venuePro)
    const toggleActiveSection = (venuePro) => VENUE_PRO_SECTIONS[activeItem](venuePro)
    const activeSection = toggleActiveSection(venuePro)
    
    
    return (
      <div className="section3 venue_pro section_background__full">
        <div className="section3 venue_pro section_background__full__left" />
        <div className="section3 venue_pro section_background__full__right" />
        <div className="section3 venue_pro section_background__inner">
          <div className="section3 venue_pro venue_floating_card">
            <div className="section3 venue_pro venue_floating_card__inner">
              <Grid>
                <Grid.Column width={4}>
                  <Menu fluid vertical tabular>
                    {venueProSections.map(section => (
                      <Menu.Item
                        name={section}
                        active={activeItem === section}
                        onClick={this.handleItemClick}
                      />
                    ))}
                  </Menu>
                </Grid.Column>

                <Grid.Column stretched width={12}>
                  <div className="venue_pro_content_inner">
                    {activeSection}
                  </div>
                </Grid.Column>
              </Grid>
            </div>
            <div id="image_gallery_modal__destination">

            </div>
          </div>
        </div>
      </div>
    )
  }
}
