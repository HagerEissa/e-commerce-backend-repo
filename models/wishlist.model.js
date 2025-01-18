const mongoose = require('mongoose');

const wishlistSchema =new mongoose.Schema({
    userId :{
                type:mongoose.Schema.Types.ObjectId,
                ref:'users',
                required:true,
            },
    productId :Array(String)
    },{
        timestamps:true
    })

//MODEL ->instance                      'wishlist'-> name of collection in database
module.exports = mongoose.model('wishlist',wishlistSchema)


