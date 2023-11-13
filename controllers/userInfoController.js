const userInfoModel = require("../dbSchema/userInfoSchema")


class userInfoController {

    static postLoginUserInfoController = async (req,res)=>{

        
        if(req.body.email && req.body.password){
            let email = req.body.email
            email = email.trim()
            let password = req.body.password
            password = password.trim()

            const user = await userInfoModel.findOne({email:email})

            if(user){

                if(user.password == password){
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

            let userId = req.body.email
            userId = userId.trim()

            const user = await userInfoModel.findOne({email:userId})

            if(!user){
                username = username.trim();
                email = email.trim()
                password = password.trim()
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