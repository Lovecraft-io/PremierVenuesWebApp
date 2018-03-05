import React, { Component } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import AppDispatcher from './Flux/Dispatchers/AppDispatcher'
import AppStore from './Flux/Stores/AppStore'
import { SiteMenu } from './Components/SiteMenu'
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
    AppStore.addChangeListener(this._onChange.bind(this))
  }
  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange.bind(this))
  }
  getStore() {
    AppDispatcher.dispatch({
      action: 'get-app-store'
    })
  }
  componentWillMount() {
    this.getStore()
  }
  _onChange() {
    this.setState(AppStore)
  }
  handleLinkedinAuth() {
    AppDispatcher.dispatch({action: 'handle-linkedin-auth'})
  } 

  render() {
    const { data } = AppStore
    const { siteNav } = data
    if (!data.ready) {
      this.getStore()
      return 'Loading'
    } else {
      return (
        <BrowserRouter {...data}>
          <div>
            <SiteMenu handleLinkedinAuth={this.handleLinkedinAuth} links={siteNav} />
            {routes}
          </div>
        </BrowserRouter>
      )
    }
  }
}

export default App
