import React from 'react'
import { Route } from 'react-router-dom'
import Home from './Containers/Pages/Home'
import Blog from './Containers/Pages/Blog'
import About from './Containers/Pages/About'
import Destinations from './Containers/Pages/Destinations'
import Venues from './Containers/Pages/Venues'
import Login from './Containers/Auth/Login'
import SignUp from './Containers/Auth/SignUp'

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
    path: '/signup',
    exact: true,
    component: SignUp
  }
]

export default(
  
    <div>
      {routesArray.map((route, i) => (
        <Route exact path={route.path} render={(props) => (
          <route.component key={i} {...props} />
        )}/>
        ))}
    </div>
  )
     
