const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller')
const auth = require('../utili/auth')

// router.get('/',auth.authMW,auth.isAdmin,categoryController.getAllCategories);
// router.get('/',auth.authMW,categoryController.getAllCategories);

router.get('/',categoryController.getAllCategories);
router.get('/:id',categoryController.getCategoryById);
router.post('/',categoryController.addCategory);
router.put('/:id',categoryController.updateCategory);
router.delete('/:id',categoryController.deleteCategory);




module.exports = router;