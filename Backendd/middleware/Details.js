const jwt = require('jsonwebtoken');
// const jwtkey="issshhh";

// const jwK = process.env.JWT_SECRET ;
// console.log("Middleware",jwK);
const userss=[];


const fetchDetails = (req, res, next) => {
    //Getting details from JWTID
    const token = req.header('token');
        if (!token)
        res.status(498).send("Authenticate using valid token");
    try { //user notm def so using req.body
        const data = jwt.verify(token, process.env.JWT_SECRET); //s.id/data.id is payload {id:user.id}
        req.body.id = data.id; //req.body was empty 
        next();
    }
    catch (error) {
        console.log(error.message); 
        res.status(401).send("Error, Couldn't fetch Details");
    }

    userss.push(req.body.id);
    
}
module.exports = fetchDetails;