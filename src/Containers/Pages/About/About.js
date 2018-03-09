import _ from 'lodash'
import React, { Component } from 'react'
import AppDispatcher from '../../../Flux/Dispatchers/AppDispatcher'
import AppStore from '../../../Flux/Stores/AppStore'
import {Link} from 'react-router-dom'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility
} from 'semantic-ui-react'

const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  marginBottom: '1em',
  marginTop: '4em',
  transition: 'box-shadow 0.5s ease, padding 0.5s ease'
}

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'
}

const overlayStyle = {
  float: 'left',
  margin: '0em 3em 1em 0em'
}

const fixedOverlayStyle = {
  ...overlayStyle,
  position: 'fixed',
  top: '80px',
  zIndex: 10
}

const overlayMenuStyle = {
  position: 'relative',
  left: 0,
  transition: 'left 0.5s ease'
}

const fixedOverlayMenuStyle = {
  ...overlayMenuStyle,
  left: '800px'
}

const LeftImage = () => (
  <Image
    floated="left"
    size="medium"
    src="/assets/images/wireframe/square-image.png"
    style={{ margin: '2em 2em 2em -4em' }}
  />
)

const RightImage = () => (
  <Image
    floated="right"
    size="medium"
    src="/assets/images/wireframe/square-image.png"
    style={{ margin: '2em -4em 2em 2em' }}
  />
)

const Paragraph = () => (
  <p>
    {[
      'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ',
      'tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas ',
      'semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ',
      'ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean ',
      'fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. ',
      'Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor ',
      'neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, ',
      'accumsan porttitor, facilisis luctus, metus'
    ].join('')}
  </p>
)

export default class About extends Component {
  state = {
    menuFixed: false,
    overlayFixed: false
  }
  componentDidMount = () => {
    console.log(this.props)
  }

  handleOverlayRef = c => {
    const { overlayRect } = this.state

    if (!overlayRect)
      this.setState({
        overlayRect: _.pick(c.getBoundingClientRect(), 'height', 'width')
      })
  }

  stickOverlay = () => this.setState({ overlayFixed: true })

  stickTopMenu = () => this.setState({ menuFixed: true })

  unStickOverlay = () => this.setState({ overlayFixed: false })

  unStickTopMenu = () => this.setState({ menuFixed: false })

  render() {
    const {pages, venues, destinations} = AppStore.data
    const {About} = pages
    const { menuFixed, overlayFixed, overlayRect } = this.state

    return (
      <div>
        <Visibility
          onBottomPassed={this.stickTopMenu}
          onBottomVisible={this.unStickTopMenu}
          once={false}>
          <Menu
            borderless
            fixed={menuFixed && 'top'}
            style={menuFixed ? fixedMenuStyle : menuStyle}>
            <Container text>
              <Menu.Item>
                <Image size="mini" src="/logo.png" />
              </Menu.Item>
              <Menu.Item header>{About.pageHeader}</Menu.Item>
              <Menu.Item as="a">Blog</Menu.Item>
              <Menu.Item as="a">Contact</Menu.Item>
              <Menu.Menu position="right">
                <Dropdown text="Menu" pointing className="link item">
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <i className="dropdown icon" />
                      <span className="text">Venues</span>
                      <Dropdown.Menu>
                      {venues.map((venue) => (
                        <Dropdown.Item>
                          <Link to={`/venues/${venue.venueTitle}`}>{venue.venueTitle}</Link>
                        </Dropdown.Item>
                      ))}
                      </Dropdown.Menu>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <i className="dropdown icon" />
                      <span className="text">Destinations</span>
                      <Dropdown.Menu>
                      {destinations.map((destination) => (
                        <Dropdown.Item>
                          <Link to={`/destinations/${destination.destinationName}`}>{destination.destinationName}</Link>
                        </Dropdown.Item>
                      ))}
                      </Dropdown.Menu>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Menu>
            </Container>
          </Menu>
        </Visibility>

        <Container text>
          {_.times(3, i => <Paragraph key={i} />)}

          <Visibility
            offset={80}
            once={false}
            onTopPassed={this.stickOverlay}
            onTopVisible={this.unStickOverlay}
            style={overlayFixed ? { ...overlayStyle, ...overlayRect } : {}}
          />

          <div
            ref={this.handleOverlayRef}
            style={overlayFixed ? fixedOverlayStyle : overlayStyle}>
            <Menu
              icon="labeled"
              style={overlayFixed ? fixedOverlayMenuStyle : overlayMenuStyle}
              vertical>
              <Menu.Item>
                <Icon name="twitter" />
                Twitter
              </Menu.Item>

              <Menu.Item>
                <Icon name="facebook" />
                Share
              </Menu.Item>

              <Menu.Item>
                <Icon name="mail" />
                Email
              </Menu.Item>
            </Menu>
          </div>

          {_.times(3, i => <Paragraph key={i} />)}
          <LeftImage />

          <Paragraph />
          <RightImage />

          {_.times(4, i => <Paragraph key={i} />)}
          <LeftImage />

          <Paragraph />
          <RightImage />

          {_.times(2, i => <Paragraph key={i} />)}
        </Container>
      </div>
    )
  }
}
