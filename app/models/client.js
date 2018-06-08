const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClientSchema = new Schema({
  code: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  businnessName: { type: String },
  address: { type: String },
  postalCode: { type: Number, min: 28001, max: 28917 },
  town: { type: String, default: 'MADRID' },
  city: { type: String, default: 'MADRID' },
  taxId: { type: Number },
  country: { type: String, default: 'ESP' },
  phone1: { type: Number },
  phone2: { type: Number },
  email: { type: String },
  obsolete: { type: Boolean, default: false },
  type: { type: Number },
  priceRate: { type: Number },
  taxIncluded: { type: Boolean },
  contactName: { type: String },
  daysClosed: [Number],
  comment: { type: String },
  shippingAddress: { type: String },
  shippingPostalCode: { type: Number, min: 5, max: 5 },
  shippingTown: { type: String, default: 'MADRID' },
  shippingCity: { type: String, default: 'MADRID' },
  methodOfPayment: { type: String, default: 'CASH' },
  currency: { type: String, default: 'EUR' },
  registrationDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Client', ClientSchema)
