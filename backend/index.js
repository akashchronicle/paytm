const express = require("express");
const PORT=3000;
const app = express();
const mainRouter=require("./routes/index")
const cors=require('cors')
app.use(cors())
app.use(express.json())
const connectDB = require("./db/db");
connectDB()
app.use('/api/v1',mainRouter)

app.listen(PORT,()=>{
        console.log(`Server is Running on ${PORT}`)
    });