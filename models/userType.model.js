const mongoose = require('mongoose');
//to know if he is admin or user
const userTypeSchema =new mongoose.Schema({
    name: {
        type:String,
        required:true,
        unique:true,
    },
    desc:String
    ,
},{
    timestamps:true
})

//MODEL ->instance                      'userType'-> name of collection in database
module.exports = mongoose.model('userType',userTypeSchema)


