const express = require('express');
const router = express.Router();

//Import Controllers
const {
    getAllAuthors,
    createAuthor,
    getAuthorById,
    updateAuthorById,
    deleteAuthorById} = require('../controllers/authorController');

 //endpoints

//AUTHORS CRUD
//Route handler  and request handler

router.get('/',getAllAuthors)

router.post('/',createAuthor)

router.get("/:id",getAuthorById)

router.patch("/:id",updateAuthorById)

router.delete("/:id",deleteAuthorById)


module.exports = router;