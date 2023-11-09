const userInfoModel = require("../dbSchema/userInfoSchema")


class userInfoController {

    static postLoginUserInfoController = async (req,res)=>{

        
        if(req.body.email && req.body.password){

            const user = userInfoModel.findOne({email:req.body.email})

            if(user){
                if(user.password === req.body.password){
                    res.send({result:{
                        indicator:"Login Successfully.",
                        statusBar:200,
                        authen:true
                        }})
                }
                else{
                    res.send({result:{
                        indicator:"password is incorrect.",
                        }})
                }


            }else{
                 res.send({result:{
                 indicator:"This email is not registered.",
                 }})
            }


        }else{
            res.send({result:{
                indicator:"All fields are mandatory to filled."
            }})

        }
        




    }

    static postRegisterUserInfoController = async (req,res)=>{

        const {username, email, password} = req.body
         if( username && email && password){

            const user = userInfoModel.findOne({email:req.body.email})

            if(!user){
                const doc = await new userInfoModel({
                    username:username,
                    email:email,
                    password:password
                })
                await doc.save()
    
                res.send({result:{
                    indicator:"Registration Seccessfully."
                }})

            }else{
                res.send({result:{
                    indicator:"This email is Already registered.",
                    }})

            }

            
         }else{
            res.send({result:{
                indicator:"All fields are mandatory to filled."
            }})
         }

    }

}


module.exports = userInfoController