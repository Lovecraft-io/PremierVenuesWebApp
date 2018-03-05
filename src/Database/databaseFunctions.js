import Firebase from '../firebase.config.js'
import uuidv4 from 'uuid/v4'
export const DATABASE_FUNCTIONS = {
  addNewUser: (userData) => {
    const user = {...userData}
    if(user) {
      user.id = uuidv4()
      console.log(user)
      Firebase.database().ref('users/' + user.id).set({...user}, (err, data) => {
        if (err) {
          console.log(err)
        }
        console.log(data)
      })
    }
  }
}