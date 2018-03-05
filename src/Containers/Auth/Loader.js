import React, { Component } from 'react'
import AppDispatcher from '../../Flux/Dispatchers/AppDispatcher'
import './auth.css'

export default class Loader extends Component {
  componentWillMount() {
    console.log(this.props)
    const { hash } = this.props.location
    if (hash.includes('access_token')) {
      AppDispatcher.dispatch({
        action: 'authenticate-access-token'
      })
    }
  }
  componentDidMount() {
    console.log(this.props)
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps)
    if(this.props !== nextProps) {
      return true
    } else {
      return false
    }
    
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps)
    console.log(this.props)
    const { history } = this.props
    if(this.props.currentUser && this.props.currentUser.loggedIn) {
      history.push('/')
    }
  }

  render() {
    return (
      <div className="loadbg">
        <div className="loading-container">
          <div className="cube">
            <div className="sides">
              <div className="top" />
              <div className="right" />
              <div className="bottom" />
              <div className="left" />
              <div className="front" />
              <div className="back" />
            </div>
          </div>
          <div className="text">loading</div>
        </div>
      </div>
    )
  }
}
