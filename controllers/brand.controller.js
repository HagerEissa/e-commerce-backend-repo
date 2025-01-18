const brandModel = require('../models/brand.model');

exports.getAllbrands = async(req,res)=>{
    try{
        const brand = await brandModel.find();
        res.status(201).json(brand);
    }catch(err){
        res.status(500).json({error:err.message});

    }
}

exports.getBrandById = async(req,res)=>{
    try{
        const brand = await brandModel.findById(req.params.id);
        res.status(201).json(brand);
    }catch(err){
        res.status(500).json({error:err.message});

    }
}

exports.addBrand = async(req,res)=>{
    try{
        const brand = await brandModel.create(req.body);
        res.status(201).json(brand);
    }catch(err){
        res.status(500).json({error:err.message});

    }
}

exports.updateBrand = async(req,res)=>{
    try{
        const { id } = req.params;  
        const updateData = req.body;        

        const brand = await brandModel.findOneAndUpdate({ _id: id },updateData,{ new: true });
        if (!brand) {
            return res.status(404).json({ message: 'brand not found' });
        }
        res.status(200).json(brand);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

exports.deleteBrand = async(req,res)=>{
    try{
        const brand = await brandModel.findByIdAndDelete(req.params.id);
        if (!brand) {
            return res.status(404).json({ message: 'brand not found' });
        }
        res.status(200).json(brand);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}


