// const mongoose = require("mongoose")
const express = require("express");
const bookControoler = require("../controllers/bookController");
const userInfoController = require("../controllers/userInfoController");
const userBookInfoController = require("../controllers/userBookInfoController");
const userBookInfoModel = require("../dbSchema/userBookInfoSchema");


const router = express.Router()

router.get("/abc",(req,res)=>{
    console.log("hello");
    res.send({indicator:"route"});
})





router.get("/api/books",bookControoler.getBookController)
router.get("/api/books/id",bookControoler.getBookByIdController)
router.post("/api/books",bookControoler.postBookControoler)

router.post("/api/users",userInfoController.postRegisterUserInfoController)
router.post("/api/login",userInfoController.postLoginUserInfoController)


router.get("/api/users/userId/books",userBookInfoController.getUserBookController)
router.post("api/borrow/bookId/userId",userBookInfoController.postUserBorrowBookController)
router.post("/api/return/bookId/userId",userBookInfoController.PostUserReturnBookController)






module.exports = router