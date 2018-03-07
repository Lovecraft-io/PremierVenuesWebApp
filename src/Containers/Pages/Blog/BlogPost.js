import React from 'react'


export const BlogPost = props => (

 <article className="blogPost_post">
  <div>
    <div className="blogPost_absolute-bg" style={{backgroundImage: "url('https://source.unsplash.com/f9C8ytxaItI/2000x1200')"}}></div>
  </div>
  <div className="blogPost_post__container">
    <span className="blogPost_post__category">Michelle's Travels</span>
    
    <div className="blogPost_post__content">
      <header>
        <time className="blogPost_post__time">Jan 22 2017</time>
        <h1 className="blogPost_post__header"><span>Visiting</span> <span>the</span> <span>beach</span></h1>
      </header>
    
      <p className="blogPost_post__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a augue justo. In mollis erat in elit tempus, feugiat luctus ex sollicitudin. Maecenas euismod tortor dolor, vel blandit augue aliquam sit amet. Vestibulum et eros mollis, laoreet nisi ac, condimentum sapien. Aliquam nec nunc enim.</p>
    </div>
    <div className="blogPost_post__link">
      <a href="#">Older Posts</a>
    </div>
  </div>
</article>

)
