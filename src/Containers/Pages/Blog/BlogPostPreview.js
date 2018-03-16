import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import {CONSTANTS} from '../../../constants'

export const BlogPostPreview = props => (
  <Card>
    <Image src={props.blogPost.fields.blogPostFeaturedImage[0].fields.file.url} />
    <Card.Content>
      <Card.Header style={{textAlign: 'left'}}>{props.blogPost.fields.blogPostTitle}</Card.Header>
      <Card.Description style={{textAlign: 'left'}}>
        {CONSTANTS.trim(props.blogPost.fields.blogPostContent)}
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
