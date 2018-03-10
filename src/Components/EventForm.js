import React, {Component} from 'react'
import _ from 'lodash'
import Axios from 'axios'
import AppStore from '../Flux/Stores/AppStore'

export default class EventForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      eventType: '',
      location: '',
      numberOfPeople: '',
      when: ''
    }
    this.handleEventType = this.handleEventType.bind(this)
    this.handleLocation = this.handleLocation.bind(this)
    this.handleNumberOfPeople = this.handleNumberOfPeople.bind(this)
    this.handleWhen = this.handleWhen.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleEventType(e) {
    e.preventDefault()
    this.setState({eventType: e.target.value})
  }
  handleLocation(e) {
    e.preventDefault()
    this.setState({location: e.target.value})
  }
  handleNumberOfPeople(e) {
    e.preventDefault()
    this.setState({numberOfPeople: e.target.value})
  }
  handleWhen(e) {
    e.preventDefault()
    this.setState({when: e.target.value})
  }
  sendToSlack = (data) => {
    const options = {text: 'New event inquiry: ' + JSON.stringify(data)}
    Axios.post('https://hooks.slack.com/services/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', JSON.stringify(options))
    .then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
  }

  componentDidMount() {
    const NLForm = window.NLForm
    const form = new NLForm(document.getElementById( 'nl-form'))
  }
  handleSubmit(e) {
    e.preventDefault()
    const {currentUser} = AppStore.data
    const data = {...this.state}
    if(currentUser) {
      console.log("Current User")
      console.log(currentUser)
      data.member = {...currentUser}
    }
    
    this.sendToSlack(data)
  }

  render() {
    
    const {venues, destinations} = this.props
    const people = _.range(1, 600)
    const selectPeople = () => people.map((number) => <option value={number}>{number}</option>)
    const venueOptions = () => venues.map((venue) => <option value={venue.venueName}>{venue.venueName}</option>)
    const destinationOptions = () => destinations.map((destination) => <option value={destination.destinationName}>{destination.destinationName}</option>)

    return (
      <form id="nl-form" className="nl-form" onSubmit={this.handleSubmit}>
      I am planning a(n)
       <select value={this.state.value} onChange={this.handleEventType}>
        <option value={null} selected>event type</option>
        <option value="wedding">wedding</option>
        <option value="business event">business event</option>
        <option value="gallery">gallery</option>
        <option value="fashion">fashion</option>
      </select>
      <br />in
       <select value={this.state.value} onChange={this.handleLocation}>
        <option value={null} selected>location</option>
        {destinationOptions()}
      </select>
      for
       <select value={this.state.value} onChange={this.handleNumberOfPeople}>
        <option value="0" selected>#</option>
        {selectPeople()}
      </select> people
      <br />
      on <input type="text" value={this.state.when} placeholder="date" data-subline="New Years Eve" onChange={this.handleWhen}/>
      <div className="nl-submit-wrap">
        <button className="nl-submit" type="submit" onClick={this.handleSubmit}>Find My Venue</button>
      </div>
      <div className="nl-overlay"></div>
    </form>
    )
  }
}