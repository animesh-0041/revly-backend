const express=require("express")
const { connection } = require("./db")
const { userRoute } = require("./routes/user.route")
const cors=require("cors")
const { doubtRouter } = require("./routes/doubt.route")
const app=express()
app.use(cors())
app.use(express.json())


app.use("/api/auth",userRoute)
app.use('/api/doubts',doubtRouter)

app.listen(8080,async()=>{
    try {
        await connection
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
    console.log(`Server Runing at 8080`);
})