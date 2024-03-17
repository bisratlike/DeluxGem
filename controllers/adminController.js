// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product").default;
// const Ingredient = require('../models/Ingredient');
const system = require("../models/System");
const multer = require("multer");

const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Route to display number of in-person orders
router.get("/display-non-inperson-orders", async (req, res) => {
  try {
    const inPersonOrders = await Order.countDocuments({ orderType: false });
    res.status(200).json({ inPersonOrders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Route to add a new menu item

exports.addProduct = async (req, res) => {
  try {
    const { productId, price, description, instock, types } = req.body;
    const photoBase64 = req.file.buffer.toString("base64");

    const product = new Product({
      productId,
      price,
      photo: photoBase64,
      description,
      instock,
      types,
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Route to delete a menu item
exports.deleteproduct = async (req, res) => {
  try {
    const { productId } = req.params;
    await Product.deleteOne({ _id: productId });
    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Route to edit a menu item
exports.editproduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { productname, description, price, instock, types } = req.body;

    const updatedproducts = await Product.findByIdAndUpdate(
      productId,
      { productname, description, price, instock, types },
      { new: true }
    );

    if (!updatedproducts) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    // Return a 200 OK response with the details of the updated product
    res.status(200).json(updatedproducts);
  } catch (error) {
    // If an error occurs during the process, return a 500 Internal Server Error response
    res.status(500).json({ error: error.message });
  }
};

// module.exports = router;
