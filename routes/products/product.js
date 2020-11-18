const express = require('express')
const router = express.Router()
const Product = require('../../models/productsModel/products')

router.get('/' ,async (req,res) => {
    try {
        const data = await Product.find()
        res.status(200).send(data)
    }
    catch(err)
    {
        res.status(400).send({ message: "Please check your internet"})
    }
})

router.post('/', async (req,res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        imgfolder: req.body.imgfolder,
        mainsrc: req.body.mainsrc,
        alt: req.body.alt,
        rating: req.body.rating,
        price: req.body.price,
        priceold: req.body.priceold,
        stock: req.body.stock
    })

    try {
        const data = await product.save()
        res.status(200).send(data)
    }
    catch(err)
    {
        res.status(400).send({ message: "Cannot add product at the moment"})
    }
})

router.get('/:id', async (req,res) => {
    const productId = req.params.id
    const product = await Product.findOne({"_id": productId})
    if (product)
        res.status(200).send(product)
    else
        res.status(400).send({ message: "product not found"})
})





module.exports = router