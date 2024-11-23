const express = require('express');
const app = express();
require('./Models/Dbconnection')
const authRoutes = require('./Route/Auth'); 
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const cors = require('cors');
const bcrypt = require('bcrypt')
var nodemailer = require('nodemailer');
const authMiddleware = require('./Middlewares/authMiddleware');
const Usermodel = require('./Models/Users');


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); 
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Request body:', req.body); 
    next();
});



app.use('/auth', authRoutes);
app.get("/protected-route",authMiddleware)

app.listen(8000, () => {
    console.log(`Server is running on http://localhost:8000`);
});

app.post('/auth/resetpassword', async (req, res) => {
    const { email } = req.body;

    try {
        console.log(`Reset password request for: ${email}`);

        
        const user = await Usermodel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

       
        const token = jwt.sign({ id: user._id, email: user.email }, "jwt_secret_key", { expiresIn: '15d' });

       
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '210303105054@paruluniversity.ac.in', 
                pass: 'ewbn uswi xruf gtzg '
            }
        });

        // Email content
        const resetLink = `http://localhost:5173/reset-password/${user._id}/${token}`;
        const mailOptions = {
            from: '210303105054@paruluniversity.ac.in',
            to: email,
            subject: 'Reset your password',
            text: `Click the link to reset your password: ${resetLink}`,
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                
                return res.status(500).json({ message: "Failed to send reset email" });
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(200).json({ message: "Reset email sent successfully" });
            }
        });
    } catch (error) {
        console.error("Error in reset password flow:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// for update pass 
 app.post('/auth/reset-password/:id/:token',(req,res)=>{ 
    const{id,token} = req.params
    const {password} = req.body
    jwt.verify(token,"jwt_secret_key",(err,decoded)=>{ 
        if(err){ 
            return res.status(500).json({ message: "Error with token" });
        }
        else { 
            bcrypt.hash(password,10)
            .then(hash=>{  
                Usermodel.findByIdAndUpdate({_id:id},{password:hash})
                .then(u=> res.status(200).json({message:"Update Successfull"}
                    
                ))
                .catch(err => res.status(500).json({message:err}))
            })
            .catch(err =>res.status(500).json({message:err}))
        
        }
    })
 })
