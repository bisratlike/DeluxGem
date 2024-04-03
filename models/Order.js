const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            productname:{
                type:String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
