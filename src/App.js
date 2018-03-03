import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppDispatcher from './Flux/Dispatchers/AppDispatcher'
import AppStore from './Flux/Stores/AppStore'
import { Header } from './Components/Header'
import routes from './routes'
import 'semantic-ui-css/semantic.min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
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

  render() {
    const { data } = AppStore
    const { siteNav } = data
    console.log(data)
    if (!data.ready) {
      this.getStore()
      return "Loading"
    } else {
      return (
        <BrowserRouter {...data}>
          <div>
            <Header links={siteNav} />
            {routes}
          </div>
        </BrowserRouter>
      )
    }
  }
}

export default App
