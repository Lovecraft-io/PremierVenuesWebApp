import React, { Component } from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'

import { Link, Redirect } from 'react-router-dom'
import AppStore from '../Flux/Stores/AppStore'
const {data} = AppStore


const logInOrOutButton = (props) => props.loggedIn ? <Menu.Item><span onClick={() => props.handleLinkedinAuth()}>Log Out</span></Menu.Item> : <Menu.Item><span onClick={() => props.handleLinkedinAuth()}>Login</span></Menu.Item>
const signUpButton = (props) => props.loggedIn ? null : <Menu.Item><span onClick={() => props.handleLinkedinAuth()}>Sign Up</span></Menu.Item>
const handleRedirect = (e) => {
 const venue = e.target.replace('/venues/', '')
 console.log(venue)
}

const dropDownMenu = (title, links) => (  
  <Dropdown pointing className='link item' text={title}>
      <Dropdown.Menu>
        <Dropdown.Item><Link to={`/${encodeURI(title.toLowerCase())}`}>All {title}</Link></Dropdown.Item>
        {links.map((link) => (
          <Dropdown.Item>
            <Link to={link.venueTitle ? `/venues/${link.venueTitle }` : `/destinations/${link.destinationName }`} onClick={(e) => handleRedirect(e)}>{link.venueTitle ? link.venueTitle : link.destinationName}</Link>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
)
const renderNavItems = (link, venues, destinations) => {
  if(link === 'Venues') {
    return dropDownMenu('Venues', venues)    
  } else if (link === 'Destinations') {
    return dropDownMenu('Destinations', destinations)    
  } else {
    if(link === 'Account' && (data.currentUser && data.currentUser.loggedIn) ) {
      return (
        <Menu.Item>
        <Link to={'/' + encodeURI(link.toLowerCase())}>{link}</Link>
      </Menu.Item>
      )
    } else if (link !== 'Account') {
      return (
        <Menu.Item>
        <Link to={'/' + encodeURI(link.toLowerCase())}>{link}</Link>
      </Menu.Item>
      )
    }
  }
}

export const SiteMenu = props => {
  
  const nav = props.links.map(link => renderNavItems(link, props.venues, props.destinations))
  
  return (
    <Menu pointing secondary id="site-menu">
      <Menu.Item>
        <div className="logo">
          <Link to="/">Premier Venues</Link>
        </div>
      </Menu.Item>
      <Menu.Menu position="right">
        {nav}
        {logInOrOutButton(props)}
        {signUpButton(props)}
      </Menu.Menu>
    </Menu>
  )
}
