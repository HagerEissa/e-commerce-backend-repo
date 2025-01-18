const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller')

const upload = require('../config/multerConfig');

router.get('/new-products',productController.getNewProducts);
router.get('/trend-products',productController.getTrendProducts);





module.exports = router;