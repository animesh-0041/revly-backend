const mongoose=require("mongoose")
const doubtsSchema=mongoose.Schema({
    subject:{type:String},
    details:{type:String},
    time:{type:String}
})

const DoubtModel=mongoose.model("doubt",doubtsSchema)
module.exports={DoubtModel}