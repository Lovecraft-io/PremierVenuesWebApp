import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import _ from 'lodash'
import 'react-image-gallery/styles/css/image-gallery.css'
import { Menu, Segment } from 'semantic-ui-react'
import ImageGallery from 'react-image-gallery'
import Modal from '../../../../Components/Modal'

class Studio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showIndex: false,
      slideOnThumbnailHover: false,
      showBullets: true,
      infinite: true,
      showThumbnails: true,
      showFullscreenButton: true,
      showGalleryFullscreenButton: true,
      showPlayButton: true,
      showGalleryPlayButton: true,
      showNav: true,
      slideDuration: 450,
      slideInterval: 2000,
      thumbnailPosition: 'bottom',
      showVideo: {}
    }

    this.images = this.props.studio.fields.gallery.fields.images.map(image => {
      return {
        original: image.fields.file.url + '?fit=fill&w=600&h=400',
        thumbnail: image.fields.file.url + '?fit=thumb&w=150&h=150'
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.slideInterval !== prevState.slideInterval ||
      this.state.slideDuration !== prevState.slideDuration
    ) {
      // refresh setInterval
      this._imageGallery.pause()
      this._imageGallery.play()
    }
  }

  _onImageClick(event) {
    console.debug(
      'clicked on image',
      event.target,
      'at index',
      this._imageGallery.getCurrentIndex()
    )
  }

  _onImageLoad(event) {
    console.debug('loaded image', event.target.src)
  }

  _onSlide(index) {
    this._resetVideo()
    console.debug('slid to index', index)
  }

  _onPause(index) {
    console.debug('paused on index', index)
  }

  _onScreenChange(fullScreenElement) {
    console.debug('isFullScreen?', !!fullScreenElement)
  }

  _onPlay(index) {
    console.debug('playing from index', index)
  }

  _handleInputChange(state, event) {
    this.setState({ [state]: event.target.value })
  }

  _handleCheckboxChange(state, event) {
    this.setState({ [state]: event.target.checked })
  }

  _handleThumbnailPositionChange(event) {
    this.setState({ thumbnailPosition: event.target.value })
  }

  _resetVideo() {
    this.setState({ showVideo: {} })

    if (this.state.showPlayButton) {
      this.setState({ showGalleryPlayButton: true })
    }

    if (this.state.showFullscreenButton) {
      this.setState({ showGalleryFullscreenButton: true })
    }
  }

  _toggleShowVideo(url) {
    this.state.showVideo[url] = !Boolean(this.state.showVideo[url])
    this.setState({
      showVideo: this.state.showVideo
    })

    if (this.state.showVideo[url]) {
      if (this.state.showPlayButton) {
        this.setState({ showGalleryPlayButton: false })
      }

      if (this.state.showFullscreenButton) {
        this.setState({ showGalleryFullscreenButton: false })
      }
    }
  }

  _renderVideo(item) {
    return (
      <div className="image-gallery-image">
        {this.state.showVideo[item.embedUrl] ? (
          <div className="video-wrapper">
            <a
              className="close-video"
              onClick={this._toggleShowVideo.bind(this, item.embedUrl)}
            />
            <iframe
              width="560"
              height="315"
              src={item.embedUrl}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        ) : (
          <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
            <div className="play-button" />
            <img src={item.original} />
            {item.description && (
              <span
                className="image-gallery-description"
                style={{ right: '0', left: 'initial' }}>
                {item.description}
              </span>
            )}
          </a>
        )}
      </div>
    )
  }

  render() {
    const { modalRoot, studio } = this.props
    console.log(modalRoot)
    return (
      <section className="studio">
        <h2>{studio.fields.name}</h2>
        <div className="specs">
          <ReactMarkdown source={studio.fields.specs} />
        </div>

        <div className="media">
          <img src={studio.fields.floorPlan.fields.file.url} />
        </div>
        <div className="download">
          <a href={studio.fields.specSheet.fields.file.url} download>
            Download
          </a>
        </div>

        <Modal modalRoot={modalRoot}>
          <ImageGallery
            ref={i => (this._imageGallery = i)}
            items={this.images}
            lazyLoad={false}
            onClick={this._onImageClick.bind(this)}
            onImageLoad={this._onImageLoad}
            onSlide={this._onSlide.bind(this)}
            onPause={this._onPause.bind(this)}
            onScreenChange={this._onScreenChange.bind(this)}
            onPlay={this._onPlay.bind(this)}
            infinite={this.state.infinite}
            showBullets={this.state.showBullets}
            showFullscreenButton={
              this.state.showFullscreenButton &&
              this.state.showGalleryFullscreenButton
            }
            showPlayButton={
              this.state.showPlayButton && this.state.showGalleryPlayButton
            }
            showThumbnails={this.state.showThumbnails}
            showIndex={this.state.showIndex}
            showNav={this.state.showNav}
            thumbnailPosition={this.state.thumbnailPosition}
            slideDuration={parseInt(this.state.slideDuration)}
            slideInterval={parseInt(this.state.slideInterval)}
            slideOnThumbnailHover={this.state.slideOnThumbnailHover}
            additionalClass="studio_image_gallery"
          />
        </Modal>
      </section>
    )
  }
}

export default class Studios extends Component {
  constructor() {
    super()
    this.state = { activeItem: '' }
  }

  componentWillMount() {
    const { studios } = this.props

    this.setState({
      activeItem: studios[0].fields.name
    })
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    console.log(this.props)
    const { studios, modalRoot } = this.props
    const { activeItem } = this.state
    const activeStudio = _.find(
      studios,
      studio => studio.fields.name === activeItem
    )
    console.log(activeItem)
    console.log(activeStudio)

    return (
      <div className="Studios">
        <Menu pointing secondary>
          {studios.map(studio => (
            <Menu.Item
              name={studio.fields.name}
              active={activeItem === `${studio.fields.name}`}
              onClick={this.handleItemClick}
            />
          ))}
        </Menu>

        <Segment>
          <Studio studio={activeStudio} modalRoot={modalRoot} />
        </Segment>
      </div>
    )
  }
}
