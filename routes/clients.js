const Client = require('../app/models/client')
const { sortBy } = require('lodash')
const nextClientCode = require('../utils/nextClientCode')

module.exports = (apiRouter, route) => {
  apiRouter.route(route)
  .post(async(req, res) => {
    const client = new Client()

    try {
      client.code = await generateClientCode()
      client.name = req.body.name
      client.businnessName = req.body.businnessName
      client.address = req.body.address
      client.postalCode = req.body.postalCode

      client.save(err => {
        if (err) return res.send(err)
        res.json({ message: 'Client created' })
      })
    } catch (err) {
      res.send(err)
    }
  })
  .get((req, res) => {
    Client.find((err, clients) => {
      if (err) res.send(err)
      res.json(clients)
    })
  })

  function generateClientCode () {
    return new Promise((resolve, reject) => {
      Client.find((err, clients) => {
        if (err) reject(new Error('While accessing db for clients'))

        const codes = clients.reduce((acc, client) => {
          return acc.concat(client.code)
        }, [])
        resolve(nextClientCode(sortBy(codes)))
      })
    })
  }
}
