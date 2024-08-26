const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SwapRequestSchema = new Schema({
  fromProductId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  toProductId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  status: {
    type: String,
    enum: ['requested', 'pending', 'approved', 'rejected'],
    default: 'requested'
  },
  fromProductUserId : {
    type: Schema.Types.ObjectId,
    ref: 'User', // refer to the ID in User model
    required: true
  },
  toProductUserId : {
    type: Schema.Types.ObjectId,
    ref: 'User', // refer to the ID in User model
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SwapRequest', SwapRequestSchema);
