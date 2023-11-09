const mongoose = require("mongoose")

const userBookInfoSchema = mongoose.Schema({
    username: String,
    email: String,
    borrowBook: Array
    // returnBook: Array
})

const userBookInfoModel = mongoose.model("userbookinfo",userBookInfoSchema)

module.exports = userBookInfoModel