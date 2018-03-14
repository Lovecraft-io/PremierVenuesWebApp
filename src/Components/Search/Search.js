import React, { Component } from 'react'
import AppStore from '../../Flux/Stores/AppStore'
import AppDispatcher from '../../Flux/Dispatchers/AppDispatcher'
import FuzzySearch from 'fuzzy-search'
import _ from 'lodash'
import './search.css'

export default class Seach extends Component {
  state = {}
  componentDidMount() {
    const NLForm = window.NLForm
    const form = new NLForm(document.getElementById('search-form'))
    // this.parseFormAnimationData()
  }
  handleEventType = (e) => {
    e.preventDefault()
    this.setState({eventType: e.target.value})
  }
  handleLocation = (e) => {
    e.preventDefault()
    this.setState({location: e.target.value})
  }
  handleNumberOfPeople = (e) => {
    e.preventDefault()
    this.setState({numberOfPeople: e.target.value})
  }
  handleWhen = (e) => {
    e.preventDefault()
    this.setState({when: e.target.value})
  }
  handleSubmit =(e) => {
    e.preventDefault()

    const infoFields = document.querySelectorAll('.nl-dd-checked')
    const { currentUser } = AppStore.data
    const data = { ...this.state }
    let infoData = {}
    infoFields.forEach(item => {
      console.log(item)
      console.log(item.classList[0])
      let infoType = item.classList[0]
      infoData[infoType] = item.innerHTML
    })
    console.log(infoData)
    if (currentUser) {
      console.log('Current User')
      console.log(currentUser)
      infoData.member = { ...currentUser }
    }
    this.runSearch(infoData)
  }
  // parseFormAnimationData = () => {
  //   const infoFields = document.querySelectorAll('.nl-field-toggle')
  //   infoFields.forEach(field => {
  //     let type = field.innerText.split(' ')[0]
  //     let parent = field.closest('.nl-field')
  //     let list = parent.lastElementChild
  //     let options = list.querySelectorAll('li')
  //     options.forEach(option => {
  //       option.classList.add(type)
  //     })
  //   })
  // }
  runSearch = (searchData) => {
    const { venues } = AppStore.data
    console.log(venues)
    console.log(searchData.location)
    const searcher = new FuzzySearch(
      venues,
      ['venue.city, venue.venueDescription', 'city', 'venueTitle'],
      {
        caseSensitive: false,
        sort: true
      }
    )
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
  render() {
    const { event, location, number, when } = this.props
    const { venues, destinations } = AppStore.data
    const people = _.range(1, 20)
    const selectPeople = () =>
      people.map(number => <option value={number}>{number}</option>)
    const venueOptions = () =>
      venues.map(venue => (
        <option value={venue.venueName}>{venue.venueName}</option>
      ))
    const destinationOptions = () =>
      destinations.map(destination => (
        <option value={destination.destinationName}>
          {destination.destinationName}
        </option>
      ))
    return (
      <form id="search-form" className="nl-form" onSubmit={this.handleSubmit}>
        <label>You searched for a(n)</label>
        <select value={this.state.event} onChange={this.handleEventType}>
          <option value={event} selected>
            {event}
          </option>
          <option value="wedding">wedding</option>
          <option value="business event">business event</option>
          <option value="gallery">gallery</option>
          <option value="fashion">fashion</option>
        </select>
        in
        <select value={this.state.location} onChange={this.handleLocation}>
          <option value={location} selected>
            {location}
          </option>
          {destinationOptions()}
        </select>
          <label>for</label>
        <select value={this.state.value} onChange={this.handleNumberOfPeople}>
          <option value={number} selected>
            {number}
          </option>
          {selectPeople()}
        </select>
        <label>people on</label>
        <input
          type="text"
          value={this.state.when}
          placeholder={when}
          data-subline="New Years Eve"
          onChange={this.handleWhen}
        />
        <div className="nl-submit-wrap">
          <button
            className="nl-submit"
            type="submit"
            onClick={this.handleSubmit}>
            Find My Venue
          </button>
        </div>
        <div className="nl-overlay" />
      </form>
    )
  }
}
