const mongoose = require('mongoose');

const productSchema =new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    shortDesc:{
        type:String,
        
    }
    ,price:Number
    ,discount:Number
    ,imgURL:{
        type:String,
        required:true,
    },
    categoryId :{
            type:mongoose.Schema.Types.ObjectId,
            ref:'categories',
            required:true,
        },
    brandId :{
            type:mongoose.Schema.Types.ObjectId,
            ref:'brands',
            required:true,
        },
    isTrend:Boolean,
    isnew:Boolean,
    },{
        timestamps:true
    })

//MODEL ->instance                      'products'-> name of collection in database
module.exports = mongoose.model('products',productSchema)


