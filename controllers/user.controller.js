const userModel = require('../models/user.model');
const { populate } = require('../models/userType.model');
const bctypt = require('bcrypt');
const hashing = require('../utili/hashing');
const auth = require('../utili/auth');
const userTypeModel = require('../models/userType.model');
//1-create
//to put data in database

//register
exports.createUser = async(req,res)=>{
    try{
        // console.log('uuuuuuuuuu',req.body)
        const password = req.body.password;
        const hashedPassword =await  hashing.hashPassword(password);
        req.body.password = hashedPassword;
        // console.log('rrrrrrrr= ',req.body)
        const user = await userModel.create(req.body);
        res.status(201).json(user);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

//login 
exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        // console.log(password);
        
        const user = await userModel.findOne({email}).populate('userType', 'name');
        if(user){
            const isMatch =await hashing.isMatch(password,user.password)
            if(isMatch){
                //return access token
                const token = auth.createAccessToken({userId:user._id,userType:user.userType})
                res.status(200).json({ accessToken: token,user:{
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    userType: user.userType.name // Include the user type name
                }});

            }else{
                res.status(400).json({error:"this password wrond"});

            }
        }else{
            res.status(400).json({error:"this mail not found"});

        }
    }catch(err){
        res.status(500).json({error:err.message});
    }
}


//to retrive all users 

exports.getUser = async(req,res)=>{
    try{
        const users = await userModel.find().populate('userType','user');
        
        res.status(201).json(users);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

//to retrive only one user  

// exports.getUserBtID = async(req,res)=>{
//     try{
//         const users = await userModel.findById(req.params.id);
//         res.status(201).json(users);
//     }catch(err){
//         res.status(500).json({error:err.message});
//     }
// }










