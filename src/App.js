import React, { Component } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import AppDispatcher from './Flux/Dispatchers/AppDispatcher'
import AppStore from './Flux/Stores/AppStore'
import { SiteMenu } from './Components/SiteMenu'
import { Footer } from './Components/Footer'
import Loader from './Containers/Auth/Loader'
import Intercom from 'react-intercom';
import routes from './routes'
import 'semantic-ui-css/semantic.min.css'
import './App.css'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleLinkedinAuth = this.handleLinkedinAuth.bind(this)
  }

  componentDidMount() {
    // window.Intercom("boot", {
    //   app_id: "epird752"
    // })
    AppStore.addChangeListener(this._onChange.bind(this))
  }
  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange.bind(this))
  }
  getStore(user=false) {
    if(!user) {
      AppDispatcher.dispatch({
        action: 'get-app-store'
      })
    }
    AppDispatcher.dispatch({
      action: 'get-app-store',
      user: user
    })
  }
  componentWillMount() {
    const user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : false
    console.log(user)
    this.getStore(user)
  }
  _onChange() {
    this.setState(AppStore)
  }
  handleLinkedinAuth() {
    AppDispatcher.dispatch({action: 'handle-linkedin-auth'})
  } 

  render() {
    const { data } = AppStore
    const { siteNav, venues, destinations, currentUser } = data
    const _currentUser = currentUser ? currentUser : JSON.parse(localStorage.getItem('currentUser'))
    const loggedIn = _currentUser ? _currentUser.loggedIn : false
    if (!data.ready) {
      this.getStore()
      return <Loader />
    } else {
      return (
        <BrowserRouter {...data}>
          <div id="App">
            <SiteMenu loggedIn={loggedIn} handleLinkedinAuth={this.handleLinkedinAuth} venues={venues} destinations={destinations} links={siteNav} />
            {routes}
            <Footer loggedIn={loggedIn} handleLinkedinAuth={this.handleLinkedinAuth} venues={venues} destinations={destinations} links={siteNav} />
          </div>
        </BrowserRouter>
      )
    }
  }
}

export default App
