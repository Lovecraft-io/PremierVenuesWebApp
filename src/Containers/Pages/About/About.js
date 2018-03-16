import _ from 'lodash'
import React, { Component } from 'react'
import AppDispatcher from '../../../Flux/Dispatchers/AppDispatcher'
import AppStore from '../../../Flux/Stores/AppStore'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'

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
    const { pages, venues, destinations } = AppStore.data
    const { About } = pages
    const { menuFixed, overlayFixed, overlayRect } = this.state
    const headerImage = About.featuredImage ? (
      About.featuredImage.fields.file.url
    ) : null

    return (
      <div>
        <div className="header-image" style={{backgroundImage: `url(${headerImage})`}}/>
        <Container text className='main-content'>
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
          <section>
            <ReactMarkdown source={About.pageContent} />
          </section>
        </Container>
      </div>
    )
  }
}
