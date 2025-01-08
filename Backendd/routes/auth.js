const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const fetch = require('../middleware/Details.js');

// console.log(process.env.JWT_SECRET)

//Creating user : "api/auth/createuser"
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email', "Enter a valid Email-id").isEmail(),
    body('email', "Enter a valid Email-id").isLowercase(),
    body('password').isLength({ min: 3 })
    //.custom((value,{req}) => {
    //  return req.body.password.isAlphanumeric();})
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ error: errors.array().map((e) => { return e.msg }) });
    //let user=await User.findOne
    if (await User.findOne({ email: req.body.email }))
        return res.status(409).json({ error: "User already exists" });//.send("User already exists");
    else {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        await User.create({    //let user=await User.create.....
            name: req.body.name,
            email: req.body.email,
            password: password
        })
        //payload {id:User(req.body)}
        const jwtID = jwt.sign({ id: User(req.body).id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // const token =generateToken(User(req.body).id,res)
        console.log("jwtID: ",jwtID);     
        res.json({ "success": true, "token": jwtID });
    }
})

//Logging in User verifying email address (Authenticate): "api/auth/login"
router.post('/login', [
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Passowrd cant be blank").exists(),
    //.custom((value,{req}) => {
    //  return req.body.password.isAlphanumeric();})
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ error: errors.array().map((e) => { return e.msg }) });
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ error: "Account is not created", link: "true" });
        console.log(user.password)

        if (!(await bcrypt.compare(password, user.password)))
            return res.status(400).json({ error: 'Wrong password entered' });
        const jwtID = jwt.sign({ id: user.id }, process.env.JWT_SECRET );

        console.log(jwtID)
        res.json({ "success": true, "token": jwtID });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Error");
    }
})

//Getting user details of logged in user using JWTID (Authenticate): "api/auth/details"
router.post('/details', fetch, async (req, res) => {
    try {
        // console.log(req.body);
        const userid = req.body.id;
        const userget = await User.findById(userid).select("-password");
        res.send(userget);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Errror" });
    }
})
module.exports = router;
//const user= new User(req.body);

//Updating user Credentials : "api/auth/forgotpass"
router.put('/forgotpass',[
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Password can't be less than 3 chars").isLength({ min: 3 }),

],  async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({error: errors.array().map((e) => { return e.msg }) });
    const {email,password} =req.body; //used "password" in request
    try{

        const user= await User.findOne({email});
        
        // console.log(email,password);
        if(!user)
            return res.status(404).json({error:"Authenticate User", link:"true"});
        console.log("old: ",user.password)

        if((await bcrypt.compare(password, user.password)))
            return res.status(400).json({error:"Password used before"});
        else
        {
            if(email!=user.email)
                return res.status(409).json({error:"Invalid access"});
            const salt= await bcrypt.genSalt(10); //create salt
            const pw= await bcrypt.hash(password,salt); //hash password + salt

            let userNew=await User.findOneAndUpdate(
                {email:user.email}, //filter to Find
                {password:pw}, //Updation
                {new : true //returns new UPDATED document
            })
            if (!userNew) {
                return res.status(404).json({ error: "User update failed, try login/signup"});
            }
        
            console.log("new: ",userNew.password)
        
            const jwtID = jwt.sign({ id: User(req.body).id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            // console.log("jwtID: ",jwtID);     
            res.json({"success": true , "token": jwtID });
            // console.log(password,"\n",userNew.password)
        }
    }
    catch(error){
    console.log(error.message)
    return res.status(500).json({error:"Internal Error Occurred"});
}
})
