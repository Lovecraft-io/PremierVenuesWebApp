import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'

class Quote extends Component {
  render() {
    return <div>Quote Form</div>
  }
}
export const VENUE_PRO_SECTIONS = {
  overview: props => <ReactMarkdown className="overview" source={props.overview} />,
  studios: props => (
    <div className="Studios">
      {props.studios.map(studio => <h3>{studio.name}</h3>)}
    </div>
  ),
  services: props => <ReactMarkdown className="services" source={props.services} />,
  design: props => <ReactMarkdown className="design" source={props.content} />,
  quote: (props) => <Quote {...props.quote} />

}
