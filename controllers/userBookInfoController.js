const bookModel = require("../dbSchema/bookSchema")
const userBookInfoModel = require("../dbSchema/userBookInfoSchema")


class userBookInfoController {


    static getUserBookController = async (req,res)=>{
        let data = await userBookInfoModel.findOne({email:req.body.email})
        if(data){
            res.send({result:{
                data:data,
                indicator:"Data fetch Successfully."
             }})
        }else{
            res.send({result:{
                indicator:"This User not borrow any Book."
            }}) 
        }
    }

    
    static postUserBorrowBookController = async (req,res)=>{
        let bookID = req.body.id
        let bookData = await bookModel.findOne({id:bookID})
        if (bookData && bookData.quantityAvl > 0) {
            let isUser = await userBookInfoModel.findOne({email:req.body.email})
            if (isUser) {
                let prevBorrowBooks = isUser.borrowBook
                let newBorrowBooksData = [...prevBorrowBooks,bookData]
                let doc = await userBookInfoModel.fineOneAndUpdate({email:req.body.email},{borrowBook:newBorrowBooksData})
                await doc.save()
            } 
            else{
                let newBookData = bookData
                let doc = await new userBookInfoModel({
                    username:req.body.username,
                    email:req.body.email,
                    borrowBook:newBookData
                })
                let data = await bookModel.findOneAndUpdate({id:req.body.id},{$set :{quantityAvl:quantityAvl-1}})

                await doc.save();
                res.send({result:{
                    indicator:"your book is successfully borrowed."
                }}) 
            }
        }else{
            res.send({result:{
                indicator:"This Book is not available."
            }}) 
        }
    }

    static PostUserReturnBookController = async (req,res)=>{

        let isUser = await userBookInfoModel.findOne({email:req.body.email})
        if(isUser && isUser.borrowBook.length>0){
           let isFlag = false
           let borrowBook;
           let borrowBookIndex = 0;

           for(let i = 0; i<isUser.borrowBook.length;i++){
            if(isUser.borrowBook[i].id === req.body.id){
                isFlag = true;
                borrowBook = isUser.borrowBook[i]
                borrowBookIndex = i;
                break;
            }
           }
           isUser.borrowBook.splice(borrowBookIndex, 1);
           if (isFlag){
            let doc = await userBookInfoModel.findOneAndUpdate({email:req.body.email}, {borrowBook:isUser.borrowBook})

            let data = await bookModel.findOneAndUpdate({id:req.body.id},{$set :{quantityAvl:quantityAvl+1}})


            await doc.save();
            res.send({result:{
                indicator:"Your Book is returned successfylly."
            }}) 
           }else {
            res.send({result:{
                indicator:"User not Borrow this Book."
            }}) 
           }
        }else{
            res.send({result:{
                indicator:"This User bot Borrow Any Book from Library."
            }}) 
        }


    }







}

module.exports = userBookInfoController