const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/Details.js');
const Physicals = require("../models/Physical.js")

// console.log(await Notes.find().model.schema.obj.title.name)
//Get all physical health details of a user : /api/physical/details
router.get('/details', fetchUser, async (req, res) => {

    try {
        const details = await Physicals.find({ user: req.body.id });
        //   console.log(req.body.id);
        res.json(details);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Errror");
    }
})

// Add a health for d concerned user: /api/physical/addphysical
router.post('/addphysical', fetchUser, [
    body('height', "Enter Proper Details").isFloat({min:1}).withMessage("Height must be greater than or equal to 1"),
    body('weight', "Enter Proper Details").isFloat({min:1}).withMessage("Weight must be greater than or equal to 1"),
    body('height', "Enter Height").isLength({ min: 1 }),
    body('weight', "Enter Weight").isLength({ min: 1 })

],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array().map((e)=> {return e.msg}) });
            
        if ((await Physicals.find({ user: req.body.id })).length === 0) {
            const { height, weight } = req.body;

            // let bmi = parseFloat(weight.toString() * 10 ** 4) / parseFloat(height.toString() * height.toString())
            try {
                const specificPhysical = new Physicals({ height, weight, user: req.body.id, bmi: bmi(height.toString(), weight.toString()) });
                res.json(await specificPhysical.save());
            }
            catch (error) {
                console.log(error.message);
                res.status(500).send("Errror");
            }
        }
        else
            return res.status(400).json({ errors: "User Details already exists , please Update details" });
    }
)


//Update Health details of d concerned user: /api/notes/updatephysical
// user's id is taken  
router.put('/updatephysical/:id', [    
    body('height', "Height must be greater than or equal to 1").isFloat({min:1}),
    body('weight', "Weight must be greater than or equal to 1").isFloat({min:1})
    ], fetchUser, 
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array().map((e)=> {return e.msg}) });
        try {
            const { height, weight } = req.body;
            const updatePhysical = {}
            if (height)
                updatePhysical.height = height;
            if (weight)
                updatePhysical.weight = weight;
            let sameUser = await Physicals.find({ user: req.params.id });
            if (!sameUser[0])
                return res.status(404).send("User doesnt exists");
            if (sameUser[0].user.toString() !== req.body.id)
                return res.status(401).send("invalid access");
            sameUser = await Physicals.findByIdAndUpdate(sameUser[0]._id.toString(), { $set: updatePhysical, bmi: bmi(height.toString(), weight.toString()) }, 
            { new: true })
            res.json({ sameUser })
        }
        catch (error) {
            console.log("Error updating User Details:", error);
            res.status(500).send("Internal server error");
        }
})


// similar interests or similar bmi
let userDetails=[];
router.get('/users', fetchUser, async (req, res) => {
    try {
        const details = await Physicals.find({ bmi: req.body.bmi });
        //   console.log(req.body.id);
        try {

                details.forEach(async (user, i) => {
                    const userget = await User.findById(user.user).select("-password")
                    if ((userget))
                       userDetails[i]= userDetails.concat(userget);
                })
                console.log(userDetails)
//           res.json (userDetails);
        }

        catch (error) {
            console.log(error.message);
            res.status(500).send("Errror");
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Errror");
    }
})

const bmi = ((height, weight) => {
    return parseFloat(weight * 10 ** 4) / parseFloat(height * height)
})
//Leave site forget/delete User
module.exports = router;
