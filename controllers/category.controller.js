const categoryModel = require('../models/category.model');

exports.getAllCategories = async(req,res)=>{
    try{
        const category = await categoryModel.find();
        res.status(201).json(category);
    }catch(err){
        res.status(500).json({error:err.message});

    }
}

exports.getCategoryById = async(req,res)=>{
    try{
        const category = await categoryModel.findById(req.params.id);
        res.status(201).json(category);
    }catch(err){
        res.status(500).json({error:err.message});

    }
}

exports.addCategory = async(req,res)=>{
    try{
        const category = await categoryModel.create(req.body);
        res.status(201).json(category);
    }catch(err){
        res.status(500).json({error:err.message});

    }
}

exports.updateCategory = async(req,res)=>{
    try{
        const { id } = req.params;  
        const updateData = req.body;        

        const category = await categoryModel.findOneAndUpdate({ _id: id },updateData,{ new: true });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

exports.deleteCategory = async(req,res)=>{
    try{
        const category = await categoryModel.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}


