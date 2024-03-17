const Product = require('../models/Product');

exports.rateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating } = req.body;

    // Find the product by ID
    const product = await Product.findById(productId);

    // Add the new rating to the ratings array
    product.ratings.push(rating);

    // Save the updated product
    await product.save();

    res.status(200).json({ message: 'Rating added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.shareProduct = async (req, res) => {
    try {
      const { productId } = req.params;
      const productLink = `https://your-website.com/products/${productId}`;
      res.status(200).json({ productLink });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
