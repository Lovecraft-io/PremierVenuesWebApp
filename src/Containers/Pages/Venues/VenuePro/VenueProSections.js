import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'

class Quote extends Component {
  render() {
    return <div>Quote Form</div>
  }
}
export const VENUE_PRO_SECTIONS = {
  overview: props => <ReactMarkdown source={props.overview} />,
  studios: props => (
    <div className="Studios">
      {props.studios.map(studio => <h3>{studio.name}</h3>)}
    </div>
  ),
  services: props => <ReactMarkdown source={props.services} />,
  design: props => <ReactMarkdown source={props.content} />,
  quote: (props) => <Quote {...props.quote} />

}