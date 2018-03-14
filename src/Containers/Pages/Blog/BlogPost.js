import React, {Component} from 'react'
import AppDispatcher from '../../../Flux/Dispatchers/AppDispatcher'
import AppStore from '../../../Flux/Stores/AppStore'
import ReactMarkdown from 'react-markdown'

export default class BlogPost extends Component {
  componentWillMount() {
    console.log(this.props)
    const {blogPost} = this.props.match.params
    this.getBlogPostData(blogPost)
  }
  getBlogPostData(blogPost) {
    AppDispatcher.dispatch({
      action: 'get-blogPost-data',
      blogPost: blogPost
    })
  }
  render() {
    const {currentBlogPost} = AppStore.data 
    console.log(currentBlogPost)
    return (
      <article className="blogPost_post">
      <div>
        <div className="blogPost_absolute-bg" style={{backgroundImage: `url(${currentBlogPost.blogPostFeaturedImage[0].fields.file.url})`}}></div>
      </div>
      <div className="blogPost_post__container">
        <span className="blogPost_post__category">{currentBlogPost.blogPostTitle}</span>
        
        <div className="blogPost_post__content">
          <header>
            <time className="blogPost_post__time">{currentBlogPost.createdAt}</time>
            <h1 className="blogPost_post__header"><span>Visiting</span> <span>the</span> <span>beach</span></h1>
          </header>
          <ReactMarkdown source={currentBlogPost.blogPostContent} className="blogPost_post__text" />
        </div>
        <div className="blogPost_post__link">
          <a href="/blog">All Posts</a>
        </div>
      </div>
    </article>
    )
  }
}
