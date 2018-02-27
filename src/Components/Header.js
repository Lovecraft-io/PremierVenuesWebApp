import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'

export const Header = props => {
  console.log(props)
  return (
    <header id="site-header">
      <Menu inverted id="site-nav">
        <Menu.Item>
          <h1>Premier Venues</h1>
        </Menu.Item>
        <Menu.Menu position="right">
          {props.links.map(link => (
            <Menu.Item
              as={() => (
                <li>
                  <Link to={link.toLowerCase()}>{link}</Link>
                </li>
              )}
            />
          ))}
          <Menu.Item>
            <Button>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Button>
              <Link to="/login">Login</Link>
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </header>
  )
}
