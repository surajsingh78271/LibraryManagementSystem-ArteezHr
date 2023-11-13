// const mongoose = require("mongoose")
const express = require("express");
const bookControoler = require("../controllers/bookController");
const userInfoController = require("../controllers/userInfoController");
const userBookInfoController = require("../controllers/userBookInfoController");
const userBookInfoModel = require("../dbSchema/userBookInfoSchema");
const userInfoModel = require("../dbSchema/userInfoSchema");


const router = express.Router()

router.get("/test",(req,res)=>{
    console.log("route working");
    res.send({indicator:"route working"});
})

const authenMiddleware = async (req,res,next)=>{
    let userId = req.params.userId;
    userId = userId.trim()
    let user = await userInfoModel.findOne({email:userId})
    if(user){
        next()

    }else{
        res.send({result:{
            indicator:"This user is not registered, So first register after that you can perform actions ."
        }}) 

    }

}




router.get("/api/books",bookControoler.getBookController)
router.get("/api/books/:id",bookControoler.getBookByIdController)
router.post("/api/books",bookControoler.postBookController)

router.post("/api/users",userInfoController.postRegisterUserInfoController)
router.post("/api/users/login",userInfoController.postLoginUserInfoController)


router.get("/api/users/:userId/books",userBookInfoController.getUserBookController)
router.post("/api/borrow/:bookId/:userId",authenMiddleware,userBookInfoController.postUserBorrowBookController)
router.post("/api/return/:bookId/:userId",authenMiddleware,userBookInfoController.PostUserReturnBookController)






module.exports = router