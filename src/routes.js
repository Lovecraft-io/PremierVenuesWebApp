import React from 'react'
import AppStore from './Flux/Stores/AppStore'
import { Route } from 'react-router-dom'
import Home from './Containers/Pages/Home/Home'
import Blog from './Containers/Pages/Blog/Blog'
import About from './Containers/Pages/About/About'
import Destinations from './Containers/Pages/Destinations/Destinations'
import Venues from './Containers/Pages/Venues/Venues'
import Account from './Containers/Pages/Account/Account'
import Login from './Containers/Auth/Login'
import SignUp from './Containers/Auth/SignUp'
import Loader from './Containers/Auth/Loader'
import Auth from './Containers/Auth/Auth'

const routesArray = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/blog',
    exact: true,
    component: Blog
  },
  {
    path: '/about',
    exact: true,
    component: About
  },
  {
    path: '/destinations',
    exact: true,
    component: Destinations
  },
  {
    path: '/venues',
    exact: true,
    component: Venues
  },
  {
    path: '/login',
    exact: true,
    component: Login
  },
  {
    path: '/callback/',
    exact: true,
    component: Loader
  },
  {
    path: '/signup',
    exact: true,
    component: SignUp
  },
  {
    path: '/account/:id',
    exact: true,
    component: Account
  }
]

const {data} = AppStore
const auth = new Auth()

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}


export default(
  
  <div>
      {routesArray.map((route, i) => (
        <Route exact path={route.path} render={(props) => {
            if(route.path === '/callback/') {
              handleAuthentication(props)
              return <route.component key={i} {...props} {...data}/>
            } else {
              return <route.component key={i} {...props} {...data}/>
            }
          }
        }/>
        ))}
    </div>
  )