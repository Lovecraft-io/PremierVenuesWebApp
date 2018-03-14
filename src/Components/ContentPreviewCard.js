import React from 'react'
import { Icon } from 'semantic-ui-react'

export const ContentPreviewCard = props => {
  console.log(props)
  let {venue} = props
  let _venue = venue.fields ? {...venue.fields} : venue 
  console.log(venue)
  
  return (
      <div className="ContentPreviewCard__card">
        <div className="ContentPreviewCard__thumbnail">
          <img
            className="ContentPreviewCard__left"
            src={venue.featuredImage.fields.file.url}
          />
        </div>
        <div className="ContentPreviewCard__right">
          <h1>{venue.venueTitle}</h1>
         
          <div className="ContentPreviewCard__separator" />
          <p>
            <span>{venue.venueBlueprintDetails}</span>
            <br/>
            <span>{venue.venueDescription}</span>
          </p>
        </div>
        <ul>
          <li><Icon name='share' /></li>
          <li><Icon name='like' /></li>
          <li><Icon name='bookmark outline' /></li>
          <li><Icon name='thumb tack' /></li>
        </ul>
        <div className="fab">
        <h5 className='ContentPreviewCard__right_textBg'>{props.city}</h5>
        <h6>{venue.venueTitle}</h6>
        </div>
      </div>
  )
}
