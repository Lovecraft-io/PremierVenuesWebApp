import AppStore from '../Stores/AppStore'
import * as Contentful from 'contentful'
import Axios from 'axios'
import _ from 'lodash'
import moment from 'moment'
import Auth from '../../Containers/Auth/Auth'
const auth = new Auth()

export const getStore = () => {
  const CMS = Contentful.createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
    accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN
  })
  CMS.getEntries().then(response => {
    const { items } = response
    const pages = _.filter(items, item => item.sys.contentType.sys.id == 'page')
    const blogPosts = _.filter(
      items,
      item => item.sys.contentType.sys.id == 'blogPost'
    )
    const venues = _.filter(
      items,
      item => item.sys.contentType.sys.id == 'venue'
    )
    const destinations = _.filter(
      items,
      item => item.sys.contentType.sys.id == 'destination'
    )
    const siteNav = pages.map(page => page.fields.pageTitle.split(' ')[0])

    AppStore.data.siteNav = siteNav
    AppStore.data.pages = {}
    pages.forEach(page => (AppStore.data.pages[page.fields.pageTitle] = page))
    AppStore.data.ready = true
    console.log(AppStore.data)

    AppStore.emitChange()
  })
}

export const getPageData = (page_slug) => {
  const {data} = AppStore
  const {pages} = data
  console.log(pages)
  console.log(page_slug)
  const page = pages[page_slug]
  console.log(page)

  AppStore.data.currentPage = page
  AppStore.emitChange()
}

const getAccessToken = () => {
  const accessToken = localStorage.getItem('access_token')
  if (!accessToken) {
    throw new Error('No Access Token found')
  }
  return accessToken
}
const getProfile = cb => {
  let accessToken = getAccessToken()
  auth.auth0.client.userInfo(accessToken, (err, profile) => {
    if (profile) {
      console.log(profile)
    }
    cb(err, profile)
  })
}
const addUserToDatabase = (err, user) => {
  console.log('Add use to the database')
  console.log(user)
}
const createUser = () => {
  console.log('Creating user')
  getProfile(addUserToDatabase)
}

export const handleLinkedinAuth = () => {
  console.log('in Actions #handleLinkedinAuth')
  auth.login()
}
export const authenticateAccessToken = () => {
  console.log('in Actions #authenticateAccessToken')
  auth.handleAuthentication()
  createUser()
}

export const createUserWithLinkedIn = data => {}
