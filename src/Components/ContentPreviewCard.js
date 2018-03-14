import React from 'react'
import { Icon } from 'semantic-ui-react'

export const ContentPreviewCard = props => {
  console.log(props)
  let {venue} = props
  console.log(venue)
  const author = (_author) => <div className="author"><img src={_author.photo} /><h2>{_author.name}</h2></div>
  return (
      <div className="ContentPreviewCard__card">
        <div className="ContentPreviewCard__thumbnail">
          <img
            className="ContentPreviewCard__left"
            src={venue.fields.featuredImage.fields.file.url}
          />
        </div>
        <div className="ContentPreviewCard__right">
          <h1>{venue.fields.venueTitle}</h1>
         
          <div className="ContentPreviewCard__separator" />
          <p>
            <span>{venue.fields.venueBlueprintDetails}</span>
            <br/>
            <span>{venue.fields.venueDescription}</span>
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
        <h6>{venue.fields.venueTitle}</h6>
        </div>
      </div>
  )
}
