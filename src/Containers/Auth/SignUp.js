import React, { Component } from 'react'
import AppDispatcher from '../../Flux/Dispatchers/AppDispatcher'
import {WrappedRegistrationForm} from '../../Components/RegistrationForm'
import Auth from './Auth'
import { Row, Col } from 'antd'
const auth = new Auth()

export default class Login extends Component {
  constructor() {
    super()

    this.handleLinkedinAuth = this.handleLinkedinAuth.bind(this)
  }
  componentDidMount() {}

  handleLinkedinAuth() {
    AppDispatcher.dispatch({
      action: 'handle-linkedin-auth'
    })
  }

  render() {
    const buttonScript = <script type="in/Login" />

    return (
      <div id="SignUp">
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <WrappedRegistrationForm />
          </Col>
          <Col className="gutter-row" span={12}>
            <button onClick={this.handleLinkedinAuth}>
              <img src="/linkedinButton.png" alt="" />
            </button>
          </Col>
        </Row>
      </div>
    )
  }
}
