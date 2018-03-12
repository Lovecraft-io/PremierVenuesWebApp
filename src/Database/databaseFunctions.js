import Firebase from '../firebase.config.js'
import uuidv4 from 'uuid/v4'
import _ from 'lodash'
const usersRef = Firebase.database().ref('users/')
const userRef = id => Firebase.database().ref(`users/${id}`)

export const DATABASE_FUNCTIONS = {
  addNewUser: async userData => {
    const user = { ...userData }
    let status = false
    if (user) {
      user.id = uuidv4()
      status = await userRef(user.id).set({ ...user }, (err, data) => {
        if (err) {
          console.log(err)
          status = err
        }
        console.log('User successfully added to database')
        status = true
      })
      return status
    }
  },

  checkForExistingUser: async incomingUser => {
    let existingUser = false
    let possibleUser = await usersRef.once('value', snapshot => {
      snapshot.forEach(childSnap => {
        console.log(childSnap.val())
        let databaseUser = childSnap.val()
        if (databaseUser && (databaseUser.email === incomingUser.email)) {
          existingUser = true
        }
      })
      return existingUser
    })
    console.log(existingUser)
    return existingUser
  }
}
