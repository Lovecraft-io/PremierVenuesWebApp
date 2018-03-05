import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import AppDispatcher from '../Flux/Dispatchers/AppDispatcher'
import { Link } from 'react-router-dom'


const logInOrOutButton = (props) => props.loggedIn ? <Menu.Item><span onClick={() => props.handleLinkedinAuth()}>Log Out</span></Menu.Item> : <Menu.Item><span onClick={() => props.handleLinkedinAuth()}>Login</span></Menu.Item>
const signUpButton = (props) => props.loggedIn ? null : <Menu.Item><span onClick={() => props.handleLinkedinAuth()}>Sign Up</span></Menu.Item>
export const SiteMenu = props => {
  console.log(props)
  const signUpHTML = signUpButton(props)
  console.log(signUpHTML)
  
  console.log(logInOrOutButton)
  return (
    <Menu pointing secondary>
      <Menu.Item>
        <div className="logo">
          <Link to="/">Premier Venues</Link>
        </div>
      </Menu.Item>
      <Menu.Menu position="right">
        {props.links.map(link => (
          <Menu.Item>
            <Link to={link.toLowerCase()}>{link}</Link>
          </Menu.Item>
        ))}
        {logInOrOutButton(props)}
        {signUpButton(props)}
      </Menu.Menu>
    </Menu>
  )
}
