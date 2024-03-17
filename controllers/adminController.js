// routes/adminRoutes.js
const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const Product = require("../models/Product");
const jwt = require("jsonwebtoken");


// Route to delete a menu item
exports.deleteproduct = async (req, res) => {
  try {
    var { productId } = req.params;
   
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
      productId, { _id: productId},
      { productname, price,description,instock, types },
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


