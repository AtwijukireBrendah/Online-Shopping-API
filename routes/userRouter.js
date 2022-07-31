const express = require('express');
const router = express.Router();


//Import Controllers
const {getAllUsers,createUser} = require('../controllers/userController');

    
//USERS CRUD
router.get('/',getAllUsers);
router.post('/',createUser);

module.exports = router;