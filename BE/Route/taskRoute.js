
const express = require('express');
const authMiddleware = require("../Middlewares/authMiddleware"); 
const {task } = require('../Controller/TaskController'); 
const router = express.Router();


 router.get('/tasks',authMiddleware,task); 
 
 


module.exports = router;