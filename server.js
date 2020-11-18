const express = require('express')
const data = require('./Data')
const mongoose = require('mongoose')
require('dotenv/config')

const app = express()

app.use(express.json())

const products = require('./routes/products/product')
const users = require('./routes/users/user')
const payment = require('./routes/payments/paystripe')

app.use('/api/products' , products)
app.use('/api/users' , users)
app.use('/api/pay' , payment)


mongoose.connect(process.env.DB_CON , 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => console.log('connected'))


app.listen(5000)