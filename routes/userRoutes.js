// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

const productController = require("../controllers/productController");
const Product = require("../models/Product");
const multer = require("multer");
const upload = multer();


// router.get('/menu', authenticate, authorize('customer'), userController.viewmenu);

router.put(
  "/editproduct/:productId",
  authenticate,
  authorize("admin"),upload.single("Photo"),
  adminController.editproduct
);
router.delete(
  "/deleteproduct/:productId",
  authenticate,
  authorize("admin"),
  adminController.deleteproduct
);

router.post(
  "/addproduct",
  authenticate,
  authorize("admin"), upload.single("Photo"), async (req, res) => {
   
    try {
      const { productname, price, description, instock, types } = req.body;
      const photoBase64 = req.file.buffer.toString("base64");
  
      const product = new Product({
        
        productname,
        price,
        description,
        Photo: photoBase64,
        instock,
        types,
      });
  
      await product.save();
      res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
