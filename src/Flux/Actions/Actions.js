import AppStore from '../Stores/AppStore'
import * as Contentful from 'contentful'
import _ from 'lodash'
import moment from 'moment'

export const getStore = () => {
  const CMS = Contentful.createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
    accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN
  })
  CMS.getEntries().then(response => {
    const { items } = response
    console.log(items)
    AppStore.data.ready = true
    AppStore.emitChange()
  })
}
