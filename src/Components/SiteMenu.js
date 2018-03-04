import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon, Layout } from 'antd'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

const { Header } = Layout

export const SiteMenu = props => {
  return (
    <Menu 
      style={{ lineHeight: '64px' }}
      mode="horizontal" 
      id="site-nav">
        {props.links.map(link => (
          <Menu.Item>
            <Link to={link.toLowerCase()}>{link}</Link>
          </Menu.Item>
        ))}
        <Menu.Item>
          <Link to="/signup">Sign Up</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/login">Login</Link>
        </Menu.Item>
      </Menu>
  )
}
