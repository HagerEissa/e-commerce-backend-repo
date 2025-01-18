const mongoose = require('mongoose');

const orderSchema =new mongoose.Schema({
    date:Date,
    items : Array(any),
    status : Number
    },{
        timestamps:true
    })

//MODEL ->instance                      'orders'-> name of collection in database
module.exports = mongoose.model('orders',orderSchema)


