const mongoose = require("mongoose")

const connectDB = async (DATABASE_URL)=>{
    
    // mongodb+srv://suraj10004:surajsingh001@cluster0.jvnoews.mongodb.net/?retryWrites=true&w=majority
    try {
        return await mongoose.connect(DATABASE_URL,{
            dbName:"arteezhr"
            // dbName:"arteezhr",
        }).then(()=>{
            console.log("Database Succesfully Connetced.")
        })
        
    } catch (error) {
        console.log(error)
        
    }

}

module.exports = connectDB