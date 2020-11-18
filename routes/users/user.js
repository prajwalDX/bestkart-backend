const express = require('express')
const router = express.Router()
const Users = require('../../models/usersModel/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../check/verify')
const isAdmin = require('../check/verify')
require('dotenv/config')

router.get('/', async (req,res) => {
    try {
        const data = await Users.find()
        res.status(200).send(data)
    }
    catch(err)
    {
        res.status(400).send({ message: err})
    }
})

router.post('/register' ,async (req,res) => {

    const emailcheck = Users.findOne({ email : req.body.email })
    if(emailcheck) return res.status(400).send({ message: 'Email already exist'})
    const salt =await bcrypt.genSalt(10)
    const hashpass =await bcrypt.hash(req.body.password, salt)
    const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: hashpass
    })

    try {
        const data = await user.save()
        res.status(200).send({ message: "sucessfully registered"})
    }
    catch(err)
    {
        res.status(400).send({ message: "Cannot resister at moment! please try again."})
    }
})

router.post('/registeradmin', auth, isAdmin, async (req,res) => {
    const userId = req.body.id
    const updateAdmin = {"admin" : "true"}
    try {
        const user = await Users.findByIdAndUpdate({ "_id": userId}, updateAdmin , {useFindAndModify : false})
        res.status(200).send({message: "ADMIN sucessfully added"})
    }
    catch(err){
        res.status(400).send({ message: "Cannot resister ADMIN at moment! please try again."})
    }
})

router.post('/login', async (req,res) => {
    const user = await Users.findOne({"email" : req.body.email})
    if(!user) 
        return res.status(400).send({ message: "Email is wrong"})
    const pass = await bcrypt.compare( req.body.password , user.password)
    if(!pass) 
        return res.status(400).send({ message: "Password is worng"})
    
    const token = jwt.sign({_id: user._id, isadmin: user.admin} , process.env.JWT_SECRET)
    res.status(200).header('auth-token', token).send({_id: user._id, isAdmin: user.admin, name: user.name});


})




module.exports = router