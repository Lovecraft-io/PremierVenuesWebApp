import React, { Component } from 'react'
import AppDispatcher from '../../../Flux/Dispatchers/AppDispatcher'
import {Link} from 'react-router-dom'
import AppStore from '../../../Flux/Stores/AppStore'
import ReactMarkdown from 'react-markdown'
import './blog.css'

export default class Blog extends Component {
  constructor() {
    super()
    this.state = {
      activePost: {}
    }
  }
  componentWillMount() {
    const { blogPosts } = AppStore.data
    this.setState({
      activePost: blogPosts[0]
    })
  }
  componentDidMount() {
    // $(function() {
    //   $('.search a').on('click', function() {
    //       $('.search input').fadeToggle('400').focus();
    //       $(this).toggleClass('active');
    //       return false;
    //   });
    // });
  }
  render() {
    const { blogPosts } = AppStore.data
    const {activePost} = this.state
    console.log(blogPosts)
    const sideBar = blogPosts.map(post => (
      <li>
        <Link to={`/blog/${post.blogPostTitle}`}>
          <img src={post.blogPostFeaturedImage[0].fields.file.url + '?fit=thumb&w=200&h=200'} alt="" />
          <h3>{post.blogPostTitle}</h3>
        </Link>
      </li>
    ))
    return (
      <div className="Blog component" id="Blog">
        <div className="sidebar">
          <h2>Recent</h2>
          <ul>{sideBar}</ul>
        </div>

        <div className="active_content">
          <div className="image">
            <span>NEW</span>
            <img src={activePost.blogPostFeaturedImage[0].fields.file.url + '?fit=fill'} alt="" />
          </div>
          <div className="desc">
            <span className="type">
              <i className="fa fa-file-text" />
            </span>
            <h1>{activePost.blogPostTitle}</h1>
            <ReactMarkdown source={activePost.blogPostContent} />
          </div>
        </div>
      </div>
    )
  }
}
