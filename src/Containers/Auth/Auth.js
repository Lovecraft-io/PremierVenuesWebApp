import auth0 from 'auth0-js'
import AppDispatcher from '../../Flux/Dispatchers/AppDispatcher'

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'monichre.auth0.com',
    clientID: 'FHeDEC5yAG20lpS6Bx6FJyR3Z2fSfFGE',
    redirectUri: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/callback' : 'https://premiervenues.netlify.com/',
    audience: 'https://monichre.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile email'
  })

  constructor() {
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.getProfile = this.getProfile.bind(this)
  }
  userProfile

  login() {
    this.auth0.authorize()
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log(authResult)
        this.setSession(authResult)
      } else if (err) {
        console.log(err)
        return err
      }
    })
  }

  setSession(authResult) {
    let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime())
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    AppDispatcher.dispatch({
      action: 'authenticate-access-token'
    })
    // return authResult
  }
  getAccessToken() {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      throw new Error('No Access Token found')
    }
    return accessToken
  }

   getProfile(cb) {
    let accessToken = this.getAccessToken()
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if(profile) {
        console.log(err)
        this.userProfile = profile
      }
      cb(err, profile)
    })
    
  }

  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('currentUser')
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }
}
