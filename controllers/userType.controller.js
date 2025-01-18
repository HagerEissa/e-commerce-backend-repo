const userTypeModel = require('../models/userType.model');
//1-create
//to put data in database
//http://localhost:3000/userType
exports.createUserType = async(req,res)=>{
    try{
        const userType = await userTypeModel.create(req.body);
        res.status(201).json(userType);
    }catch(err){
        res.status(500).json({error:err.message});

    }
}

//to retrive all users types

exports.getUserType = async(req,res)=>{
    try{
        const userType = await userTypeModel.find();
        res.status(201).json(userType);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}