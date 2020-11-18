const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    imgfolder:{
        type: String,
        required: true
    },
    mainsrc: {
        type: String,
        required: true
    },
    alt:{
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    priceold: {
        type: Number,
        required: true,
        default: 0
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
})


module.exports = mongoose.model('products', ProductSchema)