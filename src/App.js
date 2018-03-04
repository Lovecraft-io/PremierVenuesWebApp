import React, { Component } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import AppDispatcher from './Flux/Dispatchers/AppDispatcher'
import AppStore from './Flux/Stores/AppStore'
import { SiteMenu } from './Components/SiteMenu'
import routes from './routes'
import { Layout } from 'antd'
import 'antd/dist/antd.css'
import './App.css'
const { Header, Footer, Sider, Content } = Layout

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
    if (!data.ready) {
      this.getStore()
      return "Loading"
    } else {
      return (
        <BrowserRouter {...data}>
          <Layout>
            <Header style={{ position: 'fixed', width: '100%' }}>
              <div className="logo" ><Link to='/'>Premier Venues</Link></div>
              <SiteMenu links={siteNav} />
            </Header>
            <Content style={{ marginTop: '85px' }}>  
            {routes}
            </Content>
            
          </Layout>
        </BrowserRouter>
      )
    }
  }
}

export default App
