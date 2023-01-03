const express = require('express');
const app = express();
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middlewares/authenticate');
// const {OAuth2Client} = require('google-auth-library');
const Company = require('../models/CompanyModel');
var http = require('http');
    // fs = require('fs');


router.post('/login', [
    body('email').notEmpty().withMessage('Email is Required'),
    body('password').notEmpty().withMessage('Password is Required'),
], async (request, response) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
         response.status(401).json({ errors: {msg:"please fill the requrement"} })
         console.log("errors$%",errors.errors)
    }
    try {
        let { email, password } = request.body;
        // let company = await Company.findOne({ email: email });
        let user = await User.findOne({ email: email });
        if (!user) {
            return response.status(401).json({ errors: { msg: 'email Invalid Credentials' } })
        }
        // check password
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(401).json({ errors: { msg: 'password missmatch' } })
        }
         console.log("user._status",user._status,user._status==="ACT")
        if (user._status!="ACT") {
            console.log("user._status",user._status)
            return response.status(401).json({ errors: { msg: ' name Invalid Credentials' }})
        }
        // create a token
        let payload = {
            // company: {
            //     id: company.id,
            //     name: company.name
            // }
        };
        jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '2h' }, (err, token) => {
            if (err) throw err;
            response.status(200).json({
                msg: 'Login is Success',
                token: token,
                // company: company,
                user:user
            });
        })
        if(response.status(200)){
            console.log("hii login company")
            // window.localStorage.setItem(
            //     token
            // )
        }
    }
    catch (error) {
        console.error("errorss",error);
        response.status(500).json({ errors: { msg: error.message } });
    }
});

router.post('/googlelogin',async (req,res) =>{
    console.log(req,req.body.token,"clt",req.body.CLIENT_ID)
    try{
    const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        audience: req.body.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    // const userid = payload['sub'];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
    console.log("res",res);
  }catch(error){console.log("error",error)}}
  )
// const client = new OAuth2Client(CLIENT_ID);


module.exports = router;