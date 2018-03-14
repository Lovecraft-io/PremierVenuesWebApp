import React, {Component} from 'react'
import _ from 'lodash'
import Axios from 'axios'
import FuzzySearch from 'fuzzy-search'
import AppStore from '../Flux/Stores/AppStore'
import AppDispatcher from '../Flux/Dispatchers/AppDispatcher'

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
  componentDidMount() {
    const NLForm = window.NLForm
    const form = new NLForm(document.getElementById( 'nl-form'))
    this.parseFormAnimationData()
  }
  handleSubmit(e) {
    e.preventDefault()
    const infoFields = document.querySelectorAll('.nl-dd-checked')
    const {currentUser} = AppStore.data
    
    const data = {...this.state}
    let infoData = {}

    console.log(infoFields)
    infoFields.forEach((item) => {
      console.log(item)
      console.log(item.classList[0])
      let infoType = item.classList[0]
      infoData[infoType] = item.innerHTML
    })
    console.log(infoData)
    if(currentUser) {
      console.log("Current User")
      console.log(currentUser)
      infoData.member = {...currentUser}
    }
    let inquiry = this.formatInquiry(infoData)
    this.sendToSlack(inquiry)
    this.runSearch(infoData)
  }
  formatInquiry(data) {
    let userData = data.member ? `Premier Venues platform member ${data.member.name} requests information regarding a` : ''
    let user = userData.length > 0 ? userData : 'A new user on the Premier Venues platform requests information regarding a'
    let contact = userData.length > 0 ? `They can be reached at ${data.member.email}` : ''
    let string = `${user} ${data.event} in ${data.location} with ${data.number} of people on ${data.when}. ${contact}`
    return string
  }
  parseFormAnimationData() {
    const infoFields = document.querySelectorAll('.nl-field-toggle')
    infoFields.forEach((field) => {
      let type = field.innerText.split(' ')[0]
      let parent = field.closest('.nl-field')
      let list = parent.lastElementChild
      let options = list.querySelectorAll('li')
      options.forEach((option) => {
        option.classList.add(type)
      })
    })
  }
  runSearch(searchData) {
    const {venues} = AppStore.data
    console.log(venues)
    console.log(searchData.location)
    const searcher = new FuzzySearch(venues, ['venue.city, venue.venueDescription', 'city', 'venueTitle'], {
      caseSensitive: false,
      sort: true
    })
    const results = searcher.search(searchData.location)
    console.log(results)
    AppDispatcher.dispatch({
      action: 'add-search-results',
      data: {
        searchResults: results,
        searchParameters: searchData
      }
    })
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
  render() {
    const {venues, destinations} = this.props
    const people = _.range(1, 20)
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
        <option value="0" selected>number of</option>
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