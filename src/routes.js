import React from 'react'
import AppStore from './Flux/Stores/AppStore'
import { Route, Switch } from 'react-router-dom'
import Home from './Containers/Pages/Home/Home'
import Blog from './Containers/Pages/Blog/Blog'
import BlogPost from './Containers/Pages/Blog/BlogPost'
import About from './Containers/Pages/About/About'
import Destinations from './Containers/Pages/Destinations/Destinations'
import DestinationSpecific from './Containers/Pages/Destinations/DestinationSpecific'
import Venues from './Containers/Pages/Venues/Venues'
import VenueSpecific from './Containers/Pages/Venues/VenueSpecific'
import Account from './Containers/Pages/Account/Account'
import Login from './Containers/Auth/Login'
import SignUp from './Containers/Auth/SignUp'
import Loader from './Containers/Auth/Loader'
import Auth from './Containers/Auth/Auth'
import SearchResults from './Components/Search/SearchResults'

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
    path: '/blog/:blogPost',
    exact: true,
    component: BlogPost
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
    path: '/destinations/:destination',
    exact: true,
    component: DestinationSpecific
  },
  {
    path: '/venues',
    exact: true,
    component: Venues
  },
  {
    path: '/venues/:venueName',
    exact: true,
    component: VenueSpecific
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
    path: '/search/results',
    exact: true,
    component: SearchResults
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
  <Switch>
      {routesArray.map((route, i) => (
        <Route exact path={route.path} render={(props) => {
            if(route.path === '/callback/') {
              handleAuthentication(props)
              window.Intercom("update")
              return <route.component key={i} {...props} {...data}/>
            } else {
              window.Intercom("update")
              return <route.component key={i} {...props} {...data}/>
            }
          }
        }/>
        ))}
    </Switch>
  )