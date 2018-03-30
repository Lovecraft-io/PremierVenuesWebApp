import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import Studios from './Studios'


class Quote extends Component {
  render() {
    return <div>Quote Form</div>
  }
}
export const VENUE_PRO_SECTIONS = {
  overview: props => (
    <ReactMarkdown className="overview" source={props.overview} />
  ),
  studios: (props, modalId) => {
    console.log(props)
    console.log(modalId)
    return <Studios studios= {props.studios} modalRoot={modalId} />
  }, 
  services: props => <ReactMarkdown className="services" source={props.services} />,
  design: props => <ReactMarkdown className="design" source={props.content} />,
  quote: props => <Quote {...props.quote} />
}
