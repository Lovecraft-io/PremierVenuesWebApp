import React, { Component } from 'react'
import AppDispatcher from '../../../Flux/Dispatchers/AppDispatcher'
import AppStore from '../../../Flux/Stores/AppStore'
import VenueMap from '../../Maps/VenueMap'
import { BlogPostPreview } from '../Blog/BlogPostPreview'
import {
  Form,
  Icon,
  List,
  Header,
  Button,
  Popup,
  Segment
} from 'semantic-ui-react'

import VenuePro from './VenuePro'
import ReactMarkdown from 'react-markdown'
import _ from 'lodash'
import './venue.css'

export default class VenueSpecific extends Component {
  constructor() {
    super()
    this.state = {
      lastName: '',
      firstName: '',
      email: ''
    }
  }
  componentWillMount() {
    console.log(this.props)
    const { venueName } = this.props.match.params
    console.log(venueName)
    this.getVenueData(venueName)
  }
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
  handleSubmit = e => e

  handleLastName = e => this.setState({ lastName: e.target.value })
  handleFirstName = e => this.setState({ firstName: e.target.value })
  handleEmail = e => this.setState({ email: e.target.value })
  bookMarkThisVenue = () => {
    const { currentVenue } = AppStore.data
    AppDispatcher.dispatch({
      action: 'bookmark-venue',
      venue: currentVenue
    })
  }

  render() {
    const { data } = AppStore
    const { venueSuccessfullyAdded } = data
    console.log(data)
    const { currentVenue, currentUser } = data
    console.log(currentVenue)
    let {form, map, venuePro} = currentVenue
    // [form, map, venuePro].map((obj) => obj = {...obj.fields})
    
    const BookMarkOptions = currentUser ? (
      <List horizontal>
        <Popup
          trigger={
            <List.Item>
              <Icon size="large" circular color="white" name="add" />
            </List.Item>
          }
          flowing
          hoverable>
          <Segment padded>
            <Header as="h4">Bookmark this venue</Header>
            {venueSuccessfullyAdded ? (
              <p>You've bookmarked this venue</p>
            ) : (
              <div>
                <p>Bookmark this venue for later</p>
                <Button onClick={this.bookMarkThisVenue}>Save</Button>
              </div>
            )}
          </Segment>
        </Popup>
      </List>
    ) : null

    const VenueStandard = props => (
      <div className="section3 venue_standard section_background__full">
        <div className="section3 venue_standard section_background__full__left" />
        <div className="section3 venue_standard section_background__full__right" />
        <div className="section3 venue_standard section_background__inner">
          <div className="section3 venue_standard section_background__inner_content">
            <div className="section3 venue_standard section_background__inner__text">
              <div className="venueRelatedNews">
                {props.currentVenue.blogPosts
                  ? props.currentVenue.blogPosts.map(
                      post =>
                        post.fields &&
                        post.fields.blogPostFeaturedImage &&
                        post.fields.blogPostFeaturedImage.length > 0 ? (
                          <BlogPostPreview blogPost={post} />
                        ) : null
                    )
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    )

    const ToggleVenuePro = () =>
      currentUser ? (
        <VenuePro currentUser={currentUser} currentVenue={currentVenue} />
      ) : (
        <VenueStandard currentVenue={currentVenue} />
      )
    const ToggleCTA = () =>
      currentUser ? null : (
        <div className="section2 section_background__inner__text">
          <ReactMarkdown source={form.ctaContent} />
          <div>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group widths="equal">
                {form ? form.map(field => (
                  <Form.Input
                    fluid
                    label={field}
                    placeholder={field}
                    onChange={
                      field === 'Name' ? this.handleFirstName : this.handleEmail
                    }
                  />
                )) : null }
              </Form.Group>
              <Form.Button>Submit</Form.Button>
            </Form>
          </div>
        </div>
      )

    return (
      <div id="VenueSpecific">
        <div className="page-section">
          <div className="section_background__full">
            <div className="section_background__full__left" />
            <div className="section_background__full__right" />
            <div className="section_background__inner">
              <div className="section_background__inner_content">
                <div
                  className="venue_floating_card"
                  style={{
                    backgroundImage: `url(${currentVenue
                      ? currentVenue.featuredImage.fields.file.url
                      : null})`
                  }}>
                  >
                  <div className="venue_floating_card__inner">
                    {BookMarkOptions}
                  </div>
                </div>
                <div className="section_background__inner__text">
                  <h2>{currentVenue ? currentVenue.venueTitle : null}</h2>
                  <p>{currentVenue.venueFeatures}</p>
                  <p>{currentVenue.venueDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section2 page-section">
          <div className="section2 section_background__full">
            <div className="section2 section_background__full__left" />
            <div className="section2 section_background__full__right" />
            <div className="section2 section_background__inner">
              <div className="section2 section_background__inner_content">
                <div className="section2 venue_floating_map_card">
                  <VenueMap venue={currentVenue} />
                </div>
                {ToggleCTA()}
              </div>
            </div>
          </div>
        </div>
        <div className="section3 page-section">{ToggleVenuePro()}</div>
      </div>
    )
  }
}
