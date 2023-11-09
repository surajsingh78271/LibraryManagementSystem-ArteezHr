const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
    id:Number,
    title:String,
    author:String,
    ISBN:String,
    quantityAvl: Number
})

const bookModel = mongoose.model("bookinfo",bookSchema)

module.exports = bookModel