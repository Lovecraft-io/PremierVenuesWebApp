import React from 'react'
import Video from 'react-video-cover'

export const VideoBackground = (props) => (
  props.background.includes('video') ?
  <div className="videoBg">
    <video
    autoPlay={true}
    loop={true}
      style={{
        objectFit: 'cover',
        width: '100%',
        height: '100%',
      }}
      src={props.background}
    />
  </div>
  : 
  <div className="imageBg">
    <img src={props.background} />
  </div>
)