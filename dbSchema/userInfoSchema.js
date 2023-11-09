const mongoose = require("mongoose")

const userInfoSchema = mongoose.Schema({
    username:String,
    email:String,
    // number:Number,
    password:String
})

const userInfoModel = mongoose.model("useraccountinfo",userInfoSchema)

module.exports = userInfoModel