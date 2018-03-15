import React, {Component} from 'react'

export default class ContactForm extends Component {
  render () {
    return (
      <div id='footer-form-wrapper'>
        <h2>Contact Us</h2>
      <form action='' className='footer-form'>
        <p className='field required half'>
          <label className='label required' for='name'>Name</label>
          <input className='text-input' id='name' name='name' required type='text' />
        </p>
        <p className='field required half'>
          <label className='label' for='email'>E-mail</label>
          <input className='text-input' id='email' name='email' required type='email' />
        </p>
        <p className='field'>
          <label className='label' for='message'>Message</label>
          <textarea className='textarea' cols='50' id='message' name='message' required rows='4'></textarea>
        </p>
        <p className='field'>
          <input className='button' type='submit' value='Send message' />
        </p>
      </form>
    </div>
    
    )
  }

}