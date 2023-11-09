const { isObjectIdOrHexString } = require("mongoose");
const bookModel = require("../dbSchema/bookSchema")


class bookControoler{

    static getBookController = async (req,res)=>{
        const data = await bookModel.find()
        res.send({result:{
            data:data,
            indicator:"All books are fetched Successfully."
        }})
    }

    static getBookByIdController = async (req,res)=>{
        const data = await bookModel.find({id:req.body.id})
        res.send({result:{
            data:data,
            indicator:"All books are fetched Successfully."
        }})
    }

    static postBookControoler = async (req,res)=>{

        
       const {id, title, author, ISBN} = req.body
       if(id && title && author && ISBN && quantityAvl){
        const doc = await new bookModel({
            id:id,
            title:title,
            author: author,
            ISBN :ISBN,
            quantityAvl : quantityAvl
        })

        await doc.save();

        res.send({result:{
            indicator:"Book is successfull added in the Database."
        }})

       }
       else{
        res.send({result:{
            indicator:"All Books deatils are mandatory to filled.."
        }})

       }


        
    }



}


module.exports = bookControoler