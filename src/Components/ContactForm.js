import React, {Component} from 'react'
import Axios from 'axios'

export default class ContactForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      message: ''
    }
    this.handleName = this.handleName.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handleMessage = this.handleMessage.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleName(e) {
    e.preventDefault()
    this.setState({
      name: e.target.value
    })
  }
  handleEmail(e) {
    e.preventDefault()
    this.setState({
      email: e.target.value
    })
  }
  handleMessage(e) {
    e.preventDefault()
    this.setState({
      message: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    this.sendToSlack(this.state)
  }
  sendToSlack = (data) => {
    const options = {text: 'New Contact Form Submission: ' + JSON.stringify(data)}
    Axios.post('https://hooks.slack.com/services/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', JSON.stringify(options))
    .then((res) => {
        console.log(res)
        if(res.data === 'ok') {
          document.querySelector('.field .button').value = 'Submission received!'
        }
      }).catch((err) => {
        console.log(err)
      })
  }
  render () {
    return (
      <div id='footer-form-wrapper'>
        <h2>Contact Us</h2>
      <form onSubmit={this.handleSubmit} className='footer-form'>
        <p className='field required half'>
          <label className='label required' for='name'>Name: </label>
          <input value={this.state.name} onChange={this.handleName} className='text-input' id='name' name='name' required type='text' />
        </p>
        <p className='field required half'>
          <label className='label' for='email'>E-mail: </label>
          <input value={this.state.email} onChange={this.handleEmail} className='text-input' id='email' name='email' required type='email' />
        </p>
        <p className='field'>
          <label className='label' for='message'>Message: </label>
          <textarea value={this.state.message} onChange={this.handleMessage} className='textarea' cols='50' id='message' name='message' required rows='4'></textarea>
        </p>
        <p className='field'>
          <input className='button' type='submit' value='Send message' />
        </p>
      </form>
    </div>
    
    )
  }

}