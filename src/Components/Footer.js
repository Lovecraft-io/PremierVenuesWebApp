import React from 'react'
import { Link } from 'react-router-dom'
import AppStore from '../Flux/Stores/AppStore'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Image,
  Header,
  Icon,
  List,
  Menu,
  Segment,
  Visibility
} from 'semantic-ui-react'

const { data } = AppStore
const logInOrOutButton = props =>
  props.loggedIn ? (
    <Menu.Item>
      <span onClick={() => props.handleLinkedinAuth()}>Log Out</span>
    </Menu.Item>
  ) : (
    <Menu.Item>
      <span onClick={() => props.handleLinkedinAuth()}>Login</span>
    </Menu.Item>
  )
const signUpButton = props =>
  props.loggedIn ? null : (
    <Menu.Item>
      <span onClick={() => props.handleLinkedinAuth()}>Sign Up</span>
    </Menu.Item>
  )
const handleRedirect = e => {
  const venue = e.target.replace('/venues/', '')
  console.log(venue)
}
const dropDownMenu = (title, links) => (
  <Dropdown pointing className="link item" text={title}>
    <Dropdown.Menu>
      <Dropdown.Item>
        <Link to={`/${encodeURI(title.toLowerCase())}`}>All {title}</Link>
      </Dropdown.Item>
      {links.map(link => (
        <Dropdown.Item>
          <Link
            to={
              link.venueTitle
                ? `/venues/${link.venueTitle}`
                : `/destinations/${link.destinationName}`
            }
            onClick={e => handleRedirect(e)}>
            {link.venueTitle ? link.venueTitle : link.destinationName}
          </Link>
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
)

const renderNavItems = (link, venues, destinations) => {
  if (link === 'Venues') {
    return dropDownMenu('Venues', venues)
  } else if (link === 'Destinations') {
    return dropDownMenu('Destinations', destinations)
  } else {
    if (link === 'Account' && (data.currentUser && data.currentUser.loggedIn)) {
      return (
        <Menu.Item>
          <Link to={'/' + encodeURI(link.toLowerCase())}>{link}</Link>
        </Menu.Item>
      )
    } else if (link !== 'Account') {
      return (
        <Menu.Item>
          <Link to={'/' + encodeURI(link.toLowerCase())}>{link}</Link>
        </Menu.Item>
      )
    }
  }
}

export const Footer = props => {
  const nav = props.links.map(link =>
    renderNavItems(link, props.venues, props.destinations)
  )
  return (
    <Segment
      id="Footer"
      inverted
      style={{ margin: '5em 0em 0em', padding: '5em 0em' }}
      vertical>
      <Container textAlign="center">
        <Grid columns={4} divided stackable inverted>
          <Grid.Row>
            <Grid.Column>
              <Header inverted as="h4" content="Premier Venues" />
            </Grid.Column>
            <Grid.Column>
              <Header inverted as="h4" content="Destinations" />
              <List link inverted>
                {props.destinations.map(destination => (
                  <List.Item>
                    <Link to={`/destinations/${destination.destinationName}`}
                      onClick={e => handleRedirect(e)}>
                      {destination.destinationName}
                    </Link>
                  </List.Item>
                ))}
              </List>
            </Grid.Column>
            <Grid.Column>
            <Header inverted as="h4" content="Venues" />
            <List link inverted>
              {props.venues.map(venue => (
                <List.Item>
                  <Link to={`/venues/${venue.venutTitle}`}
                    onClick={e => handleRedirect(e)}>
                    {venue.venueTitle}
                  </Link>
                </List.Item>
              ))}
            </List>
            </Grid.Column>
            <Grid.Column>
              <Header inverted as="h4" content="Account" />
              {logInOrOutButton(props)}
              {signUpButton(props)}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider inverted section />
        Premier Venues
        <List horizontal inverted divided link>
          <List.Item as="a" href="#">
            Site Map
          </List.Item>
          <List.Item as="a" href="#">
            Contact Us
          </List.Item>
          <List.Item as="a" href="#">
            Terms and Conditions
          </List.Item>
          <List.Item as="a" href="#">
            Privacy Policy
          </List.Item>
        </List>
      </Container>
    </Segment>
  )
}
