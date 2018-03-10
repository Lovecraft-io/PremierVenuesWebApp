import React from 'react'
import Video from 'react-video-cover'

export const VideoBackground = (props) => (
  <div className="videoBg">
    <video
    autoPlay={true}
    loop={true}
      style={{
        objectFit: 'cover',
        width: '100%',
        height: '100%',
      }}
      src="/bokeh.mp4"
    />
  </div>
)