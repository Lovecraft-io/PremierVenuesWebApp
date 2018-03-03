import React, { Component } from 'react'
import AppDispatcher from '../../Flux/Dispatchers/AppDispatcher'


export default class Login extends Component {
  constructor() {
    super()
    
    this.handleLinkedinAuth = this.handleLinkedinAuth.bind(this)
  }

  handleLinkedinAuth() {
    AppDispatcher.dispatch({
      action: 'create-user-linkedin'
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.handleLinkedinAuth}><img src="/linkedinButton.png" alt=""/></button>
      </div>
    )
  }
}
