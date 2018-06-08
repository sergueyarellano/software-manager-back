const Client = require('../app/models/client')

module.exports = (apiRouter, route) => {
  apiRouter.route(route)
  .get((req, res) => {
    const pattern = new RegExp(req.params.client_id)
    console.log('my filter pattern: ', pattern)
    if (Number.isNaN(Number(req.params.client_id))) {
      Client
      .find()
      .or([
        {name: pattern},
        {address: pattern}
      ])
      .then(clients => res.json(clients))
      .catch(err => res.send(err))
    } else {
      Client
      .find()
      .or([
        {code: req.params.client_id},
        {postalCode: req.params.client_id}
      ])
      .then(clients => res.json(clients))
      .catch(err => res.send(err))
    }
  })
  .put((req, res) => {
    Client.findById(req.params.client_id, (err, client) => {
      if (err) res.send(err)

      if (req.body.name) client.name = req.body.name
      if (req.body.businessName) client.businessName = req.body.businessName
      if (req.body.address) client.address = req.body.address
      if (req.body.postalCode) client.postalCode = req.body.postalCode

      client.save((err) => {
        if (err) res.send(err)
        res.json({message: 'client updated!'})
      })
    })
  })
  .delete((req, res) => {
    Client.remove({_id: req.params.client_id}, (err) => {
      if (err) return res.send(err)
      res.json({message: `successfully deleted`})
    })
  })
}
