const Joi = require ('joi');

// creating schemas for a particular object/entity
const product = Joi.object({
    name:Joi.string().required().max(256),
    categoryId:Joi.number().required().max(256),
    image:Joi.string().required().max(256),
    price:Joi.number().required().max(10000000),
    description:Joi.string().required().max(256),
    numberInStock:Joi.number().required().max(256),
  
});

module.exports = product;