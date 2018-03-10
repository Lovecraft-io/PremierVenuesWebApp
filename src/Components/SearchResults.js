import React, { Component } from 'react'
import { ContentPreviewCard } from './ContentPreviewCard'
import AppStore from '../Flux/Stores/AppStore'
export default class SearchResults extends Component {
  render() {
    const { searchResults } = AppStore.data
    console.log(searchResults)
    return (
      <div>{searchResults.map(venue => <ContentPreviewCard venue={venue} />)}</div>
    )
  }
}
