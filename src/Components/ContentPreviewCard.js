import React from 'react'
import { Icon, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {CONSTANTS} from '../constants'

export const ContentPreviewCard = props => {
  console.log(props)
  let { venue } = props
  let _venue = venue.fields ? { ...venue.fields } : venue
  console.log(venue)
  console.log(_venue)

  return (
    <div className="ContentPreviewCard__card">
      <div className="ContentPreviewCard__thumbnail">
        <Link to={`/venues/${_venue.venueTitle}`}>
          <img
            className="ContentPreviewCard__left"
            src={_venue.featuredImage.fields.file.url}
          />
        </Link>
      </div>
      <div className="ContentPreviewCard__right">
        <Link to={`/venues/${_venue.venueTitle}`}>
          <h1>{_venue.venueTitle}</h1>
        </Link>
        <div className="ContentPreviewCard__separator" />
        <p>
          <span>{CONSTANTS.trim(_venue.venueBlueprintDetails)}</span>
          <br />
          <span>{CONSTANTS.trim(_venue.venueDescription)}</span>
        </p>
        <List horizontal>
          <List.Item>
            <Icon name="share" />
          </List.Item>
          <List.Item>
            <Icon name="bookmark outline" />
          </List.Item>
          <List.Item>
            <Icon name="info" />
          </List.Item>
        </List>
      </div>
      <div className="bottom">
        <h5 className="">{_venue.city === 'New York City' ? 'New York' : _venue.city}</h5>
        <h6>{_venue.venueTitle}</h6>
      </div>
    </div>
  )
}
