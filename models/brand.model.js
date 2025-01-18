const mongoose = require('mongoose');


const brandSchema =new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        },
    },{
        timestamps:true
    }
    );

//MODEL ->instance                      'brands'-> name of collection in database
module.exports = mongoose.model('brands',brandSchema)


