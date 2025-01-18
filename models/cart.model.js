const mongoose = require('mongoose');

const cartSchema =new mongoose.Schema({
    userId :{
                type:mongoose.Schema.Types.ObjectId,
                ref:'users',
                required:true,
            },
    productId :Array(String)
    },{
        timestamps:true
    })

//MODEL ->instance                      'cart'-> name of collection in database
module.exports = mongoose.model('carts',cartSchema)


