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


exports.getProductForList = async (req, res) => {
    try {
        let { searchTerm, categoryId, sortBy, sortOrder, page, pageSize } = req.query;

        // Default values
        sortBy = sortBy || 'price';
        sortOrder = sortOrder === 'asc' ? 1 : -1;
        page = Number(page) || 1;
        pageSize = Number(pageSize) || 10;

        let queryFilter = {};

        // Apply filters
        // if (searchTerm && searchTerm !== 'null') {
        //     queryFilter.name = { $regex: searchTerm, $options: 'i' };// Case-insensitive search
        // }
        if (searchTerm && searchTerm !== 'null') {
            queryFilter.$or = [// The regex pattern ensures it finds partial matches, making searches more flexible.
                { name: { $regex: ".*" + searchTerm + ".*", $options: 'i' } },
                { desc: { $regex: ".*" + searchTerm + ".*", $options: 'i' } }
            ];
        }
        if (categoryId && categoryId !== 'null') {
            queryFilter.categoryId = categoryId;
        }

        // Find products
        const products = await productModel.find(queryFilter)
            .sort({ [sortBy]: +sortOrder })  // Dynamic sorting
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
