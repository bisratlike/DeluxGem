// controllers/orderController.js
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { user, products, totalAmount } = req.body;

    // Create the order
    const order = new Order({
      user,
      products,
      totalAmount,
      status: 'pending' // or any initial status you prefer
    });

    // Save the order to the database
    await order.save();

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};
