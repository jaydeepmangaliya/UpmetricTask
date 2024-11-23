const bcrypt = require('bcrypt.js');
const Usermodel = require('../Models/Users.js');  


const task = async (req, res) => {
    try {

        res.status(201).json({ message: "taks from server", success: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports = {task}