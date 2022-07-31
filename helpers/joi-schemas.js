const Joi = require ('joi');

// creating schemas for a particular object/entity
const product = Joi.object({
    name:Joi.string().required().max(256),
  
});

module.exports = product;