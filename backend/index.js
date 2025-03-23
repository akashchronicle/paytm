const mongoose = require("mongoose");
const express = require("express");
const PORT=3000;
const app = express();
const mainRouter=require("./routes/index")
const cors=require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const connectDB = require("./db/db");
mongoose.connection.on('connected', () => console.log('MongoDB Connected'));
mongoose.connection.on('error', (err) => console.error('MongoDB Connection Error:', err));

connectDB()
app.use('/api/v1',mainRouter)


app.listen(PORT,()=>{
        console.log(`Server is Running on ${PORT}`)
    });