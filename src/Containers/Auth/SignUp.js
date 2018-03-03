import React, {Component} from 'react'
import AppDispatcher from '../../Flux/Dispatchers/AppDispatcher'
import Auth from './Auth'
const auth = new Auth()


export default class Login extends Component {
  constructor() {
    super()
    
    this.handleLinkedinAuth = this.handleLinkedinAuth.bind(this)
  }
  componentDidMount() {
 
  }

  handleLinkedinAuth() {
    AppDispatcher.dispatch({
      action: 'handle-linkedin-auth'
    })
  }

  render() {
    const buttonScript = <script type="in/Login"></script>
    
    return (
      <div id="SignUp"><button onClick={this.handleLinkedinAuth}><img src="/linkedinButton.png" alt=""/></button></div>
    )
  }
}
