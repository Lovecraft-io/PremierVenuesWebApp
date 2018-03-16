import React from 'react'
import ReactMarkdown from 'react-markdown'

export const MemberExclusive = (props) => (
  <div>
    <ReactMarkdown source={props.content} />
  </div>
)