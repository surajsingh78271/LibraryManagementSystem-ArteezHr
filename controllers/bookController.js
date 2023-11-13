const { isObjectIdOrHexString } = require("mongoose");
const bookModel = require("../dbSchema/bookSchema")


class bookControoler{

    static getBookController = async (req,res)=>{
        const data = await bookModel.find({quantityAvl : {$gte:1}})
        res.send({result:{
            data:data,
            indicator:"All books are fetched Successfully."
        }})
    }

    static getBookByIdController = async (req,res)=>{
        let id = req.params.id
        // console.log(id)
        id = id.trim()
        // console.log(id)
        const data = await bookModel.find({id:id})
        res.send({result:{
            data:data,
            indicator:"All books are fetched Successfully."
        }})
    }

    static postBookController = async (req,res)=>{

        
       const {id, title, author, ISBN, quantityAvl} = req.body
       if(id && title && author && ISBN && quantityAvl){

        id = id.trim();
        title = title.trim()
        author = author.trim()
        ISBN = ISBN.trim()
        quantityAvl = quantityAvl.trim()


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