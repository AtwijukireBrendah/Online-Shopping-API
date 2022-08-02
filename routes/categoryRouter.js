const express = require('express');
const router = express.Router();

//import Category schema
const CategorySchema =require('../helpers/joi-schemas');
const validateData = require('../helpers/validation');

//Import Controllers
const {
    getAllCategories,
    createCategory,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById} = require('../controllers/categoryController');

const authenticate = require('../helpers/authenticate');

router.get("/",getAllCategories);

router.post("/",[authenticate,validateData(CategorySchema)], createCategory);

router.get("/:id",getCategoryById);

router.patch("/:id",updateCategoryById);

router.delete("/:id",deleteCategoryById);



module.exports = router;
