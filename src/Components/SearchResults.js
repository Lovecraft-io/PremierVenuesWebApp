import React, { Component } from 'react'
import { ContentPreviewCard } from './ContentPreviewCard'
import AppStore from '../Flux/Stores/AppStore'
export default class SearchResults extends Component {
  render() {
    let { searchResults, searchParameters } = AppStore.data
    if(!searchResults && !searchParameters) {
      searchResults = JSON.parse(localStorage.getItem('searchResults'))
      searchParameters = JSON.parse(localStorage.getItem('searchParameters'))
    }
    console.log(searchResults)
    console.log(searchParameters)
    let date = searchParameters.when ? searchParameters.when : ''
    let searchTerms = `You're looking for an ${searchParameters.event} space in ${searchParameters.location} for ${searchParameters.number} attendees on ${date}`
    return (
      <div className="component" id="SearchResults">
        <section>
          <h1>{searchTerms}</h1>
        </section>
        {searchResults.map(venue => <ContentPreviewCard venue={venue} />)}
      </div>
    )
  }
}
