const express = require("express")
const connectDB = require("./connectDB/connectDB");
const userInfoModel = require("./dbSchema/userInfoSchema");
const bookModel = require("./dbSchema/bookSchema");
const router = require("./route/webRoute");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

connectDB(process.env.DATABASE_LOCAL_URL);


app.use(express.json());
app.use(cors());

// userInfoModel
// bookModel



app.use("/",router);

app.listen(8080,()=>{
    console.log("backend running");
})