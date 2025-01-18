// config :ex :multer , connection with db

const mongoose = require('mongoose');
const connectDB = async()=>{
    try{
        mongoose.connect('mongodb://127.0.0.1:27017/ecommerceNTI').then(()=> console.log('database connected'));

    }catch(err){
        console.log(err.message);
        
    }
}


module.exports = connectDB;