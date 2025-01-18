const mongoose = require('mongoose');


const userSchema =new mongoose.Schema({
    name: { 
        type:String,
        required:true,
    },
    email: { 
        type:String,
        required:true,
        unique:true,
    },
    password: { 
        type:String,
        required:true,
    },
    userType:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userType',
        

    }},{
        timestamps:true
    }
    );

//MODEL ->instance                      'user'-> name of collection in database
module.exports = mongoose.model('users',userSchema)


