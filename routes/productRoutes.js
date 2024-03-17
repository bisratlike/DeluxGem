const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rating endpoint
router.post('/:productId/rate', productController.rateProduct);

// Share product endpoint
router.post('/:productId/share', productController.shareProduct);


module.exports = router;
