import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import AppDispatcher from '../Flux/Dispatchers/AppDispatcher'
import { Link } from 'react-router-dom'

export const SiteMenu = props => {
  return (
    <Menu pointing secondary>
       <Menu.Item>
          <div className="logo" ><Link to='/'>Premier Venues</Link></div>
        </Menu.Item>
      <Menu.Menu position="right">
      {props.links.map(link => (
        <Menu.Item>
          <Link to={link.toLowerCase()}>{link}</Link>
        </Menu.Item>
      ))}
        <Menu.Item>
          <span onClick={() => props.handleLinkedinAuth()}>Sign Up</span>
        </Menu.Item>
        <Menu.Item>
          <span onClick={() => props.handleLinkedinAuth()}>Login</span>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}
