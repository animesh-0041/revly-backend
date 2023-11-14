const express=require("express")
const date = require('date-and-time');
const { DoubtModel } = require("../model/doubts.model");
const doubtRouter=express.Router()





doubtRouter.post('/history',async(req,res)=>{
    const {subject,details}=req.body
    const now = new Date();
    
    try {
        const doubts= new DoubtModel({subject,details,time:date.format(now, 'YYYY/MM/DD HH:mm:ss')})
        await doubts.save()
        res.send("Doubts added")
    } catch (error) {
        res.send(error)
    }
})
doubtRouter.get('/history',async(req,res)=>{
    try {
        const doubts= await DoubtModel.find().sort({_id:-1})
        res.send(doubts)
    } catch (error) {
        res.send(error)
    }
})

module.exports={
    doubtRouter
}