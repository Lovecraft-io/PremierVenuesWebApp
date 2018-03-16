import { Dispatcher } from 'flux'
import {
  getStore,
  createUserWithLinkedIn,
  handleLinkedinAuth,
  authenticateAccessToken,
  getPageData,
  getDestinationData,
  getVenueData,
  getBlogPostData,
  setCurrentUser,
  addSearchResults,
  logOutUser
} from '../Actions/Actions'

const AppDispatcher = new Dispatcher()

AppDispatcher.register(payload => {
  let action = payload.action

  switch (action) {
    case 'get-app-store':
      getStore()
      break

    case 'get-page-data':
      getPageData(payload.page_slug)
      break

    case 'handle-linkedin-auth':
      handleLinkedinAuth()
      break

    case 'authenticate-access-token':
      authenticateAccessToken()
      break

    case 'get-destination-data':
      getDestinationData(payload.destination)
      break

    case 'get-venue-data':
      getVenueData(payload.venue)
      break

    case 'get-blogPost-data':
      getBlogPostData(payload.blogPost)
      break

    case 'create-user-linkedin':
      createUserWithLinkedIn({ ...payload.data })
      break

    case 'set-current-user':
      setCurrentUser(payload.currentUser)
      break

    case 'log-out-user':
      logOutUser()
      break

    case 'add-search-results':
      addSearchResults(payload.data)
      break

    default:
      return true
  }

  return true
})

export default AppDispatcher
