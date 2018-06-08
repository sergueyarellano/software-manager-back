const express = require('express')
const apiRouter = express.Router()
const routeClients = require('./clients')
const routeClient = require('./client')

apiRouter.use((req, res, next) => {
  console.log('Somebody just came to our api!')
  next()
})

apiRouter.get('/', (req, res) => {
  res.json({message: 'Welcome to the api'})
})

routeClients(apiRouter, '/clients')
routeClient(apiRouter, '/clients/:client_id')

module.exports = apiRouter
