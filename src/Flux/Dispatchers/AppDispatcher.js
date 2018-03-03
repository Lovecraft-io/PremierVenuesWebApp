import { Dispatcher } from 'flux'
import {
  getStore,
  createUserWithLinkedIn,
  handleLinkedinAuth,
  authenticateAccessToken,
  getPageData
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

    case 'create-user-linkedin':
      createUserWithLinkedIn({ ...payload.data })
      break

    default:
      return true
  }

  return true
})

export default AppDispatcher