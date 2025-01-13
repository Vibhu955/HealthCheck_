const mongoose = require('mongoose');
const {Schema}=mongoose;
const physicalSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    height:{
        type:Number,
        required:true
    },
    weight:{
        type:Number,
        required:true,
    },
    bmi:{
        type:Number,
        ref:'bmi'
    },
    result:{
        type: String,
        ref:'result'
    },
    date:{
        type: Date,
        default:Date.now
    }
})

module.exports=mongoose.model('physical',physicalSchema);
