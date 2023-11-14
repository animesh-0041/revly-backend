const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
const { UserModel } = require("../model/user.model")
const userRoute=express.Router()

//register
userRoute.post('/register',async(req,res)=>{
    const {password,email,userType}=req.body
    try {
       const existEmail= await UserModel.findOne({email})
       if(!existEmail){
            bcrypt.hash(password, 5, async(err, hash)=> {
                if(err){
                    res.status(400).send("Internal Error!")
                }
                else{
                    const user= new UserModel({userType,password:hash,email})
                    await user.save()
                    res.send("Registration successful")
                }
            });
       }
       else{
        res.status(400).send("Email already exist")
       }
        
        
    } catch (error) {
        res.send(error)
    }
})

//login

userRoute.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try {
        
            const user=await UserModel.findOne({email})
            if(email){
                bcrypt.compare(password, user.password).then(function(result) {
                    if(result){
                        const token = jwt.sign({ userID: user._id,userEmail:user.email,userType:user.userType }, 'revly');
                        res.send({"msg":`${user.userType} welcome back`,"token":token,userType:user.userType})
                    }
                    else{
                        res.status(400).send("Password not match!")
                    }
                });
            }
            else{
                res.status(400).send("Email not exist!")
            }
        
        
    } catch (error) {
     res.send(error)   
    }
})


module.exports={
    userRoute
}