import React from 'react'
export const ContentPreviewCard = props => {

  const author = (_author) => <div className="author"><img src={_author.photo} /><h2>{_author.name}</h2></div>
  return (
      <div className="ContentPreviewCard__card">
        <div className="ContentPreviewCard__thumbnail">
          <img
            className="ContentPreviewCard__left"
            src={props.photo}
          />
        </div>
        <div className="ContentPreviewCard__right">
          <h1>{props.title}</h1>
         
          <div className="ContentPreviewCard__separator" />
          <p>
            Magnesium is one of the six essential macro-minerals that is
            required by the body for energy production and synthesis of protein
            and enzymes. It contributes to the development of bones and most
            importantly it is responsible for synthesis of your DNA and RNA. A
            new report that has appeared in theBritish Journal of Cancer, gives
            you another reason to add more magnesium to your diet...
          </p>
        </div>
        <h5>12</h5>
        <h6>JANUARY</h6>
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
