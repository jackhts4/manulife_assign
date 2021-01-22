const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  USER_NAME: {
    type: String,
    required: true
  },
  AGE: {
    type: Number,
    required: true
  },
  GENDER: {
    type: String,
    required: true,
  },
  SALE_AMOUNT: {
    type: Number,
    required: true,
  },
  LAST_PURCHASE_DATE: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = record = mongoose.model('Record', recordSchema);
