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
    const pages = _.filter(items, (item) => item.sys.contentType.sys.id == 'page')
    const blogPosts = _.filter(items, (item) => item.sys.contentType.sys.id == 'blogPost')
    const venues = _.filter(items, (item) => item.sys.contentType.sys.id == 'venue')
    const destinations = _.filter(items, (item) => item.sys.contentType.sys.id == 'destination')
    const siteNav = pages.map(page => page.fields.pageTitle.split(' ')[0])
        
    AppStore.data.siteNav = siteNav
    AppStore.data.pages = {}
    pages.forEach((page) => AppStore.data.pages[page.fields.pageTitle] = page)
    AppStore.data.ready = true
    console.log(AppStore.data)

    AppStore.emitChange()
  })
}
