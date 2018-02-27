import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppDispatcher from './Flux/Dispatchers/AppDispatcher'
import AppStore from './Flux/Stores/AppStore'
import routes from './routes'
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
    return (
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    )
  }
}

export default App
