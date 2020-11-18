const jwt = require('jsonwebtoken')
const Users = require('../../models/usersModel/users')
const { use } = require('../users/user')
require('dotenv/config')

function auth (req,res,next){
    const token = req.header('auth-token')
    if(!token) 
        return res.status(401).send({message: 'Access Denied'})
    
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()
    }
    catch (err)
    {
        res.status(400).send({message: 'Invalid Token'})
    }
}

async function isAdmin (req,res,next){
    const user = await Users.findOne({ "_id": req.body.id})
    if(!user)
        return res.status(400).send({message : "No user found"})
    
        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET)
            if(verified.admin)
                return res.status(200).send({message : "Access Granted"})
            next()
        }
        catch(err) {
            return res.status(400).send({message : "Access Denied"})
        }
}




module.exports = auth
module.exports = isAdmin