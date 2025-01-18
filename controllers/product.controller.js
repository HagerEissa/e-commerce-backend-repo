const productModel = require('../models/product.model');

exports.getAllProducts = async(req,res)=>{
    try{
        const product = await productModel.find();
        res.status(201).json(product);
    }catch(err){
        res.status(500).json({error:err.message});

    }
}

exports.getProductById = async(req,res)=>{
    try{
        const product = await productModel.findById(req.params.id);
        res.status(201).json(product);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

exports.addProduct = async(req,res)=>{
    try{
        req.body.imgURL = req.file.filename;
        const product = await productModel.create(req.body);
        res.status(201).json(product);
    }catch(err){
        res.status(500).json({error:err.message});

    }
}

exports.updateProduct = async(req,res)=>{
    try{
        const { id } = req.params;  
        const updateData = req.body;        

        const product = await productModel.findOneAndUpdate({ _id: id },updateData,{ new: true });
        if (!product) {
            return res.status(404).json({ message: 'product not found' });
        }
        res.status(200).json(product);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

exports.deleteProduct = async(req,res)=>{
    try{
        const product = await productModel.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'product not found' });
        }
        res.status(200).json(product);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}




exports.getNewProducts = async(req,res)=>{
    try{
        const product = await productModel.find({isnew:true});
        res.status(201).json(product);
    }catch(err){
        res.status(500).json({error:err.message});

    }
}

exports.getTrendProducts = async(req,res)=>{
    try{
        const product = await productModel.find({isTrend:true});
        res.status(201).json(product);
    }catch(err){
        res.status(500).json({error:err.message});

    }
}