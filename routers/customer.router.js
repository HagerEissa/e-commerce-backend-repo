const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller')
const auth = require('../utili/auth')

const upload = require('../config/multerConfig');

router.get('/new-products',productController.getNewProducts);
router.get('/trend-products',productController.getTrendProducts);
router.get('/products',productController.getProductForList);
router.get('/product/:id',productController.getProductById);






module.exports = router;