const express = require('express');
const router = express.Router();

//import Product schema
const ProductSchema =require('../helpers/joi-schemas');
const validateData = require('../helpers/validation');

//Import Controllers
const {
    getAllProducts,
    createProduct,
    getProductById,
    updateProductById,
    deleteProductById} = require('../controllers/ProductController');

const authenticate = require('../helpers/authenticate');

router.get("/",getAllProducts);

router.post("/",[authenticate,validateData(ProductSchema)], createProduct);

router.get("/:id",getProductById);

router.patch("/:id",updateProductById);

router.delete("/:id",deleteProductById);


module.exports = router;
