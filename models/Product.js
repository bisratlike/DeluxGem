import { Schema, model } from "mongoose";

const productSchema = new Schema({
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
  
  instock: {
    type: Number,
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

const Product = model("Product", productSchema);

export default Product;
