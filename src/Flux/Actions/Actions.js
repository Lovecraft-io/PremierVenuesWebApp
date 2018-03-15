import React from 'react'
import AppStore from '../Stores/AppStore'
import * as Contentful from 'contentful'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import moment from 'moment'
import Auth from '../../Containers/Auth/Auth'
import { DATABASE_FUNCTIONS } from '../../Database/databaseFunctions'
const auth = new Auth()

export const getStore = () => {
  const CMS = Contentful.createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
    accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN
  })
  CMS.getEntries().then(response => {
    const { items } = response
    console.log(items)
    const pages = _.filter(
      items,
      item => item.sys.contentType.sys.id == 'page'
    ).map(page => (page = { ...page.fields }))

    const blogPosts = _.filter(
      items,
      item => item.sys.contentType.sys.id == 'blogPost'
    ).map(blogPost => {
      let formattedBlogPost = { ...blogPost.fields }
      formattedBlogPost.id = blogPost.sys.id 
      formattedBlogPost.createdAt = blogPost.sys.createdAt
      return formattedBlogPost
    })

    const sortedPosts = blogPosts.sort((a, b) => {
      return moment.utc(a.createdAt).diff(moment.utc(b.createdAt))
    })
    // pages.forEach((page) => page.modules ? page.modules.map(module => {...module.fields}) : page = page)

    console.log(pages)
    
    const venues = _.filter(
      items,
      item => item.sys.contentType.sys.id == 'venue'
    ).map(venue => (venue = { ...venue.fields }))

    const destinations = _.filter(
      items,
      item => item.sys.contentType.sys.id == 'destination'
    ).map(destination => (destination = { ...destination.fields }))
    
    let siteNav = []
    pages.forEach(page => {
      if (page.pageTitle !== 'Landing Page') {
        siteNav.push(page.pageTitle.split(' ')[0])
      }
    })

    AppStore.data.siteNav = siteNav
    AppStore.data.pages = {}
    pages.forEach(page => (AppStore.data.pages[page.pageSlug] = page))
    AppStore.data.venues = venues
    AppStore.data.destinations = destinations
    AppStore.data.blogPosts = sortedPosts
    AppStore.data.ready = true
    console.log(AppStore.data)

    AppStore.emitChange()
  })
}

export const getPageData = page_slug => {
  const { data } = AppStore
  const { pages } = data
  const page = pages[page_slug]
  console.log(page)
  AppStore.data.currentPage = page
  AppStore.emitChange()
}
export const setCurrentUser = (user) => {
  console.log(user)
  AppStore.data.currentUser = { ...user }
  AppStore.data.currentUser.loggedIn = true
  localStorage.setItem('currentUser', JSON.stringify(AppStore.data.currentUser))
  AppStore.emitChange()

}

const createUser = async profile => {
  let status = await DATABASE_FUNCTIONS.addNewUser(profile)
  console.log(status)
  if (status) {
    AppStore.data.currentUser = { ...profile }
    AppStore.data.currentUser.loggedIn = true
    AppStore.emitChange()
    localStorage.setItem('currentUser', JSON.stringify(AppStore.data.currentUser))
    window.Intercom('boot', {
      app_id: 'epird752',
      ...AppStore.data.currentUser
   })
    return <Redirect to="/" />
  }
}

export const handleLinkedinAuth = () => {
  console.log('in Actions #handleLinkedinAuth')
  auth.login()
}
export const authenticateAccessToken = () => {
  console.log('in Actions #authenticateAccessToken')
  const accessToken = auth.getAccessToken()
  if (accessToken) {
    auth.getProfile(async (err, profile) => {
      if (err) {
        console.log(err)
      }
      const existingUser = await DATABASE_FUNCTIONS.checkForExistingUser(
        profile
      )
      console.log(profile)
      console.log(existingUser)
      if (!existingUser) {
        createUser(profile)
      } else {
        AppStore.data.currentUser = { ...profile }
        AppStore.data.currentUser.loggedIn = true
        AppStore.emitChange()
        localStorage.setItem('currentUser', JSON.stringify(AppStore.data.currentUser))
        window.Intercom('boot', {
          app_id: 'epird752',
          ...AppStore.data.currentUser
       })
        return <Redirect to="/" />
      }
    })
  }
}

export const addSearchResults = (data) => {
  const {searchResults, searchParameters } = data
  console.log(searchResults)
  console.log(searchParameters)
  AppStore.data.searchResults = searchResults
  AppStore.data.searchParameters = searchParameters
  AppStore.emitChange()
  localStorage.setItem('searchResults', JSON.stringify(searchResults))
  localStorage.setItem('searchParameters', JSON.stringify(searchParameters))
  return <Redirect to="/search/results" />
}

export const getDestinationData = (destination) => {
  console.log(destination)
  const {destinations} = AppStore.data 
  const currentDestination = _.find(destinations, (d) => d.destinationName === destination)
  console.log(currentDestination)
  AppStore.data.currentDestination = currentDestination
  AppStore.emitChange()
 
}

export const getVenueData = (venue) => {
  console.log(venue)
  const {venues} = AppStore.data
  const currentVenue = _.find(venues, (d) => d.venueTitle === venue)
  AppStore.data.currentVenue = currentVenue
  AppStore.emitChange()
}

export const getBlogPostData = (blogPost) => {
  console.log(blogPost)
  const {blogPosts} = AppStore.data 
  const currentBlogPost = _.find(blogPosts, (bp) => bp.blogPostTitle === blogPost)
  console.log(currentBlogPost)
  AppStore.data.currentBlogPost = currentBlogPost
  AppStore.emitChange()
}

export const createUserWithLinkedIn = data => {}
