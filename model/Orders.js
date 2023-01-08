const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required:true
    },
    details: [
      {
        name: {
          type: String,
        },
        quantity: {
          type: Number,
        },
        itemTotal: {
          type: Number,
        },
        price: {
          type: Number,
        },
        total: {
          type: Number,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

module.exports = mongoose.model("Orders", OrderSchema);
