const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  Photo:{
    type: String,
    required: true,
  },
  
  instock: {
    type: Number,
    required: true,
  },
  types:{
    type: String,
    required: true,

  },
  ratings: [
    {
      type: Number,
      min: 1,
      max: 5,
    },
  ],
  rating: {
    type: Number,
    default: 0,
  },
});

// Calculate average rating before saving a new rating
productSchema.pre("save", function (next) {
  const sum = this.ratings.reduce((total, rating) => total + rating, 0);
  this.rating = this.ratings.length > 0 ? sum / this.ratings.length : 0;
  next();
});


module.exports = mongoose.model('Product', productSchema);

