import React, { Component } from 'react'
import AppDispatcher from '../../../Flux/Dispatchers/AppDispatcher'
import AppStore from '../../../Flux/Stores/AppStore'
import ReactMarkdown from 'react-markdown'
import moment from 'moment'

export default class BlogPost extends Component {
  componentWillMount() {
    console.log(this.props)
    const { blogPost } = this.props.match.params
    this.getBlogPostData(blogPost)
  }
  getBlogPostData(blogPost) {
    AppDispatcher.dispatch({
      action: 'get-blogPost-data',
      blogPost: blogPost
    })
  }
  render() {
    const { currentBlogPost } = AppStore.data
    console.log(currentBlogPost)
    return (
      <div className="component BlogPost">
        <article className="blogPost_post">
          <div>
            <div
              className="blogPost_absolute-bg"
              style={{
                backgroundImage: `url(${currentBlogPost.blogPostFeaturedImage[0]
                  .fields.file.url})`
              }}
            />
          </div>
          <div className="blogPost_post__container">
            <span className="blogPost_post__category">
              Category
            </span>

            <div className="blogPost_post__content">
              <header>
                <time className="blogPost_post__time">
                  {moment(currentBlogPost.createdAt).format('MMMM Do YYYY')}
                </time>
                <h1 className="blogPost_post__header">
                {currentBlogPost.blogPostTitle}
                </h1>
              </header>
              <ReactMarkdown
                source={currentBlogPost.blogPostContent}
                className="blogPost_post__text"
              />
            </div>
            <div className="blogPost_post__link">
              <a href="/blog">All Posts</a>
            </div>
          </div>
        </article>
      </div>
    )
  }
}
