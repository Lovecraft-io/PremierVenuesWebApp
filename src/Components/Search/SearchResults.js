import React, { Component } from 'react'
import { ContentPreviewCard } from '../ContentPreviewCard'
import AppStore from '../../Flux/Stores/AppStore'
import Search from './Search'

export default class SearchResults extends Component {
  render() {
    let { searchResults, searchParameters } = AppStore.data
    if(!searchResults && !searchParameters) {
      searchResults = JSON.parse(localStorage.getItem('searchResults'))
      searchParameters = JSON.parse(localStorage.getItem('searchParameters'))
    }  
    return (
      <div className="component" id="SearchResults">
        <section>
          <Search event={searchParameters.event} location={searchParameters.location} number={searchParameters.number} when={searchParameters.when}/>
        </section>
        {searchResults.length > 0 
        ? searchResults.map(venue => <ContentPreviewCard venue={venue} />)
        : <h2>Sorry, There are currently no venues that match your search</h2>
        }
      </div>
    )
  }
}
