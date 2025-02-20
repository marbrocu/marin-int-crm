const Joi = require('joi');
const schema = Joi.object({
  client: Joi.alternatives().try(Joi.string(), Joi.object()).required(),
  supplier: Joi.alternatives().try(Joi.string(), Joi.object()).required(),
  number: Joi.string().allow(),
  year: Joi.number().required(),
  status: Joi.string().required(),
  note: Joi.string().allow(''),
  currency: Joi.string().allow(''),
  requisitionfile: Joi.string().allow(''),
  quotationfile: Joi.string().allow(''),
  expiredDate: Joi.date().required(),
  date: Joi.date().required(),
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
  taxRate: Joi.alternatives().try(Joi.number(), Joi.string()).required(),
});

module.exports = schema;
