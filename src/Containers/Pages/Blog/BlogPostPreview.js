import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

export const BlogPostPreview = props => (
  <Card>
    <Image src={props.image} />
    <Card.Content>
      <Card.Header>{props.blogPostTitle}</Card.Header>
      <Card.Meta>{props.blogPostSubTitle}</Card.Meta>
      <Card.Description>
        Content
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name="user" />
        10 views
      </a>
    </Card.Content>
  </Card>
)
