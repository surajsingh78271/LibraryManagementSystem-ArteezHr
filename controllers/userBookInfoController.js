const bookModel = require("../dbSchema/bookSchema")
const userBookInfoModel = require("../dbSchema/userBookInfoSchema")


class userBookInfoController {


    static getUserBookController = async (req,res)=>{
        // console.log("hell")
        let userid = req.params.userId;
        userid = userid.trim()
        // console.log(userid)
        let data = await userBookInfoModel.findOne({email:userid})
        if(data && data.borrowBook.length > 0){
            res.send({result:{
                data:data,
                indicator:"Data fetch Successfully."
             }})
        }else{
            res.send({result:{
                indicator:"This User not Borrow any Book."
            }}) 
        }
    }

    
    static postUserBorrowBookController = async (req,res)=>{
        let bookID = req.params.bookId;
        bookID = bookID.trim();
        let bookData = await bookModel.findOne({id:bookID})
        if (bookData && bookData.quantityAvl > 0) {
            let userId = req.params.userId
            userId = userId.trim();
            let isUser = await userBookInfoModel.findOne({email:userId})
            if (isUser) {
                let prevBorrowBooks = isUser.borrowBook
                let newBookData =  {
                    id: bookData.id,
                    title:bookData.title,
                    author:bookData.author,
                    ISBN:bookData.ISBN
                }
                let newBorrowBooksData = [...prevBorrowBooks,newBookData]
                let doc = await userBookInfoModel.findOneAndUpdate({email:req.params.userId},{borrowBook:newBorrowBooksData})
                await doc.save()
                res.send({result:{
                    indicator:"your book is successfully borrowed."
                }}) 
            } 
            else{
                let newBookData =  {
                        id: bookData.id,
                        title:bookData.title,
                        author:bookData.author,
                        ISBN:bookData.ISBN
                    }
                let doc = await new userBookInfoModel({
                    // username:req..username,
                    email:userId,
                    borrowBook:newBookData
                })

                

                await doc.save();
                res.send({result:{
                    indicator:"your book is successfully borrowed."
                }}) 
            }
            let data = await bookModel.findOneAndUpdate({id:req.params.bookId},{$set :{quantityAvl:bookData.quantityAvl-1}})
                await data.save()


        }else{
            res.send({result:{
                indicator:"This Book is not available."
            }}) 
        }
    }

    static PostUserReturnBookController = async (req,res)=>{

        let userId = req.params.userId
        userId = userId.trim()

        let isUser = await userBookInfoModel.findOne({email:userId})
        if(isUser && isUser.borrowBook.length>0){
           let isFlag = false;
           let borrowBook;
           let borrowBookIndex = 0;

           for(let i = 0; i<isUser.borrowBook.length;i++){
            if(isUser.borrowBook[i].id == req.params.bookId){
                isFlag = true;
                borrowBook = isUser.borrowBook[i]
                borrowBookIndex = i;
                break;
            }
           }
           isUser.borrowBook.splice(borrowBookIndex, 1);
           if (isFlag){
            let doc = await userBookInfoModel.findOneAndUpdate({email:req.params.userId}, {borrowBook:isUser.borrowBook})
            let bookData = await bookModel.findOne({id:req.params.bookId})

            let data = await bookModel.findOneAndUpdate({id:req.params.bookId},{$set :{quantityAvl:bookData.quantityAvl+1}})
            await data.save();
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
                indicator:"This User not Borrow Any Book from Library."
            }}) 
        }


    }







}

module.exports = userBookInfoController