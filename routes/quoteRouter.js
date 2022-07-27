const express = require('express');
const router = express.Router();

//import quote schema
const quoteSchema =require('../helpers/joi-schemas');
const validateData = require('../helpers/validation');

//Import Controllers
const {
    getAllQuotes,
    createQuote,
    getQuoteById,
    updateQuoteById,
    deleteQuoteById} = require('../controllers/quoteController');

const authenticate = require('../helpers/authenticate');

router.get("/",getAllQuotes);

router.post("/",[authenticate,validateData(quoteSchema)], createQuote);

router.get("/:id",getQuoteById);

router.patch("/:id",updateQuoteById);

router.delete("/:id",deleteQuoteById);


module.exports = router;
