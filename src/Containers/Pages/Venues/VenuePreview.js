

import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

export const BlogPostPreview = props => {
  const toggle = () => {
    if(document.querySelector('.venue-preview_wrapper').classList.includes('open')) {
      document.querySelector('.venue-preview_wrapper').classList.remove('open')
    } else {
      document.querySelector('.venue-preview_wrapper').classList.add('open')
    }
    if(document.querySelector('.venue-preview_content').classList.includes('open')) {
      document.querySelector('.venue-preview_content').classList.remove('open')
    } else {
      document.querySelector('.venue-preview_content').classList.add('open')
    }
  }
  return (
    <div className="venue-preview venue-preview_wrapper" onClick={toggle()}>
    <div className="venue-preview venue-preview_content">
      <div 
      stlye={{backgroundImage: url(props.backgroundImage)}}
      className="venue-preview venue-preview_img">
  
      </div>
      <div className="venue-preview venue-preview_text">
        <div className="venue-preview venue-preview_line venue-preview_title"></div>
        <div className="venue-preview venue-preview_line venue-preview_subtitle"></div>
      </div>
    </div>
  </div>
  )
}
