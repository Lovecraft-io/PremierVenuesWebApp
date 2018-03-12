import React from 'react'
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
        <h5 className='ContentPreviewCard__right_textBg'>{props.city}</h5>
        <h6>{venue.venueTitle}</h6>
        <ul>
          <li>
            <i className="fa fa-eye fa-2x" />
          </li>
          <li>
            <i className="fa fa-heart-o fa-2x" />
          </li>
          <li>
            <i className="fa fa-envelope-o fa-2x" />
          </li>
          <li>
            <i className="fa fa-share-alt fa-2x" />
          </li>
        </ul>
        <div className="fab">
          <i className="fa fa-arrow-down fa-3x"> </i>
        </div>
      </div>
  )
}
