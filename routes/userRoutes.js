// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const productController = require('../controllers/productController');
const multer = require('multer');
const upload = multer();

// router.get('/menu', authenticate, authorize('customer'), userController.viewmenu);
router.get('/admin', authenticate, authorize('admin'), adminController);
router.put('/editproduct/:productId',authenticate, authorize('admin'), adminController.editproduct)
router.delete('/deleteproduct/:productId',authenticate, authorize('admin'), adminController.deleteproduct)


router.post("/addproduct", authenticate, authorize('admin'),upload.single("photo"), productController.addProduct);


module.exports = router;
