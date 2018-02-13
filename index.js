const express = require('express')
const app = express()
const morgan = require('morgan')
const clients = require('./mocks/clients')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/arellano')

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization')
  next()
})
app.use(morgan('dev'))

const apiRouter = express.Router()

apiRouter.get('/', (req, res) => {
  res.json({message: 'Welcome to the api'})
})

app.use('/api', apiRouter)

// app.get('/api', (req, res)=> {
//   let q = req.query.q;
//   const reQuery = new RegExp(q)
//   console.log(q)
//   res.json(clients.filter(client => reQuery.test(client.code)))
// });
app.listen(3001, function (req, res) {
  console.log('magic happens on http://localhost:3001')
})
