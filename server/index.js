require('dotenv').load()

const express = require('express')
const Axios = require('axios')
const cors = require("express-cors")
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const PORT = (process.env.PORT || 3001)


/* 
  App Config
  ==========================================================================
*/
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use(express.static(path.resolve(__dirname, '../client/build')))
app.use(bodyParser.json({ strict: false }))

/*
  ROUTES
  ============================================================================
*/

// app.post('/linkedin/auth', (req, res) => {
//   const {endpoint, grant_type, code, redirect_uri, client_id, client_secret} = req.body
//   Axios.post(`https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}&client_id=${client_id}&client_secret=${client_secret}`)
//     .then(function(response) {
//       console.log(response)
//       // res.send(BACKEND_SPOTIFY_FUNCTIONS.returnAuthorizeUrl(state))
//     })
//     .catch(function(error) {
//       console.log(error)
//     })
// })

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`)
})

