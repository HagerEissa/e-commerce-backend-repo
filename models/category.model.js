const mongoose = require('mongoose');


const categorySchema =new mongoose.Schema({
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

//MODEL ->instance                      'categories'-> name of collection in database
module.exports = mongoose.model('categories',categorySchema)


