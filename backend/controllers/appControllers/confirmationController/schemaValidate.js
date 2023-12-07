const Joi = require('joi');
const schema = Joi.object({
  client: Joi.alternatives().try(Joi.string(), Joi.object()).required(),
  supplier: Joi.alternatives().try(Joi.string(), Joi.object()).required(),
  purchase: Joi.alternatives().try(Joi.string(), Joi.object()).required(),
  number: Joi.string().allow(),
  purchaseNumber: Joi.string().allow(),
  year: Joi.number().required(),
  status: Joi.string().required(),
  note: Joi.string().allow(''),
  confirmationfile: Joi.string().allow(''),
  shipmentfile: Joi.string().allow(''),
  expiredDate: Joi.date().required(),
  expiredDatePayment: Joi.date().allow(),
  expiredDateShipment: Joi.date().allow(),

  date: Joi.date().required(),
  dateShipment: Joi.date().allow(),
  // array cannot be empty
  items: Joi.array()
    .items(
      Joi.object({
        _id: Joi.string().allow('').optional(),
        itemName: Joi.string().required(),
        description: Joi.string().allow(''),
        quantity: Joi.number().required(),
        price: Joi.number().required(),
        total: Joi.number().required(),
      }).required()
    )
    .required(),
  frominvoices: Joi.array().required(),
  shipmentCost: Joi.number().allow(),
  taxRate: Joi.alternatives().try(Joi.number(), Joi.string()).required(),
});

module.exports = schema;
