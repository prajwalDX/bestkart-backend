const stripe = require('stripe')(process.env.STRIPE_KEY);

const express = require('express');

const router = express.Router();
const YOUR_DOMAIN = 'http://localhost:3000';

router.get('/', async (req, res) => {
    try{
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 19900,
            currency: 'inr',
            payment_method_types: ['card'],
          });
        res.send(paymentIntent)
    }
    catch(err){
        res.status(500).send({message: "Error try again"})
    }

});


module.exports = router