const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const { ObjectId } = require('mongoose').Types;
exports.addtocart =async (req, res) => {
    try {
  
        const { userId, productId, quantity } = req.body;
  
      const product = await Product.findById(productId);

      // Create a new item for the cart
      const cartItem = {
        productId: productId,
        productname:product.productname,
        price: product.price,
        quantity
      };
  
      // Find the user's cart
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        cart = await Cart.create({ userId, products: [] });
      }
  
      // Update the cart with the new item
      cart.products.push(cartItem);
      await cart.save();
  
      res
        .status(200)
        .json({ message: "Item added to the cart successfully", cart });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  exports.deleteincart = async (req, res) => {
    try {
        const {userId ,productId} = req.params;
        

        // Find the user's cart and remove the item
        const cart = await Cart.findOneAndUpdate(
            { userId},
            { $pull: { products: {productId } } },
            { new: true }
        ).populate("products.productId")

        console.log("Cart after deletion:", cart);

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({ message: "Item removed from the cart successfully", cart });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
}
