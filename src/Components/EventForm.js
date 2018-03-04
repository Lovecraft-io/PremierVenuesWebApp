import React, {Component} from 'react'

export default class EventForm extends Component {
  render() {
    return (
      <form id="nl-form" className="nl-form">
      I am planning a(n)
      <select>
        <option value="1" selected>event type</option>
        <option value="2">Indian</option>
        <option value="3">French</option>
        <option value="4">Japanese</option>
        <option value="2">Italian</option>
      </select>
      <br />in
      <select>
        <option value="1" selected>location</option>
        <option value="2">fancy</option>
        <option value="3">hip</option>
        <option value="4">traditional</option>
        <option value="2">romantic</option>
      </select>
      for
      <select>
        <option value="1" selected>#</option>
         <option value="1">7 p.m.</option>
         <option value="2">8 p.m.</option>
         <option value="3">9 p.m.</option>
      </select> people
      <br />
      on <input type="text" value="" placeholder="date" data-subline="New Years Eve"/>
      <div className="nl-submit-wrap">
        <button className="nl-submit" type="submit">Find My Venue</button>
      </div>
      <div className="nl-overlay"></div>
    </form>
    )
  }
}