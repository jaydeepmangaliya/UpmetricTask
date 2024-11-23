
const bcrypt = require('bcrypt');
const Usermodel = require('../Models/Users');  
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET ="jaydeep");
};


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(name)

        
        const existingUser = await Usermodel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists", success: false });
        }

   
        const newUser = new Usermodel({ name, email, password });

      
        newUser.password = await bcrypt.hash(password, 10);

        
        await newUser.save();

        res.status(201).json({ message: "Signup successful", success: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Usermodel.findOne({ email });
      
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
      
         
        const token = await generateToken(user._id);
        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                email,
                name: user.name,
                user,
                token
            })
    } catch (err) {
        console.log(err);
        
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

module.exports = {
    signup,
    login,
    // reset
}
