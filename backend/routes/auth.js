const express = require('express');
const User = require('../models/User');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

//Secret key for JWT
const JWT_SECRET = 'Piyushisagoodb$y';


//ROUTE 1:create a user using : POST "/api/auth/createuser"...It doesn't require auth
router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 }),
], async(req, res) => {
  let success = false;
    //If there are error , return a bad errors with the error messages
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
       return res.status(400).json({errors: errors.array() });
   }
   //check whether the user with this email exists already
   try{
   let user = await User.findOne({success,email: req.body.email});
   console.log(user);
   if(user){
    return res.status(400).json({ success,error: "Sorry a user with this email already exists" });
   }
   const salt =  await bcrypt.genSalt(10);
   const secPass = await bcrypt.hash(req.body.password,salt);
   //Create a new user
    user = await User.create({
    name: req.body.name, 
    password: secPass,
    email: req.body.email,
   });

   const data = {
    user: {
      id: user.id
    }
   }
   const authtoken =jwt.sign(data,JWT_SECRET);

     //res.json(user) 
   success=true;
   res.json({success,authtoken});

   }catch(error){
     console.error(error.message);
     res.status(500).send("Internal Server Error");
   }
})


//ROUTE 2:Authenticate a user using : POST "/api/auth/login"...No login required
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(),
], async(req, res) => {
    let success = false;
    //If there are error , return a bad errors with the error messages
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
   }

   const {email, password} = req.body;
   try{
   let user = await User.findOne({email});
   if(!user){
    success = false;
    return res.status(400).json({ error: "Please try to login with correct credentials" });
   }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      success = false;
        return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }
    const data = {
        user: {
          id: user.id
        }
       }
       const authtoken =jwt.sign(data,JWT_SECRET);
       success = true;
       res.json({success : true,authtoken});
   } catch(error){
       console.error(error.message);
     res.status(500).send("Internal Server Error");

   }
})

//ROUTE 3:Get Loggedin user details : POST "/api/auth/getuser"...Login required
router.post('/getuser', fetchuser, async(req, res) => {
try {
    userId=req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
} catch(error){
       console.error(error.message);
     res.status(500).send("Internal Server Error");
}
})




module.exports = router;