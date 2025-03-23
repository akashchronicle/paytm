const mongoose= require('mongoose');
const db= require('../db/db');
const bankSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

const Account= mongoose.model('Account',bankSchema);
module.exports=Account
