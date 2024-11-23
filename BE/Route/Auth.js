
const express = require('express');
const { signupValidation, loginValidation, resetValidation } = require('../Middlewares/Authvalidations'); // Import validation middleware
const { signup, login } = require('../Controller/Authcontroller'); 
const router = express.Router();


 router.post('/signup', signupValidation, signup); 
 router.post('/login', loginValidation, login); 

 

module.exports = router;
