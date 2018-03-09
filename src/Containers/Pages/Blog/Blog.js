import React, { Component } from 'react'
import AppDispatcher from '../../../Flux/Dispatchers/AppDispatcher'
import AppStore from '../../../Flux/Stores/AppStore'
import './blog.css'

export default class Blog extends Component {
  render() {
    const { blogPosts } = AppStore.data
    console.log(blogPosts)
    return (
      <div>
        <div id="theGrid" class="main">
          <section className="grid">
         
            {blogPosts.map((post) => (
              <a className="grid__item" href="#">
              <h2 className="title title--preview">{post.blogPostTitle}</h2>
              <div className="loader" />
              <span className="category">Life &amp; Death</span>
              <div className="meta meta--preview">
                <img
                  className="meta__avatar"
                  src="img/authors/4.png"
                  alt="author04"
                />
                <span className="meta__date">
                  <i className="fa fa-calendar-o" /> 6 Apr
                </span>
                <span className="meta__reading-time">
                  <i className="fa fa-clock-o" /> 2 min read
                </span>
              </div>
            </a>
            ))}
          </section>

          <section className="content">
            <div className="scroll-wrap">
              <article className="content__item">
                <span className="category category--full"></span>
                <h2 className="title title--full"></h2>
                <div className="meta meta--full">
                  <img
                    className="meta__avatar"
                    src="img/authors/4.png"
                    alt="author04"
                  />
                  <span className="meta__author"></span>
                  <span className="meta__date">
                    <i className="fa fa-calendar-o" /></span>
                  <span className="meta__reading-time">
                    <i className="fa fa-clock-o" />
                    </span>
                  <span className="meta__misc meta__misc--seperator">
                    <i className="fa fa-comments-o" /></span>
                  <span className="meta__misc">
                    <i className="fa fa-heart" /></span>
                  <nav className="article-nav">
                    <button>
                      <i className="fa fa-angle-left" /> <span>Previous</span>
                    </button>
                    <button>
                      <span>Next</span> <i className="fa fa-angle-right" />
                    </button>
                  </nav>
                </div>
                <p>
                  In contrast to this, our discussion readily shows that the
                  double meaning in question belonged to the word taboo from the
                  very beginning and that it serves to designate a definite
                  ambivalence as well as everything which has come into
                  existence on the basis of this ambivalence.{' '}
                </p>
              </article>
            </div>
          </section>
        </div>
      </div>
    )
  }
}
