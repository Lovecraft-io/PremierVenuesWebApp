import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'

export const Header = props => {
  console.log(props)
  return (
    <Menu inverted>
      <Menu.Item>
        <h1>Premier Venues</h1>
      </Menu.Item>
      <Menu.Menu position="right">
        {props.links.map(link => (
          <Menu.Item as={() => <Link to={link.toLowerCase()}>{link}</Link>} />
        ))}
        <Menu.Item>
          <Button>Sign Up</Button>
        </Menu.Item>
        <Menu.Item>
          <Button>Login</Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}
