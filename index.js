const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const apiRouter = require('./routes/api')
const bodyParser = require('body-parser')

const db = 'mongodb://127.0.0.1:27017,127.0.0.1:27018,127.0.0.1:27019/arellano?replicaSet=rs0'
const dbOptions = {
  auto_reconnect: false
}
var connectWithRetry = () => {
  return mongoose.connect(db, dbOptions, (err) => {
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec', err)
      setTimeout(connectWithRetry, 5000)
    }
  })
}
connectWithRetry()

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization')
  next()
})
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', apiRouter)

app.listen(3001, function (req, res) {
  console.log('magic happens on http://localhost:3001')
})
